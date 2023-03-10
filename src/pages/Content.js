import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Image,
  Navbar,
  OverlayTrigger,
  Pagination,
  Popover,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Diary.css";
import Moment from "react-moment";
import logo from "../assets/logo.png";
import user from "../assets/user.png";
import { useQuery } from "react-query";

function Content() {
  const token = localStorage.getItem("token");
  const [diary, setDiary] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchDiary = async () => {
      const response = await axios.get(
        `https://private-amnesiac-c75abc-halfwineaid.apiary-proxy.com/diary?page=${activePage}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      setDiary(response.data.data);
      setTotalPages(Math.ceil(response.data.total_data / 10));
    };
    fetchDiary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchInput(value);
  };

  const filteredDiary = diary.filter(
    (item) =>
      item.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.content.toLowerCase().includes(searchInput.toLowerCase())
  );

  const displayDiary = filteredDiary.map((item) => (
    <Link
      to={`/diary/` + item.id}
      className="text-decoration-none text-dark"
      key={item.id}
    >
      <Card>
        <Card.Body className="d-flex justify-content-between">
          <Card.Title>{item.title}</Card.Title>
          <Card.Text className="text-muted">
            <Moment fromNow>{item.updated_at}</Moment>
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  ));

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

  const axiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const { data: record } = useQuery("recordCache", async () => {
    const response = await axiosInstance.get(
      "https://private-amnesiac-c75abc-halfwineaid.apiary-proxy.com/diary"
    );
    return response.data.total_data;
  });

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
              <Form.Control
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={handleSearch}
              />
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

      <div className="min-vh-100">
        <Container
          className="d-flex flex-column gap-3"
          style={{ paddingTop: "5rem" }}
        >
          <div>My Diary: {record}</div>
          {displayDiary.length === 0 && (
            <div className="text-center mt-5 fw-bold fs-5 text-muted">
              Data Diary 0
            </div>
          )}
          {displayDiary}
          <Pagination className="my-5" size="lg">
            <Pagination.First
              disabled={activePage === 1}
              onClick={() => handlePageChange(1)}
            />
            <Pagination.Prev
              disabled={activePage === 1}
              onClick={() => handlePageChange(activePage - 1)}
            />
            {Array.from({ length: totalPages }).map((_, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === activePage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={activePage === totalPages}
              onClick={() => handlePageChange(activePage + 1)}
            />
            <Pagination.Last
              disabled={activePage === totalPages}
              onClick={() => handlePageChange(totalPages)}
            />
          </Pagination>
        </Container>
      </div>

      <Link to="/create-diary" className="text-decoration-none text-white">
        <Button
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "50px",
            height: "50px",
            color: "white",
          }}
        >
          +
        </Button>
      </Link>
    </>
  );
}

export default Content;
