import React, { useEffect, useRef, useState } from "react";
import "./home.css";
import { landingpageimage } from "../assests";
import HomeCard from "../components/HomeCard";
import { useSelector } from "react-redux";
import SlideOne from "../components/SlideOne";
import FilterProduct from "../components/FilterProduct";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import Footer from "../components/Footer";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const scrollContainerRef = useRef(null);

  const scrollStep = 200;

  const homeProductList = productData.slice(0, 12);
  console.log(homeProductList);


  const homeproductmaincourse = productData.filter(
    (el) => el.category === "Main course",
    []
  );
  const categoryList = [...new Set(productData.map((el) => el.category))];


  const [filterby, setFilterby] = useState("productData");
  const [DataFilter, setDataFilter] = useState([]);
  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);
  

// filter product function when got clicked filter according to category
  const HandleFilterproduct = (category) => {
    if (typeof category === "string") {
      const lowercaseCategory = category.toLowerCase();
      const filter = productData.filter(
        (el) =>
          typeof el.category === "string" &&
          el.category.toLowerCase() === lowercaseCategory
      );
      setDataFilter(filter);
    } else {
      // Handle the case when category is not a valid string
      setDataFilter([]);
    }
  };


  // Function to scroll to the left
  const scrollToLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollStep,
        behavior: "smooth",
      });
    }
  };

  // Function to scroll to the right
  const scrollToRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollStep,
        behavior: "smooth",
      });
    }
  };


  // function for sliding order now to last div 
  const lastSliderRef = useRef(null); 
  const scrollToLastSlider = () => {
    if (lastSliderRef.current) {
      lastSliderRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  // this load elemnt from databse to home page 
  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  return (
    <div style={{backgroundColor: "#EDEEF7"}}>
      <div className="imagediv">
        <img
          className="landingpageimage"
          src={landingpageimage}
          alt="landingpageimage"
        />
      </div>
      <h1 className="mainheadingone">Fresh Food </h1>
      <h2 className="mainheadingtwo">with</h2>
      <h1 className="mainheadingthree">Great Taste</h1>
      <button className="btnofhomepage buttonplacer" onClick={scrollToLastSlider}>Order Now</button>
      <h1 style={{position : "relative", top: "120px",left: "560px", fontFamily:"serif",fontWeight:"bolder",fontSize:"8dvh" }}>Delicious 
        Delights
      </h1>
      <div className="nextsection" style={{ flexWrap: "wrap" }}>
        {homeProductList[0]
          ? homeProductList.map((el) => {
              return (
                <HomeCard
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                  loading={!el.image}
                />
              );
            })
          : (
            loadingArray.map((el, index) => (
              <HomeCard key={index + "loading"} loading={"Loading..."} />
            ))
          )}
      </div>
      <div>
        <hr className="firsthori"></hr>
        <h3 className="bestmaincourse">Bestsellers from Main course</h3>
        <div className="slideone-buttons">
          <button
            className="
          left"
            onClick={scrollToLeft}
          >
            <GrFormPrevious size={25} />
          </button>
          <button onClick={scrollToRight} className="right">
            <GrFormNext size={25} />
          </button>
        </div>
        <div
          className="maincoursesection"
          style={{
            scrollBehavior: "smooth",
          }}
          ref={scrollContainerRef}
        >
          {/* <div className="maincoursesection"> */}
          {homeproductmaincourse[0]
            ? homeproductmaincourse.map((el) => {
                return (
                  <SlideOne
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                    loading={!el.image}
                  />
                );
              })
            : loadingArrayFeature.map((el, index) => (
                <SlideOne loading="Loading..." key={index + "cartLoading"} />
              ))}
          {/* </div> */}
        </div>
      </div>
      <div ref={lastSliderRef}>
      <div>
        <hr className="firsthori lastpad"></hr>
        <h2 className="lastHeading">Choose what you like</h2>
        <div className="menusection">
          {categoryList[0] &&
            categoryList.map((el) => {
              
              return (
                <FilterProduct
                  key={el}
                  category={el}
                  id={el.id} 
                  isActive={el.toLowerCase() === filterby.toLowerCase()}
                  onClick={HandleFilterproduct}
                  
                />
              );
            })}
        </div>
        <div className="lastslider">
          {DataFilter.map((el) => {
            return (
              <HomeCard
                key={el._id}
                id={el._id}
                image={el.image}
                name={el.name}
                price={el.price}
                category={el.category}
              />
            );
          })}
        </div>
        </div>
      </div>
      <Footer  className= "footerclass"/>
    </div>
  );
};

export default Home;
