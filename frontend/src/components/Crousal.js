import Carousel from "react-bootstrap/Carousel";
import { motion } from "framer-motion";

function Crousel() {
  return (
    <Carousel className="causel">
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100 img "
          src={
            "https://img.freepik.com/premium-photo/businessman-holding-tablet-hot-fire-glowing-upright-arrow-financial-banking_34200-481.jpg?w=1380 "
          }
          alt="First slide"
          width="100%"
        />
        <Carousel.Caption>
          <div class="container">
            <div class="row">
              <div class="col-sm-12 flex justify-center items-center text-center">
                <motion.h3
                    animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, repeatDelay: 1 , repeatType: "reverse" , type: "spring",bounce: 0.25, stiffness: 50,ease:"easeOut"  }}
                  className=" animate-charcter text-sm-center md:text-[150px] text-5xl sm:text-7xl"
                >
                 Yuva Pragati
                </motion.h3>
              </div>
            </div>
          </div>
          <p>
            “If you always do what you've always done, you'll always get what
            you've always got.”
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100 img "
          src={
            "https://img.freepik.com/free-photo/man-jumping-impossible-possible-cliff-sunset-background-business-concept-idea_1323-266.jpg?w=900&t=st=1670004423~exp=1670005023~hmac=e686633c7313614c82897d8d558c752a10a2455a002e8422d1fcbe9952179fa9"
          }
          alt="Second slide"
        />
        <Carousel.Caption>
          <div class="container">
            <div class="row">
              <div class="col-md-12 flex justify-center items-center text-center">
              <motion.h3
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, repeatDelay: 1 , repeatType: "reverse" , type: "spring",bounce: 0.25, stiffness: 50,ease:"easeOut"  }}
                  className=" animate-charcter text-sm-center md:text-[150px] text-5xl sm:text-7xl"
                >
                 Yuva Pragati
                </motion.h3>
              </div>
            </div>
          </div>

          <p>
            “Your most unhappy customers are your greatest source of learning."
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100 img "
          src={
            "https://img.freepik.com/premium-photo/pain-gain-concept-hand-flip-wood-cube-change-word-blue-background_448865-2551.jpg"
          }
          alt="Third slide"
        />
        <Carousel.Caption>
          <div class="container">
            <div class="row">
              <div class="col-md-12 flex justify-center items-center text-center">
              <motion.h3
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, repeatDelay: 1 , repeatType: "reverse" , type: "spring",bounce: 0.25, stiffness: 50,ease:"easeOut"  }}
                  className=" animate-charcter text-sm-center md:text-[150px] text-5xl sm:text-7xl"
                >
                Yuva Pragati
                </motion.h3>
              </div>
            </div>
          </div>
          <p style={{ color: "black" }}>
            ''Do what you love and success will follow. Passion is the fuel
            behind a successful career.''
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Crousel;
