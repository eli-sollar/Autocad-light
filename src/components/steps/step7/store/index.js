
import { useReducer } from 'react';
import {
  SET_MODAL_TYPE_TEXT,SET_LABEL_TEXT
} from './actions';


export const initialState = {

  
  modalTypeText: null, 
  labelText: ''

};
export const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
   
    case SET_MODAL_TYPE_TEXT:
      return { ...state, modalTypeText: payload };

      case SET_LABEL_TEXT:
      return { ...state, labelText: payload };
    default:
      return state;
  }
}
