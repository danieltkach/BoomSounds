import * as actions from '../action-types';

export const setAudioUrl = (url) => {
  return function (dispatch) {
    dispatch({ type: actions.SET_AUDIO_URL, payload: url });
  };
};
export const changeStatus = (status) => {
  return function (dispatch) {
    dispatch({ type: actions.CHANGE_STATUS, payload: status });
  };
};
