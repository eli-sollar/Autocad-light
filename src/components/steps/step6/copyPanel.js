import { TextField } from "@mui/material";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Direction } from '../../../ui-components/direction';
export default function CopyPanel(props){
    const [enableCopyButton,setEnableCopyButton]=useState(true);
    const [copyDistance, setCopyDistance] = useState();
    const [copyDirection, setCopyDirection] = useState();
    const [copyCount, setCopyCount] = useState(1);
    const numberConfiguration = { inputProps: { type: "number" } };
   
    const copyHandle = (event) => {
        
        
    
          
    
        }
    return (
        
        <Col className="text-center mb-5 pb-5">
          <div className=" py-3 d-flex flex-row-start">
          העתקת פנלים:
        
        </div>
        <TextField
            id="copy-distance"
            label="מרחק מנקודת ה0"
            variant="outlined"
            value={copyDistance}
            onChange={(e) => setCopyDistance(e.currentTarget.value)}
            sx={{ width: 150 }}
            InputProps={numberConfiguration}
          />
          <Col className="text-center mb-5 pb-5">
          <TextField
            id="panels-copy-count"
            label="כמות"
            variant="outlined"
            value={copyCount}
            onChange={(e) => setCopyCount(e.currentTarget.value)}
            sx={{ width: 150 }}
            InputProps={numberConfiguration}
          /> 
          <Direction id="copy-direction" value={copyDirection} up={true} right={true} setVDirections={(direction) => {setCopyDirection(direction);setEnableCopyButton(false)}} />
         </Col>
          
          <button disabled={enableCopyButton} onClick={copyHandle}> העתק</button>

        </Col>
     
    )
    }
