import React from "react";
import Footer from "../components/Footer";
import { BsTelephoneInbound } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { ImLocation2 } from "react-icons/im";
import "./conatct.css";

const Contact = () => {
  return (
    <div className="mainbodyclass">
      <div
         className="middleclass"
      >
        <div className="childclasss"
        >
          <div className ="insidechildclass">
            <h1 className="mainheadinconatct">
              Contact Info
            </h1>
            <BsTelephoneInbound className="telephonesign"  size={30} />
            <span className="spanheadin1" >
              (0744) - 2320520
            </span>
            <AiOutlineMail className="mailsign"  size={30} />
            <span className="spanheadin2" >
              joshiaksht133@gmail.com
            </span>
            <ImLocation2 className="locationsign"  size={30} />
            <span className="spanheadin3" >
              (JUET), MP-Guna
            </span>
          </div>
          <div className="rightsidemain" >
            <input className="input1name" placeholder="Enter your name"></input>
            <input className="input2email"  placeholder="Enter a valid email address"></input>
            <textarea className="input3text"
           
              
              rows={5}
              cols={44}
              name="description"
              placeholder="Enter your message"
            ></textarea>
            <button className="btn mybuttonsubmit">SUBMIT</button>

          </div>
        </div>
      </div>
      <Footer className ="hellofooter"
      />
    </div>
  );
};

export default Contact;
