import React, { useEffect } from "react";
import "../styles/Login.css";
import { makeStyles } from "@mui/styles";
import { Container, Navbar } from "react-bootstrap";
import logo from "../assets/images/logo.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Step, StepLabel, Stepper } from "@mui/material";

const data = [
  { title: "תחילת הפרוייקט" },
  { title: "שירטוט הגג" },
{title:"הזנת מידות"},
  { title: "הזנת נתונים" },
  { title: "סימון פטות" },
  { title: "תוכנית הצבה" },
  { title: "תוכנית הצבה - קונסטרוקציה" },
  { title: "הערות" },
  { title: "סיום" },
];

const useStyles = makeStyles({
  root: {
    "& .muirtl-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active": {
      color: "#ff8603",
    },
    "& .muirtl-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed": {
      color: "#ff8603",
    },
  },
});

const Header = ({ btn, steps, activeStep, projectId1 }) => {
  const classes = useStyles();

  let navigate = useNavigate();
  let { projectId } = useParams();
  const location = useLocation();
  useEffect(() => {

    if (location.pathname.toLocaleLowerCase() === "create") {
      if (!projectId1) { projectId1 = 0; }
      if (projectId1 !== projectId) {
        navigate(`/Create/${activeStep}/${projectId}`, { replace: true })
      }
    }
  }, [useNavigate, useParams]);

 
  let route;

 
  if (btn === "SIGN UP") {
    route = "/signup";
  } else if (btn === "LOG IN") {
    route = "/";
  } else if (btn === "LOG OUT") {
    route = "/";
  }

  const handleStep = (step) => () => {

    //setActiveStep(step);
    activeStep = step;
  };
  return (
    <Navbar className="navbar" style={{ maxWidth: "100%" }} dir="rtl">


      <Container>
        <Navbar.Brand href="/" className="py-2">
          <img src={logo} alt="logo" className="logo" />
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-center">
          {steps === true && (
            <Stepper
              className={classes.root}
              activeStep={activeStep - 1}//can't change the default start step to 1
              alternativeLabel

            >
              {data.map((label, ind) => (
                <Step key={ind}>
                  <StepLabel>{label.title}</StepLabel>
                  {/* <StepButton color="inherit" onClick={handleStep(ind)}>
                  {label.title}
            </StepButton> */}
                </Step>

              ))}
            </Stepper>
          )}
        </Navbar.Collapse>
        <Link to={route}>
          <button className="btn-signin px-5">{btn}</button>
        </Link>
      </Container>
    </Navbar>
  );
};

export default Header;
