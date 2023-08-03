import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addCartItem } from "../redux/productSlice";
import "./menu.css";
import Footer from "../components/Footer";
const Menu = () => {
  const { filterby } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleAddCartProduct = (e) => {
    dispatch(
      addCartItem(productDisplay)
    );
  };
  const handleBuy = ()=>{
    dispatch(addCartItem(productDisplay))
      navigate("/cart")
  }
  const productData = useSelector((state) => state.product.productList);
  const productDisplay = productData.filter((el) => el._id === filterby)[0];
  if (!productDisplay) {
    // Handle the case when productDisplay is undefined (no product found)
    return <div>No product found with the given ID</div>;
  }
  return (
    <div style={{Height:"30vh",backgroundColor: "#EDEEF7",borderRadius : "50px", maxHeight:"640px" }}>
      <div className="menuimageset">
        <img className="imagemenuset" src={productDisplay.image} alt="" />
      </div>
      <div className="rightside">
        <h3 className="nameheading" style={{paddingLeft:"30px"}}>{productDisplay.name}</h3>
        <p className="priceheading" style={{fontWeight : "bolder" , paddingLeft :"30px"}}>
          ₹<span >{productDisplay.price}</span>
        </p>
        <button className="slideonebtn placingbtn buynowbtn" onClick={ handleBuy}>Buy now</button>
        <button className="slideonebtn placingbtn addtocartbtn " onClick={ handleAddCartProduct }>
          Add to cart
        </button>
        <p className="descrset">
          <span style={{ fontWeight: "bold" }}>Description: </span>
          {productDisplay.description}
        </p>
      </div>
      <Footer  className= "footerclass"/>
    </div>
  );
};

export default Menu;
