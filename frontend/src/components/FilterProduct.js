import React from "react";
import "./filterproduct.css";
import { PiForkKnifeBold } from "react-icons/pi";
// import { Link } from "react-router-dom";
const FilterProduct = ({ category, onClick,id ,isActive}) => {
  const handleClick = () => {
    onClick(category); // Pass the category value to the onClick function
  };
  return (
    <>
      
        <div  className= {`knifeandfork ${isActive ? "active" : ""}` } 
         onClick={handleClick}>
          <PiForkKnifeBold size={50} />
        </div>
        <p className="settingname" onClick={handleClick}>
          {category}
        </p>
     
    </>
  );
};

export default FilterProduct;
