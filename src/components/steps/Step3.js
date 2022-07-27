import React, { useState, useContext, useEffect } from "react";
//import httpRequest from "../../utility/httpRequest";
//import { useParams } from "react-router-dom";
import StepsContext from "./StepsContext";
import { Col, Row } from "react-bootstrap";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import * as constants from './constants';
import ImageWrapper from "../../utility/ImageWrapper";





const Step3 = (props) => {


  const [panelsHeight, setPanelsHeight] = useState(0);
  const [panelsWidth, setPanelsWidth] = useState(0);
  const [panelsThickness, setPanelsThickness] = useState(0);
  const [panelsVoltage, setPanelsVoltage] = useState(0);
  const [panelsAmsl, setPanelsAmsl] = useState();

  const stepContext = useContext(StepsContext);

  useEffect(() => {
    props.displayAutocad(false);
    loadStepData();

    function loadStepData() {


      let data = stepContext.stepsData["all"];


      if (data) {

        setPanelsHeight(data.panelsHeight);
        setPanelsWidth(data.panelsWidth);
        setPanelsThickness(data.panelsThickness);
        setPanelsVoltage(data.panelsVoltage);
        setPanelsAmsl(data.panelsAmsl);
   

      }
    }

  }, []);





  const handleSubmit = (event) => {

    //console.log(activeId)


    let parameters = {
      panelsHeight: panelsHeight,
      panelsWidth: panelsWidth,
      panelsThickness: panelsThickness,
      panelsVoltage: panelsVoltage,
      panelsAmsl: panelsAmsl,
  
    };

    props.OnSubmit(event, parameters);


  };


  return (
    <div>
      <h2 className="py-5">הזנת נתונים</h2>
      <form onSubmit={handleSubmit} id="step3">
        <Row className="mb-5 pb-5">

          <Col>

            <h3 className="py-3">מידות פנלים</h3>

            <div>

              <TextField
                id="panel-height"
                label="אורך (מ''מ)"
                value={panelsHeight}
                onChange={(e) => setPanelsHeight(e.target.value)}
                autoComplete='off'
                color="primary"


              />
              <TextField
                id="panel-width"
                label="רוחב (מ''מ)"
                value={panelsWidth}
                onChange={(e) => setPanelsWidth(e.target.value)}
                autoComplete='off'
                color="primary"


              />
              <TextField
                id="panel-thickness"
                label="עובי (מ''מ)"
                value={panelsThickness}
                onChange={(e) => setPanelsThickness(e.target.value)}
                autoComplete='off'
                color="primary"


              />
              <TextField
                id="panel-voltage"
                label="הספק (ואט)"
                value={panelsVoltage}
                onChange={(e) => setPanelsVoltage(e.target.value)}
                autoComplete='off'
                color="primary"


              />
            </div>
          </Col>
                 </Row><Col>
          <h3 className="py-3">   גובה מעל פני הים</h3>
          <TextField
            id="amsl"
            label="גובה מעל פני הים"
            value={panelsAmsl}
            onChange={(e) => setPanelsAmsl(e.target.value)}
            autoComplete='off'
            color="primary"


          />
        </Col>
        <Row>

        </Row>
      </form>
    </div>
  );
};

export default Step3;
