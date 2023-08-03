import React from "react";
import Footer from "../components/Footer";
import "./about.css";
const About = () => {
  return <div>
    <h1 className="aboutusheading" >ABOUT US</h1>
    <div className="parentdiv" >
    <p className= "paragrapgfirst">At Food Delivery Express, we are passionate about connecting food lovers with their favorite flavors in the most convenient way possible. Our journey began with a simple yet ambitious mission: to redefine the food delivery experience and become the go-to platform for foodies across the globe.</p>
    <h3 className="importantheadingone">Who We Are:</h3>
    <p className= "paragrapgsecond" >We are a team of dedicated food enthusiasts and tech-savvy minds, driven by a shared love for delicious cuisine and seamless technology. Our platform brings together a diverse range of restaurants, eateries, and culinary delights, ensuring that you have a vast selection of options to satisfy your cravings.</p>
    <h3  className="importantheadingtwo">Our Commitment to Excellence:</h3>
    <p className= "paragrapgthird" >We believe in delivering nothing short of excellence. From the moment you open our app to the time your order arrives at your doorstep, we strive to provide you with a flawless and delightful experience. Our commitment to quality and service is the driving force behind everything we do</p>

    </div>

<Footer  className= "footerclass"/>
  </div>;
};

export default About;
