import { FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from "@mui/material";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import react,{ useState } from "react";
export const Direction=(props)=>{
    const [directions, setVDirections] = useState('right');
    const handleChange = (event) => {
      
      
        props.setVDirections(event.target.value);
        event.stopPropagation();
      };
    return (   
   <div className="arrow-wrapper">
                <RadioGroup id={props.id}
                  aria-labelledby="directions-group"
                  name="directions-group-button"
                  value={props.value || ''}
                  onChange={handleChange} >
                   {props.left &&<FormControlLabel className="left-arrow arrow" key='left' value='left' label='' control={<Radio icon={<ArrowBackIcon />} checkedIcon={<ArrowBackIcon />} ></Radio>} />}
                  {props.up && <FormControlLabel className="up-arrow arrow" key='up' value='up' label='' control={<Radio icon={<ArrowUpwardIcon />} checkedIcon={<ArrowUpwardIcon />} ></Radio>} />}
                 <div className="rectangle-arrow"></div>
                 {props.down && <FormControlLabel className="down-arrow arrow" key='down' value='down' label='' control={<Radio icon={<ArrowDownwardIcon />} checkedIcon={<ArrowDownwardIcon />} ></Radio>} />}
                 {props.right &&<FormControlLabel className="right-arrow arrow" key='right' value='right' label='' control={<Radio icon={<ArrowForwardIcon />} checkedIcon={<ArrowForwardIcon />} ></Radio>} />}
                </RadioGroup>
            
                </div>                  
    );
}