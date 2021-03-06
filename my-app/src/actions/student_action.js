import axios from 'axios';
import * as types from '../reducers/student_reducer';
import { push } from 'react-router-redux'
import * as constants from '../config/constants';

export const getStudents = () => dispatch => {
  axios.get(constants.API_STUDENTS_PATH)
    .then((response) => {
      dispatch({type: types.FETCH_STUDENTS_SUCCESS, payload: response.data});
    })
    .catch((error) => {
      console.log("WARN", error);
    });
};

export const getStudent = (id) => dispatch => {
  dispatch({type: types.FETCH_STUDENT_REQUEST});
  axios.get(constants.API_STUDENTS_PATH + "/" + id)
    .then((response) => {
      dispatch({type: types.FETCH_STUDENT_SUCCESS, payload: response.data});
    })
    .catch((error) => {
      console.log("WARN", error);
    });
};

export const onSave = (newStudent) => dispatch => {
  dispatch({type: types.CREATE_STUDENT_REQUEST});
  axios.post(constants.API_STUDENTS_PATH + "/create", {
      lastName: newStudent.lastName,
      firstName: newStudent.firstName,
      middleName: newStudent.middleName,
      recordBook: newStudent.recordBook,
      addressOfPermanentResidence: newStudent.addressOfPermanentResidence,
      addressOfResidence: newStudent.addressOfResidence,
      isLocal: newStudent.isLocal,
      group: newStudent.group,
    })
    .then((response) => {
      dispatch({type: types.CREATE_STUDENT_SUCCESS, payload: response.data});
      dispatch(push(constants.STUDENTS_PAGE_PATH))
    })
    .catch((error) => {
      console.log("WARN", error);
    });
};
