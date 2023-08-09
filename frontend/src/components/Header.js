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
            <img src={"/image/network logo.jpg"} className=" sm:w-[100px] w-[80px] " alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle className="bg-white border-1  " aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto header_items ">
              {/* <Nav.Link>logo</Nav.Link> */}
            </Nav>
            <Nav className="me-auto header_items ">
              <NavLink to="/home" className="li_item">
                Home
              </NavLink>
              <NavLink to="/aboutus" className="li_item">
                About
              </NavLink>
              <NavLink to="/conatctus" className="li_item" eventKey={2}>
                Contact
              </NavLink>
              <NavLink to="/verify" className="li_item">
                Register
              </NavLink>
              <NavLink
                to="/login"
                className="li_item"
              >
                Login
              </NavLink>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
