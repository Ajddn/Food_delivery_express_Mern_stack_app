import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import "./cart.css";
import {emptycart} from "../assests/index";
import Footer from "../components/Footer";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { loadStripe } from '@stripe/stripe-js/pure';
const Cart = () => {
  const user = useSelector(state => state.user)
  //  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();
  
  const productCartItem = useSelector((state) => state.product.cartItem);

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );
  // const requestData = productCartItem.map((item) => ({
  //   name: item.name,
  //   image: item.image, // If you have an image URL for the product
  //   price: item.price,
  //   qty: item.qty,
  // }));
  
  const handlePayment = async()=>{

    if(user.email){
        
        const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
       
        const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/create-checkout-session`,{
          method : "POST",
          headers  : {
            "Content-type" : "application/json"
          },
          body  : JSON.stringify(productCartItem)
        })
        
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error response from server:", errorData);
      throw new Error("Error creating checkout session");
    }

        const data = await res.json()
        console.log(data)

        toast("Redirect to payment Gateway...!")
        stripePromise.redirectToCheckout({sessionId : data}) 
    }
    else{
      toast("You have not Login!")
      setTimeout(()=>{
        navigate("/login")
      },1000)
    }
  
}

  
  
  return <div>
   {productCartItem.length > 0 ? (
  <div>
    <h2 className="headongofcart">Items in your cart</h2>
    {productCartItem.map((el) => (
      <CartProduct
        key={el._id}
        id={el._id}
        name={el.name}
        image={el.image}
        category={el.category}
        qty={el.qty}
        total={el.total}
        price={el.price}
      />
    ))}
  </div>
) : (
  <div className="empty-cart-container">
          <img src={emptycart} alt="Empty Cart" className="emptycartimg" />
          <p className="emptyclass">Your cart is empty.</p>
        </div>
)}

      
      {productCartItem.length > 0 && (
        <div>
          <div className="summary">Summary</div>
          <div>
            <p className="quantitytotal"> Total Quantity : {totalQty}</p>
            <p className="pricetotal"> Total Price : {totalPrice}</p>
          </div>
          <div className="Payment"><button className="paymentbutton" onClick={handlePayment}>Proceed for Payment</button></div>
        </div>
      )}
       <Footer  className= "footerclass"/>
        </div>;
};

export default Cart;
