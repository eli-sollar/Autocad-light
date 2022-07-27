import React, { useContext, useEffect, useState } from "react";
import ImageWrapper from "../../utility/ImageWrapper";
import {Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import * as constants from './constants';
import "../../App.css";

import { addCustomEvents, removeCustomEvents } from './eventsManager';
import StepsContext from "./StepsContext";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";


const Step2 = (props) => {
  const [show, setShow] = useState(false);
  const [absoluteZeroPointText, setAbsoluteZeroPointText] = useState("בחר");
  const [zeroPointAbsoluteEnable, setZeroPointAbsoluteEnable] = useState(false);
  let { projectId, stepId } = useParams();
  const [direction, setDirection] = useState();
  const [plannerId, setPlannerId] = useState();
  const [roofTypeId, setRoofTypeId] = useState();
  const [roofAngle, setRoofAngle] = useState(0);
 const [zeroPointAbsolute,setZeroPointAbsolute]=useState({ x: 0, y: 0, direction: 'up', maxYRange: 0 });

  const stepContext = useContext(StepsContext);
  
  useEffect(() => {
    props.displayAutocad(true);
    loadStepData();
    addCustomEvents(AutocadPickedEvent);
    return () => {
      removeCustomEvents(AutocadPickedEvent);
    };
  }, [absoluteZeroPointText]);
    function loadStepData() {
    let data = stepContext.stepsData["all"];
    setDirection(data.roofDirections);
    setRoofAngle(data.roofAngle);
    setPlannerId(data.UserId);
    setRoofTypeId(data.roofTypeId)
  }

  const absoluteZeroPointHandler = (event) => {
    setZeroPointAbsoluteEnable(!zeroPointAbsoluteEnable);
    if (zeroPointAbsoluteEnable) {
      setAbsoluteZeroPointText("בחר");
    } else {
      setAbsoluteZeroPointText("אישור");
    }


    event.preventDefault();
  };

 
  
  const AutocadPickedEvent = ({ detail }) => {
    
  };


  const handleSubmit =  (event) => {
    let parameters = {
      ProjectId: projectId,
      stepIndex: stepId,
      isDraft: true,
      UserId: plannerId ,
      zeroPointAbsolute:zeroPointAbsolute ,
      roofAngle: roofAngle,
      roofDirections: direction
    };

   
    props.OnSubmit(event, parameters);

  };


  return (<>
    <div className={show ? " hide" : ""}>
      <Row className="my-5">
        <form onSubmit={handleSubmit} id="step2">
          <h2 className="py-5">שרטט את הגג</h2>

         {roofTypeId != constants.ROOF_TYPE.FLAT && (  <Row>

            <Col>
<>
                <TextField
                  id="roof-angle"
                  label="זויית הגג"
                  value={roofAngle}
                  onChange={(e) => setRoofAngle(e.target.value)}
                  autoComplete='off'
                  color="primary"
                />
              
              <FormControl>
                <FormLabel id="roof-angle">זווית הגג ביחס לקרקע</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="roof-angle"
                  name="roof-angle"
                  value={direction  || ''}
                  onChange={(e) => setDirection(e.currentTarget.value)}>
                  <FormControlLabel value="north" key="north" label="זוית לכיוון צפון" control={<Radio icon={<ImageWrapper pWidth={"100"} pHeight={"100"} src={"angle-to-north.jpg"} />} checkedIcon={<ImageWrapper pWidth={"120"} pHeight={"120"} class="img-selected" src={"images\angle-to-north.jpg"} />} />} />
                <FormControlLabel value="south" key="south" label="זוית לכיוון דרום" control={<Radio icon={<ImageWrapper pWidth={"100"} pHeight={"100"} src={"angle-to-south.jpg"} />} checkedIcon={<ImageWrapper pWidth={"120"} pHeight={"120"} class="img-selected" src={"images\angle-to-south.jpg"} />} />} />
                </RadioGroup>

              </FormControl></>
               </Col>
            
          </Row> ) }
        
          <span>--------------------</span>
          <div>אחרי סיום שרטוט הגג, לחץ על האייקון האדום ובחר את הנקודה שתייצג את ראשית הצירים</div>
            <div>כשתסיים לחץ שוב על האייקון.</div>
            <div>
              ({Math.ceil(zeroPointAbsolute?.x)},{Math.ceil(zeroPointAbsolute?.y)})
            </div>
            <button onClick={absoluteZeroPointHandler}>{absoluteZeroPointText}</button>
        </form>
      </Row>
    </div>
  </>
  );
};

export default Step2;
