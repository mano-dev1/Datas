import { useState } from "react";
import { Button, Container, Image, Nav, Navbar, Offcanvas, InputGroup, FormControl, NavDropdown, Form, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo  from  "../../assets/logo.png"
import "../../styles/Common-old.css"


function Header(props) { 
  var address = sessionStorage.getItem("meta_address");
  const [isShow, setShow] = useState(false);

  const handleClose = () => setShow(false);  
  const handleShow = () => setShow(true);
  const [offset, setOffset] = useState(0);

  console.log(offset); 
  // var active = "home";

  return (
    <div className="header-main">
      <Navbar className="d-none d-lg-block" expand="lg">
        <Container>
          <Navbar.Brand href="/" >
            <Image src={logo} className="width150"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <div className="w-100 d-flex justify-content-end">
              <Nav
                className="w-60 my-lg-0 d-flex justify-content-around align-items-center"
                navbarScroll
              >
                <Nav.Link href="/" className={props.active == "home" && "active-nav"}>Home</Nav.Link>
                <Nav.Link href="/Tokenomics">Tokenomics</Nav.Link>
                <Nav.Link href="/Schedule" >Schedule </Nav.Link>
                <Nav.Link href="/Team">Team</Nav.Link>
                <Nav.Link href="/dashboard" className={props.active == "dashboard" && "active-nav"}>Dashboard</Nav.Link>
                <Button href={address ? "/logout" : "/ConnectWallet"} className="header-contactbtn btn btn-primary mx-1">
                  <Nav.Link href={address ? "/logout" : "/ConnectWallet"} className="text-black" >{address ? "Logout Wallet" : "Connect Wallet"}</Nav.Link>
                </Button>
              </Nav>
            </div>
          </Navbar.Collapse>

        </Container>
      </Navbar>

      <Navbar className="d-block d-lg-none" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/" className="mobw-30">
            <Image src={logo} className="width-webkit " />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={() => handleShow()} />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
            show={isShow}
            onHide={() => handleClose()}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menus</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                
              <div className="mb-2">
                <Link className="mb-4" to="/">Home</Link><br />
              </div>
              <div className="mb-2">
                <Link className="mb-4" to="/Tokenomics">Tokenomics</Link><br />
              </div>
              <div className="mb-2">
                <Link to="/Schedule"> Schedule </Link>
              </div>
              <div className="mb-2">
                <Link to="/Team"> Team </Link>
              </div>
              <div className="mb-2">
                <Link to="/dashboard"> Dashboard </Link>
              </div>
              <div className="mb-2">
                <Link to="/ConnectWallet"> Connect Wallet </Link>
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header;
