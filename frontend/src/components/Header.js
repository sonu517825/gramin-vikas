import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className=" bg-opacity-0 sticky-top bg-white "
        variant="light"
      >
        <Container>
          <Navbar.Brand>
            <img src={"/image/network logo.png"} className=" sm:w-[70px] w-[50px] ml-[60px] " style={{ borderRadius: '0.4rem', }} alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle className="bg-white border-1  " aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto header_items ">
              {/* <Nav.Link>logo</Nav.Link> */}
            </Nav>
            <Nav className="me-auto header_items ">
              <NavLink to="/home" className="li_item">
                <span style={{ fontWeight: 800, fontSize: "1.5rem" }}>Home</span>
              </NavLink>
              <NavLink to="/aboutus" className="li_item">
                <span style={{ fontWeight: 800, fontSize: "1.5rem" }}>About</span>

              </NavLink>
              <NavLink to="/conatctus" className="li_item">
                <span style={{ fontWeight: 800, fontSize: "1.5rem" }}>Contact</span>

              </NavLink>
              <NavLink to="/verify" className="li_item">
                <span style={{ fontWeight: 800, fontSize: "1.5rem" }}>Register</span>

              </NavLink>
              <NavLink to="/login" className="li_item">
                <span style={{ fontWeight: 800, fontSize: "1.5rem" }}>Login</span>

              </NavLink>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
