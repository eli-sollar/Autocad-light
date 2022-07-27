
import { TextField } from '@mui/material';

import React, { useContext, useEffect, useMemo, useReducer, useState } from "react";
import { Col, Row } from "react-bootstrap";
import SelectCustom from "../../../ui-components/select";
import StepsContext from "../StepsContext";

import Panel from "../Panel";
import * as constants from '../constants';
import { reducer, initialState } from './store/index';
import * as actions from './store/actions';
import ManyKeysMap from '../../../utility/ManyKeysMap';
import { instanceToPlain, plainToInstance } from 'class-transformer';

import { useParams } from 'react-router-dom';
import ChipsPanels from '../../../ui-components/chipsPanels';


import { Direction } from '../../../ui-components/direction';
import AutocadManager from '../AutocadManager';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';
import CopyPanel from './copyPanel';
const step6 = (props) => {
  const stepContext = useContext(StepsContext);
  const panelsCountConfiguration = { inputProps: { min: 1, type: "number" } };
  const numberConfiguration = { inputProps: { type: "number" } };


  const [mapMultiKey] = useState(() => new ManyKeysMap());
  let { projectId } = useParams();

  const [totalRequests, setTotalRequests] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [chipsSelected, setChipsSelected] = useState();
  const [plannerId, setPlannerId] = useState();
  const [store, dispatch] = useReducer(reducer, initialState);
  const panelsHorizontalAndVerticalArray = [constants.PANEL_TYPES.HORIZANTAL_1_VERTICAL_1,
  constants.PANEL_TYPES.VERTICAL_1_HORIZANTAL_1, constants.PANEL_TYPES.VERTICAL_2_HORIZANTAL_1,
  constants.PANEL_TYPES.VERTICAL_1_HORIZANTAL_1_VERTICAL_1, constants.PANEL_TYPES.HORIZANTAL_1_VERTICAL_2, constants.PANEL_TYPES.HORIZANTAL_1
  ];

  let panel = {};
  const initialPanel = (panelsSize) => {

    if (panelsSize) {

      panel = new Panel(panelsSize);
    }
  }

  const deepCopyMapMultiKey = (data) => {
    if (data.panelsMap) {
      let mapMultiKeyFromServer = plainToInstance(ManyKeysMap, data.panelsMap);
      for (var [key, value] of mapMultiKeyFromServer) {
        mapMultiKey.set(key, value);
      }
    }
  }

  useEffect(() => {
    initialPanel();
   
    return () => {
     
    };
  }, [store.zeroPoint]);

  useMemo(() => {
    props.displayAutocad(true);
    loadStepData();

  }, []);

  function loadStepData() {

    let data = stepContext.stepsData.all;

    actions.setModalTypeText(dispatch, data.modalTypeText);
    actions.setPanelsType(dispatch, data.panelsType);
    actions.setHeightParallel(dispatch, data.heightParallel);

    setPlannerId(data.UserId);
    if (data.triangle) {
      actions.setTriangle(dispatch, data.triangle);
    }
    if (data.distanceFromZeroPoint) {
      actions.setDistanceFromZeroPoint(dispatch, data.distanceFromZeroPoint);
    }
    if (data.panelsCount) {
      actions.setPanelsCount(dispatch, data.panelsCount);
    }
 
    if (data.groupId) {
      actions.setGroupId(dispatch, data.groupId);
    }
    if (data.currentLabel) {
      actions.setCurrentLabel(dispatch, data.currentLabel);
    }
    actions.setZeroPointAbsolute(dispatch,data.zeroPointAbsolute);
    deepCopyMapMultiKey(data);
  }

  const updateZeroPointTriangle = (zeroPoinCalculate, hashCopy) => {


  

  };

  const setPanelsSize = async () => {
    
  };

  const createLine = async (event) => {
   

    event.preventDefault();
    setDataLoaded(true);

  };

  

  const handleSubmit = (event, noNavigation) => {

    let parameters = {
      panelsType: store.panelsType,
      heightParallel: store.heightParallel,
      triangle: store.triangle,
      zeroPoint: store.zeroPoint,
      modalTypeText: store.modalTypeText,
      panelsCount: store.panelsCount,
      distanceFromZeroPoint: store.distanceFromZeroPoint,
      panelsMap: instanceToPlain(mapMultiKey),
      groupId: store.groupId,
      currentLabel: store.currentLabel,
      UserId: plannerId,
      ProjectId: projectId
    }

    
    props.OnSubmit(event, parameters, noNavigation);
  };

  const panelsTypeOnChange = (data, type) => {
    actions.setPanelsType(dispatch, data);

    if (data == constants.PANEL_TYPES.HORIZANTAL_1) {
      actions.setPanelsCount(dispatch, { ...store.panelsCount, vertical: 0 });
    }

    if (!panelsHorizontalAndVerticalArray.includes(data)) {
      actions.setPanelsCount(dispatch, { ...store.panelsCount, horizontal: 0 });
    }
  };

  const chipsUpdated = (id) => {

    mapMultiKey.delete(id);

  };
  const onChipsSelected = (id) => {
    setChipsSelected(id)


  };


  return (
    <div>
      <h2 className="py-5 mt-5">תוכנית הצבה - פנלים</h2>
      <form onSubmit={handleSubmit} id="step6">
        <Tabs>
          <TabList>
            <Tab>יצירה</Tab>
            <Tab>עריכה</Tab>
          </TabList>

          <TabPanel>
            <Row className="text-center mb-5 pb-5">
              <Col>
                <div className="py-3 d-flex flex-row-start">
                  <SelectCustom onChange={(data, type) => panelsTypeOnChange(data, type)} defaultData={store.panelsType} name="panelsType" dataSource="LineTypes" lKey="Id" value="Value" label="סוג שורה"></SelectCustom>
                </div>

                <div>

                  {store.panelsType != constants.PANEL_TYPES.HORIZANTAL_1 &&
                    <TextField
                      error={store.panelsCount.vertical == 0}
                      id="panels-count"
                      label="מספר הפנלים בעמידה"
                      variant="outlined"
                      InputProps={panelsCountConfiguration}
                      value={store.panelsCount.vertical}
                      onChange={(e) => actions.setPanelsCount(dispatch, { ...store.panelsCount, vertical: e.target.value })}
                      sx={{ width: 150 }}
                    />
                  }

                  {panelsHorizontalAndVerticalArray.includes(store.panelsType) &&
                    <TextField
                      error={store.panelsCount.horizontal == 0}
                      id="panels-count"
                      label="מספר הפנלים בשכיבה"
                      variant="outlined"
                      InputProps={panelsCountConfiguration}
                      value={store.panelsCount.horizontal}
                      onChange={(e) => actions.setPanelsCount(dispatch, { ...store.panelsCount, horizontal: e.target.value })}
                      sx={{ width: 150 }}
                    />
                  }
                  <div className="py-3 d-flex flex-row-start">

                    <TextField
                      id="panels-count"
                      label="מרחק אופקי מנקודת ה0"
                      variant="outlined"
                      value={store.distanceFromZeroPoint.dx}
                      onChange={(e) => actions.setDistanceFromZeroPoint(dispatch, { ...store.distanceFromZeroPoint, dx: e.target.value })}
                      sx={{ width: 150 }}
                      InputProps={numberConfiguration}
                    />
                    <TextField
                      id="panels-count"
                      label="מרחק אנכי מנקודת ה0"
                      variant="outlined"
                      value={store.distanceFromZeroPoint.dy}
                      onChange={(e) => actions.setDistanceFromZeroPoint(dispatch, { ...store.distanceFromZeroPoint, dy: e.target.value })}
                      sx={{ width: 150 }}
                      InputProps={numberConfiguration}
                    />

                  </div>
                  <div className="py-3 d-flex flex-row-start">

                    <Direction id="draw-panels-direction" up={true} down={true} value={store.zeroPoint.direction} setVDirections={(direction) => actions.setZeroPoint(dispatch, { ...store.zeroPoint, direction: direction })} />

                  </div>

                </div>
                {['RX', 'RCA', 'WX', 'SX', 'SXP', 'KZX'].includes(store.modalTypeText) && <div >
                  <h4 className="text-right">
                    הוספת משולש:
                  </h4>

                  <div className="py-3 d-flex flex-row-start">
                    <TextField
                      value={store.triangle.frontLegHeight}
                      onChange={(e) => actions.setTriangle(dispatch, { ...store.triangle, frontLegHeight: e.currentTarget.value })}
                      id="front-leg-height"
                      label="גובה רגל קדמית"
                      variant="outlined"
                    />
                    <TextField
                      id="triangle-angle"
                      label="זוית משולש"
                      variant="outlined"
                      className="mx-4"
                      value={store.triangle.angle}
                      onChange={(e) => actions.setTriangle(dispatch, { ...store.triangle, angle: e.currentTarget.value })}
                    />
                  </div>
                </div>}
                {['W0', 'S0P', 'S0', 'KZ0'].includes(store.modalTypeText) && <div>

                  <h4 className="text-right">
                    הוספת מקבילה
                  </h4>

                  <div className="py-3 d-flex flex-row-start">
                    <TextField
                      id="height-parallel"
                      label="מידת עמודי הגבהה"
                      variant="outlined"
                      onChange={(e) => actions.setHeightParallel(dispatch, e.target.value)}
                      value={store.heightParallel}
                    />
                  </div>
                </div>}
                <div>בחר את נקודת האפס - שתי צלעות</div>
                <button onClick={createLine}> צור שורה</button>

              </Col>

            </Row>
          </TabPanel>
          <TabPanel>
            <Row className="text-center mb-5 pb-5">
              <Col>
                <div>פנלים שנבחרו:</div>
                {<ChipsPanels onSelected={(data) => { onChipsSelected(data) }} onChange={(id) => chipsUpdated(id)} mapMultiKey={mapMultiKey}></ChipsPanels>}

              </Col>
            </Row>
            <Row>
              <CopyPanel mapMultiKey={mapMultiKey} chipsSelected={chipsSelected} zeroPoint={store.zeroPoint} onCreateLine={(e, calculatedZeroPoint, distanceFromZeroPoint, chipsSelected, panelType, panelsCount, groupId) => createLine(e, calculatedZeroPoint, distanceFromZeroPoint, chipsSelected, panelType, panelsCount, groupId)}></CopyPanel>

            </Row>


          </TabPanel>
 
        </Tabs>

      </form>
    </div>
  );

};
export default step6;
