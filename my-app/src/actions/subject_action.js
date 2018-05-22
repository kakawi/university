import axios from 'axios';
import * as constants from '../config/constants';
import * as types from '../reducers/subject_reducer';

export const getSubjects = () => dispatch => {
  axios.get(constants.API_SUBJECTS_PATH)
    .then((response) => {
      dispatch({type: types.FETCH_SUBJECTS_SUCCESS, payload: response.data});
    })
    .catch((error) => {
      console.log("WARN", error);
    });
};

export const getSubject = (id) => dispatch => {
  dispatch({type: types.FETCH_SUBJECT_REQUEST});
  axios.get(constants.API_SUBJECTS_PATH + "/" + id)
    .then((response) => {
      dispatch({type: types.FETCH_SUBJECT_SUCCESS, payload: response.data});
    })
    .catch((error) => {
      console.log("WARN", error);
    });
};
