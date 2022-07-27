import React, { useState ,useEffect} from "react";
//import DatePicker from "react-datepicker";
import httpRequest from "../utility/httpRequest";
import { FormControl, FormLabel,RadioGroup,Radio,FormControlLabel } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import data from "../components/roofData.json";
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function Dashboard() {

  
  
  useEffect(() => {
    
  }, []);
 

  
  
  return (
    data.map((el, ind) => {
     
      <div>
         <img src={el.image} alt="tiled" className="ml-auto mr-auto" />
         <p className="py-4 w-100 text text-center">{el.title}</p>
         </div>
     
   },
    
    <FormControl>
   
      <FormLabel id="demo-form-control-label-placement">labelPlacement</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-form-control-label-placement"
        name="position"
        defaultValue="top"
      >
        <FormControlLabel
          value="top"
          control={<Radio />}
          label="Top"
          labelPlacement="top"
          icon="../../assets/images/flat.png"
        />
        <FormControlLabel
        
          value="start"
          control={<Radio />}
          label="Start"
          labelPlacement="start"
        />
        <FormControlLabel
          value="bottom"
          control={<Radio />}
          label="Bottom"
          labelPlacement="bottom"
        />
        <FormControlLabel value="end" control={<Radio />} label="End" />
      </RadioGroup>
    </FormControl>
    
))
}
export default Dashboard;

// import * as React from 'react';
// import TextField from '@mui/material/TextField';

// import DatePicker from '@mui/lab/DatePicker';
// import MobileDatePicker from '@mui/lab/MobileDatePicker';
// import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
// import Stack from '@mui/material/Stack';


// export default function ResponsiveDatePickers() {
//   const [value, setValue] = React.useState<Date | null>(new Date());

//   return (
   
//       <Stack spacing={3}>
//         <MobileDatePicker
//           label="For mobile"
//           value={value}
//           onChange={(newValue) => {
//             setValue(newValue);
//           }}
//           renderInput={(params) => <TextField {...params} />}
//         />
//         <DesktopDatePicker
//           label="For desktop"
//           value={value}
//           minDate={new Date('2017-01-01')}
//           onChange={(newValue) => {
//             setValue(newValue);
//           }}
//           renderInput={(params) => <TextField {...params} />}
//         />
//         <DatePicker
//           disableFuture
//           label="Responsive"
//           openTo="year"
//           views={['year', 'month', 'day']}
//           value={value}
//           onChange={(newValue) => {
//             setValue(newValue);
//           }}
//           renderInput={(params) => <TextField {...params} />}
//         />
//       </Stack>
  
//   );
// }