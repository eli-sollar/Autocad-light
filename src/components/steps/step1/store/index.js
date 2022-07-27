

import {
  SET_CUSTOMERS, SET_CUSTOMERS_DEFAULT, SET_DATA_LOADED,
  SET_FETOT_DIRECTION, SET_PLANNER,
  SET_PLANNER_DEFAULT, SET_ROOF_SELECTED, SET_ROOF_TYPES
} from './actions';


export const initialState = {
  roofTypeId: null,
  roofTypes: [],
  customers: '',
  planner: '',
  fetotDirection: null,
  customersDefault: '',
  plannerDefault: '',
  dataLoaded: false

};
export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CUSTOMERS:
      return { ...state, customers: payload };
    case SET_CUSTOMERS_DEFAULT:
      return { ...state, customersDefault: payload };
    case SET_FETOT_DIRECTION:
      return { ...state, fetotDirection: payload };
    case SET_PLANNER:
      return { ...state, planner: payload };
    case SET_PLANNER_DEFAULT:
      return { ...state, plannerDefault: payload };
    case SET_ROOF_SELECTED:
      return { ...state, roofTypeId: payload };
    case SET_DATA_LOADED:
      return { ...state, dataLoaded: payload };
      case SET_ROOF_TYPES:
      return { ...state, roofTypes: payload };
    
    default:
      return state;
  }
}
