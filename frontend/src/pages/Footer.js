import React from "react";
import { Card, Container, Row } from "react-bootstrap";
import { BsFacebook } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { AiFillGooglePlusCircle, AiFillTwitterCircle } from "react-icons/ai";
import SocialApp from "../components/Social";
import { GrLinkedin } from "react-icons/gr";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div
        fluid
        className=" bg-[black] text-[white] w-[100%] p-2 flex sm:flex-row justify-center items-center flex-col "
      >
        <div className="mt-2 w-[100%]  flex flex-col justify-center gap-4 sm:flex-row ">
          <div className="max-w-[300px] ">
            <h2>Our Visions</h2>
            <p className="footer_para">
              To dedicate at it’s best of customer service delivered with a
              sense of warmth, friendliness, individual pride company
              spirit.            </p>
          </div>
          <div className="max-w-[300px]">
            <h2>Our Location</h2>
            <p className="footer_para">
              <p>
              Yuva Pragati,Thamara tower 3rd floor,above hdfc
                bank,Srinivasan nagar,Vayaloor main road Trichy,620017
              </p>
            </p>
          </div>
          <div className="">
            <h2>Quick Link</h2>
            <div className=" flex flex-row justify-content-evenly gap-3">
              <div>
                <NavLink to={'/home'} className="no-underline " >
                  Home
                </NavLink>

              </div>
              <div>
                <NavLink to={'/aboutus'} className="no-underline " >
                  About
                </NavLink>

              </div>
              <div>
                <NavLink to={'/conatctus'} className="no-underline " >
                  Contact
                </NavLink>

              </div>
            </div>
          </div>
          <div className="">
            <h2>Connect Us</h2>
            <div className=" flex flex-row justify-content-evenly ">
              <div>
                <a
                  href="https://www.facebook.com/sonuverma.raj.9?mibextid=ZbWKwL"
                  target={"_blank"}
                >
                  <BsFacebook
                    size="26"
                    className="  w-[25px] h-[25px] rounded-[50%] hover:rounded-[50%] mb-2 "
                    round={true}
                  >
                    {" "}
                  </BsFacebook>
                </a>
              </div>
              <div>
                <a
                  href="https://www.linkedin.com/in/sonu-verma-64898520a/"
                  target={"_blank"}
                >
                  <GrLinkedin
                    size="26"
                    className="  rounded-[50%] hover:rounded-[50%] mb-2 "
                    lightingColor="white"
                    round={true}
                  ></GrLinkedin>
                </a>
              </div>
              <div>
                <a
                  href="https://twitter.com/SonuVer79248630?t=DTHZNY53drLDZC55pdppZA&s=08"
                  target={"_blank"}
                >
                  <AiFillTwitterCircle
                    size="26"
                    className="  rounded-[50%] hover:rounded-[50%] mb-2 "
                    lightingColor="white"
                    round={true}
                  ></AiFillTwitterCircle>
                </a>
              </div>
              <div>
                <a href="https://www.google.co.in/search?ei=ASURWsmgB8nXvgSvzKywDg&q=+imperial+management+trichy&oq=+imperial+management+trichy&gs_l=psy-ab.3..35i39k1l2j0l7j0i8i30k1.2713.4599.0.5572.3.2.1.0.0.0.93.180.2.2.0....0...1.1.64.psy-ab..0.3.180....0.IYQgghPUAOk">
                  <AiFillGooglePlusCircle
                    size="26"
                    className="  rounded-[50%] hover:rounded-[50%] mb-2 "
                    lightingColor="white"
                    round={true}
                  ></AiFillGooglePlusCircle>
                </a>
              </div>
            </div>
          </div>

          <div className="">
            <h2>Contact Info</h2>
            <span> 7830360293 </span>
            <p> yuvapragati.pvt@gmail.com </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
