import React, { useContext, useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/Login.css";
import { Alert } from '@mui/material';

import httpRequest from "../utility/httpRequest.js"
import SelectCustom from "../ui-components/select";
import StepsContext from "../components/steps/StepsContext";
const Login = () => {
  let [userName, setUserName] = useState();
  let [password, setPassword] = useState();
  const [planner, setPlannerId] = useState();
  const [showText, setShowText] = useState(false);
  const stepsContext = useContext(StepsContext);
  const navigate = useNavigate();
  useEffect(() => {
    clearContext();


  }, []);
  const clearContext = () => {
    let stepsHierarchy = stepsContext.stepsData;
    for (const key in stepsContext.stepsData["all"]) {

      stepsHierarchy["all"][key] = null;
    }
    stepsContext.setstepsData(stepsHierarchy);
  };
  async function handleSubmit(event) {

    event.preventDefault();
    setShowText(false);
    const http = new httpRequest();
    var parameters = { username: userName, password: password };
    try {
      //const response = await http.Post("Login/SignIn", parameters);
      //if (response === true) {

      // navigate("Dashboard"); TODO
      //} else {
      //setShowText(true);
      // }
    } catch (error) {
      setShowText(true);
    }
  }

  return (
    <div>

      <Header btn={"SIGN UP"} />
      <Container className="d-flex justify-content-center align-items-center">
        <div className="loginCard mt-5 pt-5">
          <h1 className="login-title mb-4 mt-2">הזדהות</h1>
          <h6 className="login-sub">
            משתמש חדש{" "}
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "#ff8603" }}
              className="create-account"

            >
              <div> צור משתמש</div>
            </Link>
          </h6>
          <hr className="my-5" />
          {showText &&
            <Alert variant="outlined" severity="error">
              !Wrong user name or password
            </Alert>
          }
          <Form onSubmit={handleSubmit}>
            {/* <Form.Group className="mb-4">
              <Form.Control
                type="email"
                name="userName"
                placeholder="E-mail"
                className="px-3 py-2"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                className="px-3 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group> */}
            <SelectCustom onChange={(data, type) => setPlannerId(data)} name="Planner" dataSource="Planners" lKey="Id" value="UserName" label="שם מתכנן"></SelectCustom>
            {/* <h4 className="forgot-text mb-4">?Forgot your password</h4> */}


            <Link to={'Dashboard'} state={{ plannerId: planner }}> <button className="login-btn" type="submit">  LOG IN </button> </Link>
            {/**/}


            <h3 className="privacy-text py-4">
              By clicking the "Sign in" to accept the terms of the{" "}
              <a href="/" style={{ textDecoration: "none", color: "#ff8603" }}>
                Privacy and Policy
              </a>
            </h3>
          </Form>
        </div>
      </Container>
    </div>
  );

}
export default Login;
