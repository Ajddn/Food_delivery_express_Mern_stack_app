import React, { useState } from "react";
// import logo from "../assests";
import { logo } from "../assests";

// import logo from "../assets/logo.png";
import "./header.css";
import { Link } from "react-router-dom";
import { BsCartFill } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";

const Header = () => {
  //   const styles = {
  //     background-color : background-color:C4DFDF;,
  //   };
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  // console.log(userData.email);
  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };
  const cartitemnumber = useSelector((state)=>state.product.cartItem);
  // logout operation

  const dispatch = useDispatch();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Sucessfully log out");
    // setIsLoggedIn(false); // Set isLoggedIn to false to indicate user logged out
  };

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container">
        <Link to={""}>
          <img
            src={logo}
            alt="logo"
            width="60"
            height="60"
            className="d-inline-block align-text-top logopng"
          />
        </Link>
        <h1 className="headingoflogo">Food Delivery Express</h1>
      </div>
      <nav className="shiftingelement">
        <a className="homeset" href="/">
          Home
        </a>
        {/* <a className="menuset" href="/Menu/64c3cd67ce51b8968ccbe742">
          Menu
        </a> */}
        <a className="aboutset" href="/About">
          About
        </a>
        <a className="contactset" href="/Contact">
          Contact
        </a>
      </nav>

      <nav>
        <div className="user" onClick={handleShowMenu}>
          <BiSolidUser size={22} />
        </div>
        {showMenu && (
          <div className="dropdown">
            {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
              <p className="dropdownelementone">
                {" "}
                <a href="/Newproduct">Add an item</a>
              </p>
            )}

            {/* <p className="dropdownelementtwo">
              <a href="/Login">Login</a>
            </p> */}
            {isLoggedIn ? ( // Render "Logout" when logged in
              <p className="dropdownelementtwo">
                <button
                  className="btn btn-primary logoutbutton"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </p>
            ) : (
              // Render "Login" when not logged in
              <p className="dropdownelementtwo">
                <a href="/Login">Login</a>
              </p>
            )}
          </div>
        )}
        <Link to={"cart"}>
          <div className="zero">{ cartitemnumber.length}</div>
          <div className="cart">
            <BsCartFill size={22} />
          </div>
        </Link>
      </nav>
    </nav>
  );
};

export default Header;
