import { Checkbox, TextField } from "@mui/material";

import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import StepsContext from "./StepsContext";
import * as constants from './constants';
import { addCustomEvents, removeCustomEvents } from './eventsManager';
import { useLocation, useParams } from "react-router-dom";
import { Direction } from "../../ui-components/direction";
//import AutocadManager from "./AutocadManager";
const Step5 = (props) => {
  const [directions, setVDirections] = useState('right');
  const [enableButton, setEnableButton] = useState(true);
  const [fetaData, setFetaData] = useState({});
  const [fetaCount, setFetaCount] = useState(1);
  const [displayHelp, setDisplayHelp] = useState(false);
  const [zeroPoint, setZeroPoint] = useState({ x: 0, y: 0, id: 0 });
  const stepContext = useContext(StepsContext);
  const locationData = useLocation();
  const [plannerId, setPlannerId] = useState();
 // const AutocadManager = new AutocadManager();
  let { projectId } = useParams();
  useEffect(() => {
    addCustomEvents(AutocadPickedEvent);
    return () => {
      removeCustomEvents(AutocadPickedEvent);
    };
  }, []);

  useEffect(() => {
    loadStepData();
    props.displayAutocad(true);
  }, []);

  function loadStepData() {


    let data = stepContext.stepsData["all"];
    if (data) {
      let roofTypeId = data.roofTypeId;

      if (roofTypeId == constants.ROOF_TYPE.FLAT || roofTypeId == constants.ROOF_TYPE.KAL_ZIP) {
        let event = null;
        let params = null; 
        
        if (locationData?.state?.isPrev) {
          props.OnPrev();
        } else {
          props.OnSubmit(event, params);
        }
      }
      setFetaData({ ...data.fetaData });
      setFetaCount(data.fetaCount);
      setVDirections(data.fetot?.direction);
      setPlannerId(data.UserId);
    }
  }


  const drawHandle = (event) => {

    let sum = 0;
    for (const key in fetaData) {

      const element = fetaData[key];
      sum += Number(element)
      let dx = 0, dy = 0;

      switch (directions) {
        case "right":
          dx = sum;
          break;
        case "left":
          dx = -sum;
          break;
        case "up":
          dy = sum;
          break;
        case "down":
          dy = -sum;
          break;

        default:
          break;
      }
      let command = { "commandName": "copy", "type": "multi-command", "args": { "dx": dx, "dy": dy, "layer": "ROOF", segmentId: zeroPoint.id } };
      let drawEvent = new CustomEvent('solarProDrawingEvent', { 'detail': command });

      document.dispatchEvent(drawEvent);
      event.preventDefault();
    }

  }

  const fetaDataOnChange = (value, index) => {
    let feta = { ...fetaData };
    feta[index] = value;
    setFetaData(feta);
  }

  const displayHelpHandler = () => {

    setDisplayHelp(!displayHelp);
  }

  const AutocadPickedEvent = ({ detail }) => {
    setEnableButton(false);
    if (detail?.code == 1) {

      setZeroPoint({ ...zeroPoint, ...detail.point });
    }
    console.log(detail, "I'm listening on solar pro to Autocad");

  };
  const handleSubmit = event => {
    let params = {
      UserId:plannerId,
      fetaCount: fetaCount,
      fetaData: fetaData,
      ProjectId:projectId,
      //fetot: { direction: directions, x: Math.ceil(zeroPoint.x),y: Math.ceil(zeroPoint.y) }
      fetot: { direction: directions, x: Math.ceil(zeroPoint.x), y: Math.ceil(zeroPoint.y) }
    };
   
    props.OnSubmit(event, params);


  };
  return (
    <div>
      <h2 className="py-5">סימון פטות</h2>
      <form onSubmit={handleSubmit} id="step5">
        <Row className="text-center mb-5 pb-5">

          <Col>
            <h4 className="py-3 text-right">
              סמן את הצלע שממנה נתחיל את סימון הפטות ואת המידות שלהן בשירטוט.
            </h4>


            <div className="py-3 d-flex flex-row-start">
              <div onClick={displayHelpHandler}><HelpOutlineIcon ></HelpOutlineIcon></div>

              {displayHelp == true ? <img width={400} src={require('../../assets/images/select-demo.gif')} alt="select demo" /> : ""}
            </div>
            <div className="py-3 d-flex flex-row-start">
              <TextField
                id="outlined-basic"
                label="מספר הפטות"
                value={fetaCount}
                onChange={(e) => setFetaCount(e.target.value)}
                autoComplete='off'
                color="primary"
                InputProps={{ inputProps: { min: 0, max: 20, type: "number" } }}
                sx={{ width: 150 }}

              />


            </div>


            <div className="py-3">
              {Array.from({ length: fetaCount }, (item, index) =>
               <div> <TextField
                  id={`feta-${index}`}
                  label={`בין ${index}-${index + 1}`}
                  variant="standard"
                  key={`feta-${index}`}
                  autoComplete='off'
                  value={fetaData[index]}
                  onChange={(e) => { fetaDataOnChange(e.currentTarget.value, index) }}
                />
                </div>
                )
              }

            </div>
            <div className="py-3 d-flex flex-row-start">
           
              <Direction id="directions-group-button" up={true} down={true} right={true} left={true} value={directions} setVDirections={(direction)=>setVDirections(direction)}/>

            </div>
          </Col>
          <button disabled={enableButton} onClick={drawHandle}> שרטט</button>

          <Col>

          </Col>
        </Row></form>
    </div>

  );
};

export default Step5;
