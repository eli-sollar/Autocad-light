import React, { useState, useContext, useEffect, useReducer } from "react";


import { RadioGroup, Radio, FormControlLabel } from "@mui/material";

import ImageWrapper from "../../../utility/ImageWrapper";
import SelectCustom from "../../../ui-components/select"
import httpRequest from "../../../utility/httpRequest";
import { useLocation, useParams } from "react-router-dom";
import StepsContext from "./../StepsContext";
import { reducer, initialState } from './store/index';
import * as constants from '../constants';
import * as actions from './store/actions';
import AddCustomer from './AddCustomer';
const Step1 = (props) => {

  const [store, dispatch] = useReducer(reducer, initialState);
  const locationData = useLocation();
  //console.log(data1.state);

  const httpService = new httpRequest();
  let { projectId, activeId = 1 } = useParams();


  const stepContext = useContext(StepsContext);

  useEffect(() => {
    props.displayAutocad(false);
    loadStepData();

    async function loadStepData() {

      await loadRoofTypes();

      let data = stepContext.stepsData["all"];
      //projectName
      console.log(data)
      //init customers both child and parent
      //setPlanner(data.planner); //get from the login data
      actions.setDataLoaded(dispatch, true);

      if (data && data.UserId) {

        actions.setPlannerDefault(dispatch, data.UserId);
        actions.setCustomersDefault(dispatch, data.customerId);
        actions.setRoofSelected(dispatch, data.roofTypeId);
        actions.setFetotDirection(dispatch, data.fetotDirection);

      }
      
    }

    async function loadRoofTypes() {
      const parameters = { "name": "RoofTypes" }
      const result = await httpService.Get("Data/DataSource", parameters);

      if (result && result.Table) {
        actions.setRoofTypes(dispatch, result.Table);
      }

    }
    return () => {
      actions.setRoofTypes(dispatch, []) // clean warning in the console
    };
  }, []);

  const addCustomersHandler = () => {

    actions.setDataLoaded(dispatch, false);
    actions.setDataLoaded(dispatch, true);
  };

  const handleSubmit = (event) => {


    if (store.planner || store.customers || store.roofTypeId) {

      let parameters = {
        stepIndex: activeId,
        UserId: (store.planner ? store.planner : store.plannerDefault),
        customerId: (store.customers ? store.customers : store.customersDefault),
        //createAt: new Date().toUTCString(), server side
        createBy: "Netser",//TODO
        isDraft: true,
        fetotDirection: store.fetotDirection,
        status: 1,
        projectName: locationData?.state?.projectName,
        ProjectId: projectId,

      };

      if (store.roofTypeId) {
        parameters["roofTypeId"] = store.roofTypeId;
        parameters["roofTypeText"] = store.roofTypes.find(x => x.Key == store.roofTypeId).Value;

      }
      if (projectId) {
        parameters["projectId"] = projectId;
      }


      props.OnSubmit(event, parameters);
    } else {
      let parameters = null;
      props.OnSubmit(event, parameters);
    }

  };
  const handleClickOpen = () => {
    setOpen(true);
  };


  return (

    <form  onSubmit={handleSubmit} id={`step${activeId}`}>
        <h3 className="text-center">פרויקט</h3>

<div className="d-flex justify-content-around">
    <span>
      בחר לקוח:
    </span>
    {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="שם ספק"></SelectCustom>} */}
    <input type={"text"}></input>
</div>

<div className="d-flex justify-content-around select-3">
    <span>
      בחר לקוח:
    </span>
    {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" value="Name" label="שם ספק"></SelectCustom>}
</div>

<div className="d-flex justify-content-around select-3">
    <span>
      בחר לקוח:
    </span>
    {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" value="Name" label="שם ספק"></SelectCustom>}
</div>
<div className="mt-5">
      <h4 className="text-center"> סוג גג </h4>
      <RadioGroup
        aria-labelledby="roofTypes"
        name="roofTypes"
        row
        className="d-flex justify-content-center flex-column image-radio"
        value={store.roofTypeId ?? ''}
        onChange={e => actions.setRoofSelected(dispatch, e.currentTarget.value)}
      >
        {
          Object.keys(store.roofTypes).map((key) =>
            store.roofTypes[key].ImageName &&
            <FormControlLabel labelPlacement="bottom" key={store.roofTypes[key].Key} value={store.roofTypes[key].Key} label={store.roofTypes[key].Value} control={<Radio icon={<ImageWrapper src={store.roofTypes[key].ImageName} />} checkedIcon={<ImageWrapper class="img-selected" src={store.roofTypes[key].ImageName} />} ></Radio>} />
          )
        }
      </RadioGroup>
</div>
      {/* <AddCustomer OnSubmit={addCustomersHandler}></AddCustomer> */}
      <br />
      {store.roofTypeId != constants.ROOF_TYPE.FLAT && <>
        <span>    בחר כיוון</span>
        <RadioGroup
          defaultValue="2"
          name="fetot-direction"
          value={store.fetotDirection ?? ""}
          onChange={e => actions.setFetotDirection(dispatch, e.currentTarget.value)}
          id="fetot-direction"
        >
          {store.roofTypeId != constants.ROOF_TYPE.KAL_ZIP && <> <FormControlLabel value="1" control={<Radio />} label="פטות מאונכות לצפון" /></>}
          <FormControlLabel value="2" control={<Radio />} label="פטות מקבילות לצפון" />

        </RadioGroup></>}

    </form>
  );
};

export default Step1;
