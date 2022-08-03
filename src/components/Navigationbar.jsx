import React from "react";
// import { NavLink } from "react-router-dom";
// import { useKeycloak } from "@react-keycloak/web";
import "../styles/navbar.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Navigationbar = () => {
  // const { keycloak } = useKeycloak();

  return (
    <Navbar bg="light" expand="md" size="md">
      <Container fluid>
        <Navbar.Brand href="#">PS Travel</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#action1">Hotels</Nav.Link>
            <Nav.Link href="#action2">Flights</Nav.Link>
            <Nav.Link href="#action2">Trains</Nav.Link>
            <Nav.Link href="#action2">Buses</Nav.Link>
            <Nav.Link href="#action2">Cabs</Nav.Link>
          </Nav>
          <Button variant="danger" size="md" className="pdx-2 m-2">
            Login
          </Button>
          <a href="./registration">
            <Button variant="danger" size="md" className="pdx-2 m-2">
              Sign Up
            </Button>
          </a>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
