


import React, { useEffect, useState } from "react";





const LabelTemplate = (props) => {

  const [labelId, setLabelId] = useState("");
  const rowsText = " שורות : ";

  useEffect(() => {

  }, []);


  return (
    <div >
      <h4 className="text-orange">{props.labelId}-</h4>
      <span>
        <span>{` ${props.rowsCount} ${rowsText}  `}</span>
        <span dangerouslySetInnerHTML={{ __html: props.panelsText }} ></span>
      </span>
      {['W0', 'S0P', 'S0', 'KZ0'].includes(props.roofType) &&
      <div> <div><span>עמודי הגבהה {props.parallelPoles}</span></div>
       <div><span>גובה עמודי הגבהה {props.heightParallel}</span></div>
       </div>
       }
      {['RX', 'WX', 'SX', 'SXP', 'KZX'].includes(props.roofType) && <>
        <div><span>{props.triangleCount} משולשים {props.triangleAngle}&#8737;</span></div>
        <div><span>עמודי חיזוק  {props.poles}</span></div>
        <div><span>דיאגונל  {props.diagonal}</span></div>
      </>
      }
      {['WX', 'W0'].includes(props.roofType) && <div><span>סוג משקולת {props.weightType}</span></div>}
      <div><span> קושרות {props.koshrot} מ"מ</span></div>
      {['S0P', 'SXP', 'WX', 'W0'].includes(props.roofType) && <div><span> פרופילי בסיס {props.profileBasis}מ"מ</span></div>}
    </div>
  );
};

export default LabelTemplate;
