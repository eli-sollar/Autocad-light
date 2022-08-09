import React from "react";
import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "../styles/Login.css";
const Signup = () => {
  return (
    <div>
      <Header btn={"התחבר"} />
      <Container className="d-flex flex-column login justify-content-center align-items-center">
        <div className=" loginCard">
          <h1 className="text-center">צור משתמש</h1>
          <Form>
            <Form.Group className="mb-4">
              <label>שם </label>
              <Form.Control
                type="email"
                className="px-3 py-2"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <label>מייל </label>
              <Form.Control
                type="password"
                className="px-3 py-2"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <label>סיסמא</label>
              <Form.Control
                type="password"
                className="px-3 py-2"
              />
            </Form.Group>
            <button className="login-btn" type="submit">
            צור   
            </button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Signup;
