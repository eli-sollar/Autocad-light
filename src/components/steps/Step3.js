import React, { useState, useContext, useEffect } from "react";
//import httpRequest from "../../utility/httpRequest";
//import { useParams } from "react-router-dom";
import StepsContext from "./StepsContext";
import { Col, Row } from "react-bootstrap";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import * as constants from "./constants";
import ImageWrapper from "../../utility/ImageWrapper";

const Step3 = (props) => {
  const [panelsHeight, setPanelsHeight] = useState(0);
  const [panelsWidth, setPanelsWidth] = useState(0);
  const [panelsThickness, setPanelsThickness] = useState(0);
  const [panelsVoltage, setPanelsVoltage] = useState(0);
  const [panelsAmsl, setPanelsAmsl] = useState();
  const [selected, setSelected] = useState(0);

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

      console.log(props.counter, "This is the state counter");
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
      <h2 className="text-center">הזנת נתונים</h2>
      <form onSubmit={handleSubmit} id="step3">
        <Row>
          <Col>
            <h5 className="text-center">מידות פנלים</h5>
            <form>
              <div style={{ width: 350, padding: 10 }}>
                <div className="d-flex justify-content-between mt-2">
                  <span>אורך (מ”מ)</span>
                  {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="שם ספק"></SelectCustom>} */}
                  <input type={"text"}></input>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <span>רוחב (מ”מ)</span>
                  {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="שם ספק"></SelectCustom>} */}
                  <input type={"text"}></input>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <span>עובי (מ”מ)</span>
                  {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="שם ספק"></SelectCustom>} */}
                  <input type={"text"}></input>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <span>הספק (וואט)</span>
                  {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="שם ספק"></SelectCustom>} */}
                  <input type={"text"}></input>
                </div>
              </div>
              <div className="text-center">
                <hr></hr>
                <h5>גובה מבנה מעל פני הים</h5>
                <input type={"text"}></input>
                <hr></hr>
              </div>
              {props.counter !== 3 && (
                <div>
                  <h5 className="text-center">מרחק בין טרפזים</h5>
                  <div className="d-flex justify-content-around">
                    <img
                      src="/images/1.png"
                      className={
                        selected == 0 && "border border-warning cursor-pointer"
                      }
                      onClick={() => setSelected(0)}
                    ></img>
                    <img
                      src="/images/2.png"
                      className={selected == 1 && "border border-warning"}
                      onClick={() => setSelected(1)}
                    ></img>
                  </div>
                </div>
              )}

              {!(props.counter > 2) && (
                <>
                  <div>
                    <div className="d-flex justify-content-around mt-2">
                      <span>מרחק בין טרפזים</span>
                      {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="שם ספק"></SelectCustom>} */}
                      <input type={"text"}></input>
                    </div>
                    <div className="d-flex justify-content-between p-4   mt-2">
                      <span>סוג טרפז</span>
                      {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="שם ספק"></SelectCustom>} */}
                      <input type={"number"}></input>
                    </div>
                  </div>
                </>
              )}
            </form>
          </Col>
        </Row>
      </form>
    </div>
  );
};

export default Step3;
