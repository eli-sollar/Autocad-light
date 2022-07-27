
export const SET_CURRENT_LABEL = 'CURRENT_LABEL' ;
export const SET_DATA_LOADED = 'DATA_LOADED' ;
export const SET_PANELS_TYPE= 'PANELS_TYPE';
 export const SET_GROUP_ID='GROUP_ID';
export const SET_HEIGHT_PARALLEL= 'HEIGHT_PARALLEL';

export const SET_MODAL_TYPE_TEXT = 'MODAL_TYPE_TEXT';
export const SET_TRIANGLE= 'TRIANGLE';
export const SET_PANELS_COUNT= 'PANELS_COUNT';
export const SET_ZERO_POINT= 'ZERO_POINT';
export const SET_ZERO_POINT_ABSOLUTE= 'ZERO_POINT_ABSOLUTE';

export const SET_DISTANCE_FROM_ZERO_POINT= 'DISTANCE_FROM_ZERO_POINT';
//export const SET_LABEL_TEXT= 'LABEL_TEXT';

export const setGroupId = (dispatch, payload) =>
  dispatch({ type: SET_GROUP_ID, payload });
export const setPanelsType = (dispatch, payload) =>
  dispatch({ type: SET_PANELS_TYPE, payload });
  export const setCurrentLabel = (dispatch, payload) =>
  dispatch({ type: SET_CURRENT_LABEL, payload });
  export const setDataLoaded = (dispatch, payload) =>
  dispatch({ type: SET_DATA_LOADED, payload });

export const setHeightParallel = (dispatch, payload) =>
  dispatch({ type: SET_HEIGHT_PARALLEL, payload });

export const setModalTypeText = (dispatch, payload) =>
  dispatch({ type: SET_MODAL_TYPE_TEXT, payload });

export const setTriangle = (dispatch, payload) =>
  dispatch({ type: SET_TRIANGLE, payload });

export const setPanelsCount = (dispatch, payload) =>
  dispatch({ type: SET_PANELS_COUNT, payload });

export const setZeroPoint = (dispatch, payload) =>
  dispatch({ type: SET_ZERO_POINT, payload });
  export const setZeroPointAbsolute = (dispatch, payload) =>
  dispatch({ type: SET_ZERO_POINT_ABSOLUTE, payload });

export const setDistanceFromZeroPoint = (dispatch, payload) =>
  dispatch({ type: SET_DISTANCE_FROM_ZERO_POINT, payload });

  // export const setLabelText = (dispatch, payload) =>
  // dispatch({ type: SET_LABEL_TEXT, payload });


  