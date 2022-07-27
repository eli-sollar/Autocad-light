
import { useReducer } from 'react';
import {
  SET_ROOF_TYPE_TEXT,
  SET_ROOF_TYPE_ID,
  SET_MODAL_TYPE,
  SET_TRAPEZOID_DISTANCE,
  SET_TRAPEZOID_TYPES,
  SET_MODAL_TYPE_TEXT,

  SET_WEIGHT_TYPE,
  SET_WEIGHT_SQUARE,
  SET_MODAL_TYPES,

  SET_DATA_LOADED,
  SET_TRAPEZOID_UPPER_SIZE,
  SET_FETOT_DIRECTION,
  SET_REALSPACE,
  SET_FETA_COUNT
} from './actions';


export const initialState = {

  roofTypeText: null,
  roofTypeId: null,
  modalType: null,
  trapezoidDistance: null,
  trapezoidTypes: null,
  modalTypeText: null,
  weightType: null,
  weightSquare: null,
  modalTypes: [],
  dataLoaded: false,
  trapezoidUpperSize: null,

  fetotDirection: null,
  realspace: 0,
  //fetaCount:0
};
export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ROOF_TYPE_TEXT:
      return { ...state, roofTypeText: payload };
    case SET_ROOF_TYPE_ID:
      return { ...state, roofTypeId: payload };
    case SET_MODAL_TYPE:
      return { ...state, modalType: payload };
    case SET_TRAPEZOID_DISTANCE:
      return { ...state, trapezoidDistance: payload };
    case SET_TRAPEZOID_TYPES:
      return { ...state, trapezoidTypes: payload };
    case SET_MODAL_TYPE_TEXT:
      return { ...state, modalTypeText: payload };
    case SET_WEIGHT_TYPE:
      return { ...state, weightType: payload };
    case SET_WEIGHT_SQUARE:
      return { ...state, weightSquare: payload };
    case SET_MODAL_TYPES:
      return { ...state, modalTypes: payload };
    case SET_DATA_LOADED:
      return { ...state, dataLoaded: payload };
    case SET_TRAPEZOID_UPPER_SIZE:
      return { ...state, trapezoidUpperSize: payload };
    case SET_FETOT_DIRECTION:
      return { ...state, fetotDirection: payload };
    case SET_REALSPACE:
      return { ...state, realspace: payload };
      // case SET_FETA_COUNT:
      //   return { ...state, fetaCount: payload };
    default:
      return state;
  }
}
