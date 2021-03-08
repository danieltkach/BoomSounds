import * as actions from '../action-types';

const initialState = {
  audioUrl:
    'https://firebasestorage.googleapis.com/v0/b/e-commerce-henry-34fb9.appspot.com/o/test%2F9%20de%20Julio.mp3?alt=media&token=ead8ee63-7e31-4229-9427-56f7bd34d204',
  isPlaying: false,
};

const playReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_AUDIO_URL:
      return {
        ...state,
        audioUrl: action.payload,
      };

    case actions.CHANGE_STATUS:
      return {
        ...state,
        isPlaying: action.payload,
      };

    default: {
      return state;
    }
  }
};

export default playReducer;
