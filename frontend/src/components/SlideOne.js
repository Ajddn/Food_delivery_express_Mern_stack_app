import React from "react";
import "./slideone.css";
import { addCartItem} from "../redux/productSlice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
const SlideOne = ({ name, image, category, price, loading, id }) => {
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
    <div className="mainsildeone">
      {image ? (
        <>
          <Link to={`/menu/${id}`}>
            <div className="imageset">
              <img src={image} className="imageslideone" alt="" />
            </div>
            <h2 className="nameheading">{name}</h2>
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
        <div>
          <p>{loading}</p>
        </div>
      )}
    
    </div>
  );
};

export default SlideOne;
