import React, { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbars from "../components/Navbars";
import axios from "axios";

function CreateDiary() {
  const token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [warning, setWarning] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { title, content };

    try {
      const response = await axios.post(
        "https://private-amnesiac-c75abc-halfwineaid.apiary-proxy.com/diary",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      console.log("Successfully", response);
      navigate("/");
      setTitle("");
      setContent("");
    } catch (error) {
      if (error.response.status === 401) {
        alert(error.response.data.message);
      } else if (error.response.status === 422) {
        alert(`${error.response.data.message}`);
      } else if (error.response.status === 404) {
        alert(error.response.data.message);
      } else {
        alert(error.response.data.message);
      }
    }
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 500) {
      setContent(inputValue);
      setWarning(false);
    } else {
      setWarning(true);
    }
  };

  function handleTitleChange(event) {
    const newTitle = event.target.value;
    const isAlphanumeric = /^[a-zA-Z0-9\s]+$/.test(newTitle);
    if (!isAlphanumeric && newTitle.length > 0) {
      setErrorMessage(
        "The diary title must only contain alphanumeric characters"
      );
    } else {
      setErrorMessage("");
      setTitle(newTitle);
    }
  }

  return (
    <>
      <Navbars />
      <div className="min-vh-100">
        <Container style={{ paddingTop: "5rem" }}>
          <Card className="p-2">
            <Card.Body>
              <Card.Title className="text-center mb-4">Create Diary</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    className="mb-1"
                  />
                  <p style={{ color: "red" }}>{errorMessage}</p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicContent">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={10}
                    value={content}
                    onChange={handleChange}
                    className="mb-2"
                  />
                  {warning && (
                    <p style={{ color: "red" }}>
                      You have reached the maximum limit of 500 characters.
                    </p>
                  )}
                </Form.Group>
                <Form.Group className="d-flex justify-content-end">
                  <Button variant="primary" type="submit" className="w-25">
                    Save
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
}

export default CreateDiary;
