import React from "react";
import "./homecard.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCartItem } from "../redux/productSlice";
const HomeCard = ({ name, image, category, price, loading, id }) => {
  const dispatch = useDispatch();
  const handleAddCartProduct = () => {
    dispatch(
      addCartItem({
        _id: id,
        name: name,
        price: price,
        category: category,
        image: image,
      })
    );  
  };
  return (
    <div className="">
      {image ? (
        <>
          <Link to={`/menu/${id}`}>
            <div className="imageset">
              <img src={image} className="imagefetch" alt="" />
            </div>
            <h3 className="nameheading">{name}</h3>
            <p className="priceheading">
              ₹<span>{price}</span>
            </p>
          </Link>
          <button
            className="slideonebtn placingbtn"
            onClick={handleAddCartProduct}
          >
            Add to cart
          </button>
        </>
      ) : (
        <p>{loading}</p>
      )}
    </div>
  );
};

export default HomeCard;
