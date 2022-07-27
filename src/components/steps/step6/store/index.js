
import { useReducer } from 'react';
import {
  SET_DISTANCE_FROM_ZERO_POINT,SET_HEIGHT_PARALLEL,SET_MODAL_TYPE_TEXT,SET_PANELS_COUNT,SET_PANELS_TYPE,SET_TRIANGLE,SET_ZERO_POINT,SET_ZERO_POINT_ABSOLUTE,SET_LABEL_TEXT,SET_CURRENT_LABEL,SET_DATA_LOADED, SET_GROUP_ID
} from './actions';


export const initialState = {

  heightParallel: 0,
  modalTypeText: null,
  triangle: { angle: 0, frontLegHeight: 0 },
  panelsType: null,
  panelsCount: { horizontal: 1, vertical: 1 },
  zeroPoint: { x: 0, y: 0, direction: 'up', maxYRange: 0 },
  distanceFromZeroPoint: { dy: 0, dx: 0 },
  //labelText: '',
  currentLabel:'',
  dataLoaded:false,
  groupId:0,
  zeroPointAbsolute:{ x: 0, y: 0, direction: 'up', maxYRange: 0 }


};
export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_GROUP_ID:
      return { ...state, groupId: payload };
    case SET_CURRENT_LABEL:
      return { ...state, currentLabel: payload };
    case SET_DATA_LOADED:
      return { ...state, dataLoaded: payload };
    case SET_DISTANCE_FROM_ZERO_POINT:
      return { ...state, distanceFromZeroPoint: payload };
    case SET_HEIGHT_PARALLEL:
      return { ...state, heightParallel: payload };
    case SET_MODAL_TYPE_TEXT:
      return { ...state, modalTypeText: payload };
    case SET_PANELS_COUNT:
      return { ...state, panelsCount: payload };
    case SET_PANELS_TYPE:
      return { ...state, panelsType: payload };
    case SET_TRIANGLE:
      return { ...state, triangle: payload };
    case SET_ZERO_POINT:
      return { ...state, zeroPoint: payload };
      case SET_ZERO_POINT_ABSOLUTE:
        return { ...state, zeroPointAbsolute: payload };
      // case SET_LABEL_TEXT:
      // return { ...state, labelText: payload };
    default:
      return state;
  }
}
