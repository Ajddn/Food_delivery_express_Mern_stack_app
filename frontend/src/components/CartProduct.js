import React from 'react';
import "./cartproduct.css";
import { GrAdd } from "react-icons/gr";
import { useDispatch } from "react-redux";
import {BiMinus} from "react-icons/bi";
import {AiFillDelete} from "react-icons/ai";
import { deleteCartItem,increaseQty,decreaseQty } from "../redux/productSlice";

const CartProduct = ({ name, image, category, qty, total, price ,id}) => {
  const dispatch = useDispatch();
  return (
    <div className="cart-product">
      <div className="image-parent">
        <img src={image} className="image-cart" alt={name} />
      </div>
      <div className="product-details">
        <p className="product-name">{name}</p>
        <p className="product-quantity"> {qty}</p>
        <button className='handledelete' onClick={()=>dispatch(deleteCartItem(id))}><span><AiFillDelete /></span></button>
        <button className='positionadd'onClick={()=>dispatch(increaseQty(id))}><span><GrAdd /> </span></button>
       <button  className='positionminus' onClick={()=>dispatch(decreaseQty(id))}><span><BiMinus /></span></button> 
        <p className="product-total">Total: ₹{total}</p>
        <p className="product-price">Price: ₹{price}</p>
       
      </div>
    </div>
  );
}

export default CartProduct;
