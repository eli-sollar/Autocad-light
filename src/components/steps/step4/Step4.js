import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import * as constants from '../constants';
import React, { useContext, useEffect, useReducer } from "react";
import { Col, Row } from "react-bootstrap";

import { TextField } from "@mui/material";
import httpRequest from '../../../utility/httpRequest';
import ImageWrapper from '../../../utility/ImageWrapper';
import StepsContext from "../StepsContext";
import { useParams } from 'react-router-dom';
import { reducer, initialState } from './store/index';
import * as actions from './store/actions';
import SelectCustom from '../../../ui-components/select';


const Step4 = (props) => {

  const stepContext = useContext(StepsContext);
  const httpService = new httpRequest();
  const {  stepId } = useParams();
  const [store, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    loadStepData();
    props.displayAutocad(false);
  }, [])

  async function loadStepData() {

    let data = stepContext.stepsData.all;
    actions.setFetotDirection(dispatch, data.fetotDirection);
    actions.setModalType(dispatch, data.modalType);
    actions.setWeightSquare(dispatch, data.weightSquare);
    actions.setWeightType(dispatch, data.weightType);
    actions.setTrapezoidDistance(dispatch, data.trapezoidDistance);
    actions.setTrapezoidTypes(dispatch, data.trapezoidTypes);
    actions.setTrapezoidUpperSize(dispatch, data.trapezoidUpperSize);
    actions.setRealspace(dispatch, data.realspace);
    //actions.setFetaCount(dispatch, data.fetaCount);
    actions.setModalTypeText(dispatch, data.modalTypeText);
    loadRoofType();
    actions.setDataLoaded(dispatch, true);
  }

  async function loadRoofType() {

    let roofTypeContextText = stepContext.stepsData.all.roofTypeText;
    let roofTypeContextId = stepContext.stepsData.all.roofTypeId;
    let fetotDirectionContext = stepContext.stepsData.all.fetotDirection;
    actions.setRoofTypeId(dispatch, roofTypeContextId);
    actions.setRoofTypeText(dispatch, roofTypeContextText);
    await loadModalTypes(roofTypeContextId, fetotDirectionContext);
  }

  async function loadModalTypes(_roofTypeId, fetotDirection) {

    let roofTypeParameter = { 'RoofTypeId': _roofTypeId, 'FetotDirectionId': fetotDirection };
    let localParameters = JSON.stringify(roofTypeParameter);
    const parameters = { "name": "ModalTypes", parameters: localParameters }
    const result = await httpService.Get("Data/DataSource", parameters);

    if (result && result.Table) {

      actions.setModalTypes(dispatch, result.Table);
    }

  }

  const handleChange = (e) => {

    let currentModaltype = store.modalTypes.find(x => x.Key == e.currentTarget.value);
    actions.setModalTypeText(dispatch, currentModaltype.Value);
    actions.setModalType(dispatch, e.currentTarget.value);
  }

  const handleSubmit = event => {
    let parameters = {
      stepIndex: stepId,
      modalType: store.modalType,
      modalTypeText: store.modalTypeText,
      weightType: store.weightType,
      weightSquare: store.weightSquare,
      trapezoidDistance: store.trapezoidDistance,
      trapezoidTypes: store.trapezoidTypes,
      trapezoidUpperSize: store.trapezoidUpperSize,
      //fetaCount:store.fetaCount,
      isDraft: true,
      realspace:store.realspace
    };

    props.OnSubmit(event, parameters);

  };
  return (
    <div>
      <h2 className='text-center'>???????? ????????????</h2>
      <form onSubmit={handleSubmit} id="step4">
      <h4 className='text-center'>
          ?????????? ????????  
       </h4>
       <p className='text-center'>
       ?????? ???? ???????? ?????????????? ???????? ???????????? ?????????? 
?????????? ?????? ???????????? ???????? ???????????? ????????????.
        </p>  
        <div className='text-center my-3'>
        <img src='/images/3.png'></img>
        </div>
        <div className="d-flex justify-content-around mt-2">
              <span >
              ???????? ?????????? 
              </span> 
              {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
              <input  value={20} type={"text"}></input>
         </div>
        <Row className='mt-3 step4-form' style={{width: 400, padding: 10}}>
          <Col md={6}>
          <div className="d-flex justify-content-between mt-2">
              <span style={{fontSize: 14}}>
              ?????? 0 ??-1
              </span>
              {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
              <input style={{width: 88}} type={"text"}></input>
         </div>
          </Col>
          <Col md={6} >
          <div className="d-flex justify-content-between mt-2">
              <span style={{fontSize: 14}}>
              ?????? 10 ??-11
              </span>
              {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
              <input style={{width: 88}} type={"text"}></input>
         </div>
          </Col>

          <Col md={6}>
          <div className="d-flex justify-content-between mt-2">
              <span style={{fontSize: 14}}>
              ?????? 1 ??-2
              </span>
              {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
              <input style={{width: 88}} type={"text"}></input>
         </div>
          </Col>
          <Col md={6} >
          <div className="d-flex justify-content-between mt-2">
              <span style={{fontSize: 14}}>
              ?????? 11 ??-12
              </span>
              {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
              <input style={{width: 88}} type={"text"}></input>
         </div>
          </Col>

          <Col md={6}>
          <div className="d-flex justify-content-between mt-2">
              <span style={{fontSize: 14}}>
              ?????? 1 ??-3
              </span>
              {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
              <input style={{width: 88}} type={"text"}></input>
         </div>
          </Col>
          <Col md={6} >
          <div className="d-flex justify-content-between mt-2">
              <span style={{fontSize: 14}}>
              ?????? 11 ??-13
              </span>
              {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
              <input style={{width: 88}} type={"text"}></input>
         </div>
          </Col>
           
          <Col md={6}>
          <div className="d-flex justify-content-between mt-2">
              <span style={{fontSize: 14}}>
              ?????? 1 ??-4
              </span>
              {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
              <input style={{width: 88}} type={"text"}></input>
         </div>
          </Col>
          <Col md={6} >
          <div className="d-flex justify-content-between mt-2">
              <span style={{fontSize: 14}}>
              ?????? 11 ??-14
              </span>
              {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
              <input style={{width: 88}} type={"text"}></input>
         </div>
          </Col>

          <Col md={6}>
          <div className="d-flex justify-content-between mt-2">
              <span style={{fontSize: 14}}>
              ?????? 1 ??-5
              </span>
              {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
              <input style={{width: 88}} type={"text"}></input>
         </div>
          </Col>
          <Col md={6} >
          <div className="d-flex justify-content-between mt-2">
              <span style={{fontSize: 14}}>
              ?????? 11 ??-15
              </span>
              {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
              <input style={{width: 88}} type={"text"}></input>
         </div>
          </Col>

          <Col md={6}>
          <div className="d-flex justify-content-between mt-2">
              <span style={{fontSize: 14}}>
              ?????? 1 ??-6
              </span>
              {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
              <input style={{width: 88}} type={"text"}></input>
         </div>
          </Col>
          <Col md={6} >
          <div className="d-flex justify-content-between mt-2">
              <span style={{fontSize: 14}}>
              ?????? 11 ??-16
              </span>
              {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
              <input style={{width: 88}} type={"text"}></input>
         </div>
          </Col>

          <Col md={6}>
          <div className="d-flex justify-content-between mt-2">
              <span style={{fontSize: 14}}>
              ?????? 1 ??-7
              </span>
              {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
              <input style={{width: 88}} type={"text"}></input>
         </div>
          </Col>
          <Col md={6} >
          <div className="d-flex justify-content-between mt-2">
              <span style={{fontSize: 14}}>
              ?????? 11 ??-17
              </span>
              {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
              <input style={{width: 88}} type={"text"}></input>
         </div>
          </Col>

          <Col md={6}>
          <div className="d-flex justify-content-between mt-2">
              <span style={{fontSize: 14}}>
              ?????? 1 ??-8
              </span>
              {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
              <input style={{width: 88}} type={"text"}></input>
         </div>
          </Col>
          <Col md={6} >
          <div className="d-flex justify-content-between mt-2">
              <span style={{fontSize: 14}}>
              ?????? 11 ??-18
              </span>
              {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
              <input style={{width: 88}} type={"text"}></input>
         </div>
          </Col>

          <Col md={6}>
          <div className="d-flex justify-content-between mt-2">
              <span style={{fontSize: 14}}>
              ?????? 1 ??-9
              </span>
              {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
              <input style={{width: 88}} type={"text"}></input>
         </div>
          </Col>
          <Col md={6} >
          <div className="d-flex justify-content-between mt-2">
              <span style={{fontSize: 14}}>
              ?????? 11 ??-19
              </span>
              {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
              <input style={{width: 88}} type={"text"}></input>
         </div>
          </Col>

          <Col md={6}>
          <div className="d-flex justify-content-between mt-2">
              <span style={{fontSize: 14}}>
              ?????? 1 ??-10
              </span>
              {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
              <input style={{width: 88}} type={"text"}></input>
         </div>
          </Col>
          <Col md={6} >
          <div className="d-flex justify-content-between mt-2">
              <span style={{fontSize: 14}}>
              ?????? 11 ??-20
              </span>
              {/* {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setCustomers(dispatch, data)} defaultData={store.customersDefault} name="Customers" dataSource="Customers" lKey="Id" className="st1ctrl1" value="Name" label="???? ??????"></SelectCustom>} */}
              <input style={{width: 88}} type={"text"}></input>
         </div>
          </Col>
        </Row>
        <div className='text-center mt-4'>
        <button className='bg-orange text-center step4-btn'>????????</button>
        </div>
      </form>
    </div>
  );
};

export default Step4;
