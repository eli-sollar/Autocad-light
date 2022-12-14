import { Checkbox, TextField } from "@mui/material";

import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import StepsContext from "./StepsContext";
import * as constants from "./constants";
import { addCustomEvents, removeCustomEvents } from "./eventsManager";
import { useLocation, useParams } from "react-router-dom";
import { Direction } from "../../ui-components/direction";
//import AutocadManager from "./AutocadManager";
const Step5 = (props) => {
  const [directions, setVDirections] = useState("right");
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

      if (
        roofTypeId == constants.ROOF_TYPE.FLAT ||
        roofTypeId == constants.ROOF_TYPE.KAL_ZIP
      ) {
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
      sum += Number(element);
      let dx = 0,
        dy = 0;

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
      let command = {
        commandName: "copy",
        type: "multi-command",
        args: { dx: dx, dy: dy, layer: "ROOF", segmentId: zeroPoint.id },
      };
      let drawEvent = new CustomEvent("solarProDrawingEvent", {
        detail: command,
      });

      document.dispatchEvent(drawEvent);
      event.preventDefault();
    }
  };

  const fetaDataOnChange = (value, index) => {
    let feta = { ...fetaData };
    feta[index] = value;
    setFetaData(feta);
  };

  const displayHelpHandler = () => {
    setDisplayHelp(!displayHelp);
  };

  const AutocadPickedEvent = ({ detail }) => {
    setEnableButton(false);
    if (detail?.code == 1) {
      setZeroPoint({ ...zeroPoint, ...detail.point });
    }
    console.log(detail, "I'm listening on solar pro to Autocad");
  };
  const handleSubmit = (event) => {
    let params = {
      UserId: plannerId,
      fetaCount: fetaCount,
      fetaData: fetaData,
      ProjectId: projectId,
      //fetot: { direction: directions, x: Math.ceil(zeroPoint.x),y: Math.ceil(zeroPoint.y) }
      fetot: {
        direction: directions,
        x: Math.ceil(zeroPoint.x),
        y: Math.ceil(zeroPoint.y),
      },
    };

    props.OnSubmit(event, params);
  };
  return (
    <div>
      <h2 className="text-center bg-white mb-0">?????????? ????????</h2>
      <form onSubmit={handleSubmit} id="step5">
        <div class="card text-center">
          <div class="card-header bg-white">
            <ul class="nav nav-tabs card-header-tabs border-none" id="myTab">
              <li class="nav-item border-none">
                <a href="#home" class="nav-link active" data-bs-toggle="tab">
                  ?????????? ??????????
                </a>
              </li>
              <li class="nav-item">
                <a href="#profile" class="nav-link" data-bs-toggle="tab">
                  ?????????? ??????????
                </a>
              </li>
            </ul>
          </div>
          <div class="card-body">
            <div class="tab-content">
              <div class="tab-pane fade show active" id="home">
                <Row className="d-flex gy-3 ">
                  {["A", "B", "C", "D", "E", "F"].map((el) => (
                    <Col md={3} className="p-0 ">
                      <div class="dropdown w-100">
                        <button
                          class="bg-orange dropdown-toggle px-3"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span style={{ marginLeft: 12 }}>
                            <strong> {el}</strong>
                          </span>
                          <span className="ml-2">
                            <i class="fa-solid fa-angle-down"></i>
                          </span>{" "}
                          <span
                            className="bg-orange px-2 ml-1"
                            style={{
                              display: "inline-block",
                              border: "1px solid black",
                              borderRadius: "4px",
                            }}
                          >
                            x
                          </span>
                        </button>
                        <div
                          class="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <a class="dropdown-item" href="#">
                            {el} 1{" "}
                            <span className="ms-5 bg-danger px-2 text-white">
                              {" "}
                              x
                            </span>
                          </a>
                          <a class="dropdown-item" href="#">
                            {el} 2{" "}
                            <span className="ms-5 bg-danger px-2 text-white">
                              {" "}
                              x
                            </span>
                          </a>
                          <a class="dropdown-item" href="#">
                            {el} 3{" "}
                            <span className="ms-5 bg-danger px-2 text-white">
                              {" "}
                              x
                            </span>
                          </a>
                        </div>
                      </div>{" "}
                    </Col>
                  ))}
                </Row>
                <Container>
                  <Row className="mt-3">
                    <span>
                      {" "}
                      <strong>????????</strong>
                    </span>
                    <Col md={9} className="d-flex flex-column">
                      <div className="d-flex justify-content-between mt-2">
                        <span>????????</span>
                        {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
                        <input style={{ width: 100 }} type={"text"}></input>
                      </div>
                      <div className="d-flex justify-content-between mt-2">
                        <span>????????</span>
                        {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
                        <input style={{ width: 100 }} type={"text"}></input>
                      </div>
                    </Col>
                    <Col md={3}>
                      <img src="/images/3.png"></img>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <strong>??????</strong>
                    <Col md={9}>
                      <div className="d-flex justify-content-between mt-2">
                        <span>????????</span>
                        {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
                        <input style={{ width: 100 }} type={"text"}></input>
                      </div>
                    </Col>
                    <Col md={3}>
                      <img src="/images/3.png"></img>
                    </Col>
                  </Row>
                </Container>
              </div>
              <div class="tab-pane fade" id="profile">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <label>?????? ????????</label>
                  <select
                    style={{ width: 200, padding: "5px", borderRadius: "5px" }}
                  >
                    <option>1</option>
                    <option>2</option>
                  </select>
                </div>
                <Container className="mt-4">
                  <Row>
                    <Col md={6}>
                      <label style={{ fontSize: 14 }}>??????? ?????????? ????????????</label>
                      <input style={{ width: 88 }} type={"number"}></input>
                    </Col>
                    <Col md={6}>
                      <label style={{ fontSize: 14 }}>??????? ?????????? ????????????</label>
                      <input style={{ width: 88 }} type={"number"}></input>
                    </Col>
                  </Row>
                </Container>
                <Container className="mt-5">
                  <div className="d-flex justify-content-between mt-2">
                    <span>?????????? ??????????</span>
                    {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
                    <input type={"text"}></input>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <span>???????? ?????? ????????????</span>
                    {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
                    <input type={"text"}></input>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <span>???????? ??????????</span>
                    {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
                    <input type={"text"}></input>
                  </div>
                </Container>
                <hr className="my-4"></hr>
                <Container>
                  <div className="d-flex justify-content-between mt-2">
                    <span>???????? X ???????????? 0</span>
                    {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
                    <input type={"text"}></input>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <span>???????? Y ???????????? 0</span>
                    {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
                    <input type={"text"}></input>
                  </div>
                </Container>
                <Container className="d-flex mt-3">
                  <p className="text-center">
                    ?????? ???? ?????????? ???????? ?????? ?????????? ??????????????
                  </p>
                  <img src="/images/3.png"></img>
                </Container>
                {/* <button className=" btn-next bg-orange"> ?????? ????????</button> */}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step5;
