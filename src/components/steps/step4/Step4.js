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
      <h2 className="py-5">הזנת נתונים</h2>
      <form onSubmit={handleSubmit} id="step4">
        <Row className="mb-5 pb-5">

          <Col>

            <h3 className="py-3">סוג המודל- {store.roofTypeText}</h3>
            <div>
              <RadioGroup
                name="modalType"
                row
                value={store.modalType || ''}
                onChange={handleChange}
              >
                {
                  Object.keys(store.modalTypes).map((key) =>
                    store.modalTypes[key].ImageName &&
                    <FormControlLabel labelPlacement="bottom" key={store.modalTypes[key].Key} value={store.modalTypes[key].Key} label={store.modalTypes[key].Value} control={<Radio icon={<ImageWrapper pWidth={"150"} pHeight={"150"} src={store.modalTypes[key].ImageName} />} checkedIcon={<ImageWrapper class="img-selected" pWidth={"160"} pHeight={"160"} src={store.modalTypes[key].ImageName} />} ></Radio>} />
                  )
                }
              </RadioGroup>
            </div>

            {store.roofTypeId == constants.ROOF_TYPE.FLAT && <>
              <h4 className="py-3">סוג המשקולת</h4>
              <div>

                {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setWeightType(dispatch, data)} defaultData={store.weightType} name="Weight" dataSource="WeightTypes" lKey="Value" value="Value" label="משקל (ק'ג)"></SelectCustom>}
              </div>

              <h4 className="py-3">
                <span>                ק"ג למטר פנל מרובע</span>
              </h4>
              <div>

                <TextField
                  id="weight-type"
                  label="הזינו את המספר"
                  value={store.weightSquare}
                  onChange={(e) => actions.setWeightSquare(dispatch, e.target.value)}
                  autoComplete='off'
                  color="primary"


                />
              </div>
            </>
            }
            {store.roofTypeId == constants.ROOF_TYPE.ISKURIT && store.fetotDirection == constants.FETOT_DIRECTION.PARALLEL && <>


              <h4 className="py-3">
                <span>מרחק בין טרפזים</span>
              </h4>
              <div>

                <TextField
                  id="trapezoid-distance"
                  label="מרחק (מ''מ)"
                  value={store.trapezoidDistance}
                  onChange={(e) => actions.setTrapezoidDistance(dispatch, e.target.value)}
                  autoComplete='off'
                  color="primary"


                />
              </div>
              <h4 className="py-3">סוג טרפז</h4>
              <div>

                {store.dataLoaded && <SelectCustom onChange={(data, type) => actions.setTrapezoidTypes(dispatch, data)} defaultData={store.trapezoidTypes} name="TrapezoidTypes" dataSource="TrapezoidTypes" lKey="Key" value="Value" label="סוג טרפז"></SelectCustom>}
              </div>
              {store.trapezoidTypes == constants.TRAPEZOID_TYPES.TRAPEZOID && <>
                <h4 className="py-3">מידות טרפז עליון</h4>
                <SelectCustom onChange={(data, type) => actions.setTrapezoidUpperSize(dispatch, data)} defaultData={store.trapezoidUpperSize} name="TrapezoidUpperSize" dataSource="TrapezoidUpperSizeTypes" lKey="Key" value="Value" label="מידות טרפז עליון"></SelectCustom>
              </>
              }
            </>

            }
            {store.roofTypeId == constants.ROOF_TYPE.KAL_ZIP && <>


              <h4 className="py-3">
                <span>מרחק בין קל זיפ</span>
              </h4>
              <div>

                <TextField
                  id="kalzip-distance"
                  label="מרחק (מ''מ)"
                  value={store.realspace}
                  onChange={(e) => actions.setRealspace(dispatch, e.target.value)}
                  autoComplete='off'
                  color="primary"


                />
            
              </div>
              </>}
            </Col>
          
        </Row></form>
    </div>
  );
};

export default Step4;
