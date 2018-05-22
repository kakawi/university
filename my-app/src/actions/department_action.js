import axios from 'axios';
import {SERVER} from '../config/constants';
import * as types from '../reducers/department_reducer';

const API_FACULTIES_PATH = `${SERVER}/departments`;

export const getDepartments = () => dispatch => {
  axios.get(API_FACULTIES_PATH)
    .then((response) => {
      dispatch({type: types.FETCH_DEPARTMENTS_SUCCESS, payload: response.data});
    })
    .catch((error) => {
      console.log("WARN", error);
    });
};

export const getDepartment = (id) => dispatch => {
  dispatch({type: types.FETCH_DEPARTMENT_REQUEST});
  axios.get(API_FACULTIES_PATH + "/" + id)
    .then((response) => {
      dispatch({type: types.FETCH_DEPARTMENT_SUCCESS, payload: response.data});
    })
    .catch((error) => {
      console.log("WARN", error);
    });
};
