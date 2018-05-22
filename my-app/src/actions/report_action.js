import axios from 'axios';
import * as constants from '../config/constants';
import * as types from '../reducers/report_reducer';

export const getDontPassStudentsReport = (idSession, idDepartment) => dispatch => {
  dispatch({type: types.FETCH_REPORT_REQUEST});
  axios.get(constants.API_REPORTS_PATH + "/dontPassStudents", {
    params: {
      idSession,
      idDepartment
    }
  })
  .then((response) => {
    dispatch({type: types.FETCH_REPORT_SUCCESS, payload: response.data});
  })
  .catch((error) => {
    console.log("WARN", error);
  });
};

export const getGroupAverageMarksReport = (idSession, idFaculty) => dispatch => {
  dispatch({type: types.FETCH_REPORT_REQUEST});
  axios.get(constants.API_REPORTS_PATH + "/groupAverageMarks", {
    params: {
      idSession,
      idFaculty
    }
  })
  .then((response) => {
    dispatch({type: types.FETCH_REPORT_SUCCESS, payload: response.data});
  })
  .catch((error) => {
    console.log("WARN", error);
  });
};

export const getSubjectAverageMarksReport = (idSession) => dispatch => {
  dispatch({type: types.FETCH_REPORT_REQUEST});
  axios.get(constants.API_REPORTS_PATH + "/subjectAverageMarks", {
    params: {
      idSession,
    }
  })
    .then((response) => {
      dispatch({type: types.FETCH_REPORT_SUCCESS, payload: response.data});
    })
    .catch((error) => {
      console.log("WARN", error);
    });
};

export const canGetScholarShipStudents = (idSession) => dispatch => {
  dispatch({type: types.FETCH_REPORT_REQUEST});
  axios.get(constants.API_REPORTS_PATH + "/canGetScholarShipStudents", {
    params: {
      idSession,
    }
  })
    .then((response) => {
      dispatch({type: types.FETCH_REPORT_SUCCESS, payload: response.data});
    })
    .catch((error) => {
      console.log("WARN", error);
    });
};
