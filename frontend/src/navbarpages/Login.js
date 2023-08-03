import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import { loginimg } from "../assests";
import { toast } from "react-hot-toast";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { loginRedux } from "../redux/userSlice";
import Footer from "../components/Footer";
const Login = () => {
  const [Data, setData] = useState({
    email: "",
    password: "",
  });
  console.log(Data);
  const [showPassword, setShowPassword] = useState(false);
  const handleshowpassword = () => {
    setShowPassword((prev) => !prev);
  };
  const navigate = useNavigate();
  const userData = useSelector((state) => state);
  const dispatch = useDispatch();
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

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { email, password } = Data;
    if (email && password) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(Data),
        }
      );
      const dataRes = await fetchData.json();
      console.log(dataRes);

      toast(dataRes.message);

      if (dataRes.alert) {
        dispatch(loginRedux(dataRes));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
      console.log(userData);

      // console.log(userData);
    } else {
      alert("please enter required fields");
    }
  };

  return (
    <div className="whole">
      <img className="loginimage" src={loginimg} alt="loginimg" />
      {/* <h1 className="welcomeback">WELCOME BACK</h1> */}
      <form onSubmit={handlesubmit}>
        <div className="mainlogin">
          <h2 className="headinglogin">Login</h2>

          <input
            className="email"
            type="email"
            name="email"
            placeholder="Email"
            email={true.toString()}
            value={Data.email}
            onChange={HandleonChange}
          ></input>
          <input
            className="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            password={true.toString()}
            value={Data.password}
            onChange={HandleonChange}
          ></input>
        </div>

        <button type="submit" className="btn btn-primary buttonprimary">
          Login
        </button>
      </form>
      <p className="lastelementforthis">
        Don't have an account ? <a href="/Signup">Click here</a>
      </p>

      <span className="hideunhidelogin" onClick={handleshowpassword}>
        {showPassword ? (
          <AiOutlineEye size={30} />
        ) : (
          <AiOutlineEyeInvisible size={30} />
        )}
      </span>
      <Footer  className= "footerclass"/>
    </div>
  );
};

export default Login;
