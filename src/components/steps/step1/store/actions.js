
export const SET_ROOF_SELECTED = 'SET_ROOF_SELECTED';
export const SET_ROOF_TYPES = 'SET_ROOF_TYPES';
export const SET_CUSTOMERS = 'SET_CUSTOMERS';
export const SET_PLANNER = 'SET_PLANNER';
export const SET_FETOT_DIRECTION = 'SET_FETOT_DIRECTION';
export const SET_CUSTOMERS_DEFAULT = 'SET_CUSTOMERS_DEFAULT';

export const SET_PLANNER_DEFAULT = 'SET_PLANNER_DEFAULT';
export const SET_DATA_LOADED = 'SET_DATA_LOADED';


export const setRoofSelected = (dispatch, payload) =>
  dispatch({ type: SET_ROOF_SELECTED, payload });

export const setRoofTypes = (dispatch, payload) =>
  dispatch({ type: SET_ROOF_TYPES, payload });

export const setCustomers = (dispatch, payload) =>
  dispatch({ type: SET_CUSTOMERS, payload });

export const setPlanner = (dispatch, payload) =>
  dispatch({ type: SET_PLANNER, payload });

export const setFetotDirection = (dispatch, payload) =>
  dispatch({ type: SET_FETOT_DIRECTION, payload });

export const setCustomersDefault = (dispatch, payload) =>
  dispatch({ type: SET_CUSTOMERS_DEFAULT, payload });

  export const setPlannerDefault= (dispatch, payload) =>
  dispatch({ type: SET_PLANNER_DEFAULT, payload });

export const setDataLoaded = (dispatch, payload) =>
  dispatch({ type: SET_DATA_LOADED, payload });
