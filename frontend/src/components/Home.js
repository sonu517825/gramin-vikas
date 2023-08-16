import React from "react";
import { ImForward } from "react-icons/im";
// import Pic2 from "../../image/Pic2.png";
// import { Card, Col, Container, Row } from "react-bootstrap";

function Home() {
  return (
    <>
      <div className="p-4 about  ">
        <div className="flex justify-center align-items-center flex-col lg:flex-row  ">
          <div className="" >
            <h3 className="text-4xl sm:text-6xl" >Who we are ?...</h3>
            <div className="flex-1">
              <p className="">
                <span className="">
                  <ImForward />
                </span>
                Yuva Pragati is a young emerging firm in the global
                market providing independent platform for emerging leaders for
                the field of service and management in this competitive market.
              </p>
              <span>
                <ImForward />
              </span>
              <p>
                {" "}
                Yuva Pragati is a part of a global network that sells
                products and services on behalf of blue-chip companies.
              </p>
              <p>
                <span>
                  <ImForward />
                </span>
                We take pride in helping to add value to the clients we
                represent of the bottom line by securing new customers, or
                raising awareness of their services. And our performance-based
                model means they only pay for the results we deliver.
              </p>
              <p>
                <span>
                  <ImForward />
                </span>
                We believe responsible face-to-face marketing creates a
                connection with consumers, delivers value to clients, and
                supports small businesses and entrepreneurs
              </p>
              
            </div>
          </div>

          <div className="p-12">
            <img src={"/image/network logo.jpg"} alt="logo" />
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Home;
