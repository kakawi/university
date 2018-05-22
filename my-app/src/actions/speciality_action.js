import axios from 'axios';
import {SERVER} from '../config/constants';
import * as types from '../reducers/speciality_reducer';

const API_SPECIALITIES_PATH = `${SERVER}/specialities`;

export const getSpecialities = () => dispatch => {
  axios.get(API_SPECIALITIES_PATH)
    .then((response) => {
      dispatch({type: types.FETCH_SPECIALITIES_SUCCESS, payload: response.data});
    })
    .catch((error) => {
      console.log("WARN", error);
    });
};

export const getSpeciality = (id) => dispatch => {
  dispatch({type: types.FETCH_SPECIALITY_REQUEST});
  axios.get(API_SPECIALITIES_PATH + "/" + id)
    .then((response) => {
      dispatch({type: types.FETCH_SPECIALITY_SUCCESS, payload: response.data});
    })
    .catch((error) => {
      console.log("WARN", error);
    });
};
