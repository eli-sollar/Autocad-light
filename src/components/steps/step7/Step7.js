
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Col, Row } from "react-bootstrap";

import StepsContext from "../StepsContext";


import { reducer, initialState } from './store/index';
import * as actions from './store/actions';
import CircularProgress from '@mui/material/CircularProgress';
//import AutocadManager from "../AutocadManager";
import { useParams } from "react-router-dom";
import CircularProgressWithLabel from "../../../ui-components/CircularProgressWithLabel";

const step7 = (props) => {

  const stepContext = useContext(StepsContext);

 
 // const AutocadManager = new AutocadManager();
  const [store, dispatch] = useReducer(reducer, initialState);
  const [txtComments, setTxtComments] = useState("");
  const [roofTypeId, setRoofTypeId] = useState();
  const [progress, setProgress] = useState(0);
  let { projectId } = useParams();
const [dataLoaded,setDataLoaded]=useState(false);
  const [labels, setLabels] = useState({});
  const [plannerId,setPlannerId] = useState();
  useEffect(() => {
    props.displayAutocad(true);
    loadStepData();
  }, []);

  function loadStepData() {

    let data = stepContext.stepsData.all;
    actions.setModalTypeText(dispatch, data.modalTypeText);
    //actions.setLabelText(dispatch, data.labelText);
    setRoofTypeId(data.roofTypeId);
    setPlannerId(data.UserId);
  }

  const drawCircle = async (event) => {
    event.preventDefault();
  
    //let progress=10;
    setProgress(progress+10);
   setDataLoaded(true);
    for (const [keys, value] of mapMultiKey) {

      for (let index = 0; index < value.parameters.length; index++) {
        
            setProgress(progress+10);
     

         
        }

      
     
    }
    setProgress(100);
  };
  
  const handleSubmit = (event) => {
    
    let parameters = {
      modalTypeText: store.modalTypeText,
      //labelText: store.labelText,
      txtComments: txtComments,
      labels:labels,
      UserId:plannerId,
      ProjectId:projectId
    }
    
    props.OnSubmit(event, parameters);
  };

  return (
    <div>
      <h2 className="py-5 mt-5">תוכנית הרכבה - קונסטרוקציה</h2>
     
   {dataLoaded && <CircularProgressWithLabel value={progress} ></CircularProgressWithLabel>}
      <form onSubmit={handleSubmit} id="step7">
        <Row className="text-center mb-5 pb-5">
          <Col>
            <button onClick={drawCircle}> צור קונסטרוקציה</button>
          </Col>
          <Col>

          </Col>
        </Row>
      </form>
    </div>
  );
};

export default step7;
