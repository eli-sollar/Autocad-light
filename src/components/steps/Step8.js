
import React, { useContext, useEffect, useState } from "react";

import { Row, Col } from "react-bootstrap";

import EditIcon from '@mui/icons-material/Edit';
import StepsContext from "./StepsContext";

import ContentEditor from "../../ui-components/contentEditor";
import LabelTemplate from "./Label/LabelTemplate";

const Step8 = (props) => {
  const stepContext = useContext(StepsContext);
  const [projectName, setProjectName] = useState();
  const [labels, setLabels] = useState([]);
  const labelTemplateRef = React.createRef();
  const [txtComments, setTxtComments] = useState("");
  const [displayContentEditable, setDisplayContentEditable] = useState(false);
  useEffect(() => {
    props.displayAutocad(true);
    loadStepData();
  }, []);

  function loadStepData() {

    let data = stepContext.stepsData.all;

    if(!data.labels){
      setLabels(labelsResult);
    }
      let labelsArray = Object.keys(data.labels).map((key) => data.labels[key]);
    setLabels(labelsArray);
    
    setProjectName(data.projectName);

  }
  const editLabels = () => {
   

    setDisplayContentEditable(true);
    setTxtComments(labelTemplateRef.current.innerHTML);
  }
  const handleChange = evt => {
    setTxtComments(evt.target.value);
  };

  const handleSubmit = (event) => {
    
    let parameters = {
      labelsResult:labels
    }
   
    props.OnSubmit(event, parameters);
  };
  return (
    <div>
      <h2 className="py-5 mt-5">הערות</h2>
      <form onSubmit={handleSubmit} id="step8">
      <Row className="mb-5 pb-5" >
        <Col className='mx-4 px-5'>
          <div>
            {labels.length > 0 && <><h1> {projectName}</h1>
              <div onClick={editLabels}><EditIcon></EditIcon></div> </>
            }
            {<div ref={labelTemplateRef}> {labels.length > 0 && labels.map((value) => {
              return <div id="labels">
                <LabelTemplate
                 roofType={value.roofTypeText} labelId={value.labelId}
                  panelsText={value.panelsText}
                   triangleCount={value.triangleCount} 
                   triangleAngle={value.triangleAngle}
                    koshrot={value.koshrot}
                     profileBasis={value.profileBasis}
                      rowsCount={value.rowsCount}
                      weightType={value.weightType}
                      parallelPoles={value.parallelPoles}
                      diagonal={value.diagonal}
                      heightParallel={value.heightParallel}
                      poles={value.poles}
                      ></LabelTemplate> </div>
            })}
            </div>}


          </div>
        </Col>
        <Col >
          <Row>
            {displayContentEditable && 
            <ContentEditor value={txtComments}  onChange={handleChange}></ContentEditor>
            
            }
          </Row>

        </Col>
      </Row>
      </form>
    </div>
  );
};

export default Step8;
