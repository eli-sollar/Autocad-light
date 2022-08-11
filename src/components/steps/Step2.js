import React, { useContext, useEffect, useState } from "react";
import ImageWrapper from "../../utility/ImageWrapper";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import * as constants from './constants';
import "../../App.css";

import { addCustomEvents, removeCustomEvents } from './eventsManager';
import StepsContext from "./StepsContext";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { Container } from "@mui/system";


const Step2 = (props) => {
  const [show, setShow] = useState(false);
  const [absoluteZeroPointText, setAbsoluteZeroPointText] = useState("בחר");
  const [zeroPointAbsoluteEnable, setZeroPointAbsoluteEnable] = useState(false);
  let { projectId, stepId } = useParams();
  const [direction, setDirection] = useState();
  const [plannerId, setPlannerId] = useState();
  const [roofTypeId, setRoofTypeId] = useState();
  const [counter, setCounter] = useState([]);
  const [roofAngle, setRoofAngle] = useState(0);
  const [zeroPointAbsolute, setZeroPointAbsolute] = useState({ x: 0, y: 0, direction: 'up', maxYRange: 0 });

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

  useEffect(()=>{
  setCounter(counter)
  }, [counter])

  const myCounter = () => {
     let tem = counter; 
     let x = counter.length ; 
     x ++ ;
     x.toString()
     setCounter(oldArray => [...oldArray, x]);

 }


  const handleSubmit = (event) => {
    let parameters = {
      ProjectId: projectId,
      stepIndex: stepId,
      isDraft: true,
      UserId: plannerId,
      zeroPointAbsolute: zeroPointAbsolute,
      roofAngle: roofAngle,
      roofDirections: direction
    };


    props.OnSubmit(event, parameters);

  };


  return (<>
    <div className={show ? " hide" : ""}>
      <Row>
        <form onSubmit={handleSubmit} id="step2">
          <h2 className="text-center">שרטוט הגג</h2>
          <div className="counter d-flex justify-content-end">
            <button type="button" disabled={counter.length >= 4} className="p-1 px-2" onClick={myCounter}>
              +
            </button>
            {counter.map(el => <span className="bg-orange p-1  border border-dark px-2">{el}</span>)}
          </div>


          {roofTypeId != constants.ROOF_TYPE.FLAT && (<Row>

         {counter.length < 3 &&   <Col>
              <>
                <div className="d-flex justify-content-center mt-3">
                  <span className="ms-3">
                    זווית הגג ביחס לקרקע
                  </span>
                  <input type={"text"}></input>
                </div>
                </>
            </Col> } 
          </Row>)}

          <Container>
          <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="roof-angle"
                    name="roof-angle"
                    className="step2-images mt-4"
                    value={direction || ''}
                    onChange={(e) => setDirection(e.currentTarget.value)}>
                    <FormControlLabel value="north" key="north" control={<Radio icon={<ImageWrapper pWidth={"100"} pHeight={"100"} src={"angle-to-north.jpg"} />} checkedIcon={<ImageWrapper pWidth={"120"} pHeight={"120"} class="img-selected" src={"images\angle-to-north.jpg"} />} />} />
                    <FormControlLabel value="south" key="south" control={<Radio icon={<ImageWrapper pWidth={"100"} pHeight={"100"} src={"angle-to-south.jpg"} />} checkedIcon={<ImageWrapper pWidth={"120"} pHeight={"120"} class="img-selected" src={"images\angle-to-south.jpg"} />} />} />
                  </RadioGroup>
                </FormControl>
          </Container>
          <p className="text-center p-3">אחרי סיום שרטוט הגג לחץ על הכפתור בחר
            וסמן את ראשית הצירים של הגג
            בדרך כלל הנקודה השמאלית התחתונה.
            ובסיום לחץ על כתפור אישור.</p>

          <div className="d-flex justify-content-around">
           <span>צור גג חדש</span>
          {/* ({Math.ceil(zeroPointAbsolute?.x)},{Math.ceil(zeroPointAbsolute?.y)}) */}
          <button className="bg-dark text-white" onClick={absoluteZeroPointHandler}>{absoluteZeroPointText}</button>
          </div>

        </form>
      </Row>
    </div>
  </>
  );
};

export default Step2;
