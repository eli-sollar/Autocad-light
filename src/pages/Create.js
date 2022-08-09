import React, { useState, Suspense, useEffect } from "react";
import "../styles/steps.css";
import { Container, Row, Modal } from "react-bootstrap";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import httpRequest from "../utility/httpRequest";
import * as constants from '../components/steps/constants';

import { useContext } from 'react';
import StepsContext from "../components/steps/StepsContext";
import Autocad from "../jAutocad/Autocad.jsx"
import BurgerIcon from "../assets/images/burger.svg"
//import AutocadManager from "../components/steps/AutocadManager";

const Create = () => {

  let navigate = useNavigate();
  const httpService = new httpRequest();
  //const AutocadManager = new AutocadManager();
  const stepsContext = useContext(StepsContext);

  let { projectId = 0, stepId = 1 } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  const [activeId, setActive] = useState(stepId);
  const [modalShow, setModalShow] = useState(false);
  const [counter, setCounter] = useState(0);
  const [showSkecher, setShowSkecher] = useState(false);
  const [isShow, setIsShow] = useState(true)
  const [isHalfScreen, setIsHalfScreen] = useState(showSkecher)


  useEffect(() => {
    loadStepsData();

    async function loadStepsData() {
      if (projectId > 0) {

        const localParameters = { "projectId": projectId }
        const params = {
          name: "Projects",
          parameters: JSON.stringify(localParameters)
        };
        const result = await httpService.Get("Data/Get", params);

        if (result && result.Table && result.Table.length == 1) {

          setContextData(JSON.parse(result.Table[0].Draft));
          setIsLoaded(true);
          
         
        }
      

      } else {
        setIsLoaded(true);
      }
    }
   
    
    return () => {
      setShowSkecher(false); // clean warning in the console
    };

  }, []);

  const handleSubmit = async (event, data, noNavigation) => {
    event.preventDefault()
    setCounter(prevState => prevState + 1)
    setIsHalfScreen(showSkecher);
    let _projectId = projectId > 0 ? projectId : 0;
    let _active = noNavigation ? Number(activeId) : Number(activeId) + 1;
    setActive(_active)
    // if(activeId ==  3){
    // console.log("I am i active 3")
    // // setCounter(prev => prev + 1)
    // setActive(3);
    // if(counter != 4){
    //   console.log("I am in here counter 4")
    //   _active = 3
    // }
    // }else{
    // }
    // setActive(_active);
    if (data) {

      setContextData(data);
      var stepsData = stepsContext.stepsData;
      let queryParameters = { "name": "SetProject" };
      try {
        const response = await httpService.Post("Data/Set", stepsData.all, queryParameters);
      
        if (response) {
          _projectId = response;
        }
      } catch (error) {
        console.error("Can't update step data", error)
      }

    }
    console.log(_active, "This is the active")
    navigate(`/Create/${_active}/${_projectId}#${_projectId}`, { state: { isPrev: false } })
  }

  const handlePrevButton = (event) => {

    navigate(`/Create/${_active - 1}/${projectId}#${projectId}`, { state: { isPrev: true } })
    setActive(activeId - 1)
  };

  const Component = loadComponent(activeId)
  function loadComponent(name) {
  const Component = React.lazy(() =>
        import(`../components/steps/Step${name}.js`).catch(() =>
        (import(`../components/steps/step${name}/Step${name}.js`)))
  );



    return Component;
  }

  function handleAutocad(display) {

    setShowSkecher(display);
  }

  function setContextData(data) {
    var stepsHierarchy = stepsContext.stepsData;
    for (const key in data) {
      const element = data[key];
      stepsHierarchy["all"][key] = element;
    }

    stepsContext.setstepsData(stepsHierarchy);
  }

  const handleStep3 = () => {
    setCounter(prevState => prevState + 1)
  }



  return (
    <div>
      <Header  steps={true} activeStep={activeId} />
      <Container className="max-width">
        {
          <div style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: 'space-between',
          }}>
            <div className="bg-white" >
              <Suspense fallback={<div>Loading...</div>}>
                {isLoaded && (
                  <>
                    {isShow && (
                      <>
                        <Component counter={counter} displayAutocad={handleAutocad} OnSubmit={handleSubmit} OnPrev={handlePrevButton} />
                        <div className="my-5" style={{width: 400}}>
                        {activeId === 9 ? (
                            <button
                              className="btn-next pl-auto mt-20"
                              onClick={() => setModalShow(true)}
                            >
                              שמור
                            </button>
                          ) : (activeId == 3 && counter !== 4 ) ? (
                            <div className="d-flex justify-content-around">
                            <button
                              type="button"
                              className="bg-orange btn-next btn-secondary"
                              onClick={handleStep3}
                              form={`step${activeId}`}
                              id="btn-next-stepper"
                            >
                              הבא
                            </button>
                            <button
                              type="submit"
                              className=" btn-next btn btn-outline-secondary"
                              form={`step${activeId}`}
                              id="btn-next-stepper"
                            >
                            הקודם
                            </button>
                            </div>
                            
                          ) :(
                            <div className="d-flex justify-content-around">
                            <button
                              type="submit"
                              className="bg-orange btn-next btn-secondary"
                              form={`step${activeId}`}
                              id="btn-next-stepper"
                            >
                              הבא
                            </button>
                            <button
                              type="submit"
                              className=" btn-next btn btn-outline-secondary"
                              form={`step${activeId}`}
                              id="btn-next-stepper"
                            >
                            הקודם
                            </button>
                            </div>
                          ) }
                            &nbsp;&nbsp;&nbsp;
                          {/* {
                            activeId !== 1 && (
                            <button
                              className="back-btn"
                              onClick={handlePrevButton}
                            >
                              הקודם
                            </button>
                          )
                          } */}
                        
                        
                        </div>
                      </>
                    )}
                  </>
                )}
              </Suspense>
            </div>
 {/* <div className={isHalfScreen ? "wrapper-Autocad-half" : "wrapper-Autocad"}><Autocad show={showSkecher} ></Autocad></div>} */}
             
            {
              <div className="wrapper-Autocad"><Autocad show={showSkecher} ></Autocad></div>}
          </div>
        }
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Container>
    </div>
  );
};


function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <b>!Your project is ready</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ marginLeft: "auto", marginRight: "auto" }}>
          <button className="back-btn">Download PDF</button>
          &nbsp;&nbsp;&nbsp;
          <button className="btn-signin px-5">Share</button>
        </div>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

export default Create;
