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
      <Header btn={"הירשם"} />
      <Container className="d-flex flex-column login justify-content-center align-items-center">
        <div className=" loginCard">
          <h1 className="text-center">התחברות</h1>
          <Form>
            <Form.Group className="mb-4">
              <label>שם משתמש</label>
              <Form.Control
                type="email"
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
           <Link to={"Dashboard"}><button  className="login-btn" type="submit">
            התחבר      
            </button></Link> 
          </Form>
        </div>
      </Container>
    </div>
  );

}
export default Login;
