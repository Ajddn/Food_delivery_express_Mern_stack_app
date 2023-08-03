import React, { useState } from "react";
import "./signup.css";
import { signupimg } from "../assests";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { toast } from "react-hot-toast";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Signup = () => {
  const [Data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  console.log(Data);
  const [showPassword, setShowPassword] = useState(false);
  const handleshowpassword = () => {
    setShowPassword((prev) => !prev);
  };
  const [confirmPassword, setConfirmPassword] = useState(false);
  const handleconfirmpassword = () => {
    setConfirmPassword((prev) => !prev);
  };
  const navigate = useNavigate();
  const HandleonChange = (e) => {
    // const [name, value] = e.target;
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  console.log(process.env.REACT_APP_SERVER_DOMAIN);
  const handlesubmit = async (e) => {
    e.preventDefault();
    const { firstname, email, password, confirmpassword } = Data;
    if (firstname && email && password && confirmpassword) {
      if (password === confirmpassword) {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/signup`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(Data),
          }
        );
        const datares = await fetchData.json();
        console.log(datares);
        // alert(datares.message);
        toast(datares.message);
        if (datares.alert) {
          navigate("/Login");
        }
      } else {
        alert("password and confirm password are not equal");
      }
    } else {
      alert("please entre required filed");
    }
  };

  return (
    <div className="whole">
      <img className="image" src={signupimg} alt="loginimg" />
      <form onSubmit={handlesubmit}>
        <div className="main">
          <h2 className="heading">Signup</h2>

          <input
            className="first"
            type="text"
            placeholder="First Name"
            name="firstname"
            value={Data.firstname}
            onChange={HandleonChange}
          ></input>
          <input
            className="second"
            type="text"
            placeholder="Last Name"
            name="lastname"
            value={Data.lastname}
            onChange={HandleonChange}
          ></input>
          <input
            className="third"
            type="email"
            name="email"
            placeholder="Email"
            email={true.toString()}
            value={Data.email}
            onChange={HandleonChange}
          ></input>
          <input
            className="fourth"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            password={true.toString()}
            value={Data.password}
            onChange={HandleonChange}
          ></input>
          <input
            className="
            fifth"
            type={confirmPassword ? " text" : "password"}
            name="confirmpassword"
            placeholder=" Confirm Password"
            password={true.toString()}
            value={Data.confirmpassword}
            onChange={HandleonChange}
          ></input>
        </div>

        <button type="submit" className="btn btn-primary button">
          signup
        </button>
      </form>
      <p className="lastelement">
        Have an account ? <a href="/Login">Click here</a>
      </p>
      <span className="hideunhide" onClick={handleshowpassword}>
        {showPassword ? (
          <AiOutlineEye size={30} />
        ) : (
          <AiOutlineEyeInvisible size={30} />
        )}
      </span>
      <span className="hideunhideconfirm" onClick={handleconfirmpassword}>
        {confirmPassword ? (
          <AiOutlineEye size={30} />
        ) : (
          <AiOutlineEyeInvisible size={30} />
        )}
      </span>
      <Footer  className= "footerclass"/>
    </div>
  );
};

export default Signup;
