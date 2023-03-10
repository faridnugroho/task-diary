import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Container,
  Form,
  Image,
  Navbar,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import user from "../assets/user.png";

export default class Navbars extends Component {
  render() {
    const popover = (
      <Popover id="popover-basic">
        <Popover.Body>
          <Link
            className="text-decoration-none text-dark"
            to={"/login"}
            onClick={() => {
              localStorage.removeItem("token");
            }}
          >
            Logout
          </Link>
        </Popover.Body>
      </Popover>
    );
    return (
      <>
        <Navbar fixed="top" bg="light" variant="light" expand="sm">
          <Container fluid>
            <Link to="/" className="text-decoration-none text-white">
              <Navbar.Brand>
                <Image
                  src={logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />{" "}
                Diary
              </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="navbarScroll">
              <Form className="d-flex w-100 me-2">
                <Form.Control type="search" placeholder="Search" />
              </Form>
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={popover}
              >
                <Button variant="light">
                  <Image src={user} />
                </Button>
              </OverlayTrigger>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}
