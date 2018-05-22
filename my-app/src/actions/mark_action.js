import axios from 'axios';
import {SERVER} from '../config/constants';
import * as types from '../reducers/mark_reducer';
import {push} from 'react-router-redux'
import * as constants from '../config/constants';

const API_MARKS_PATH = `${SERVER}/marks`;

export const getMarks = () => dispatch => {
  axios.get(API_MARKS_PATH)
    .then((response) => {
      dispatch({type: types.FETCH_MARKS_SUCCESS, payload: response.data});
    })
    .catch((error) => {
      console.log("WARN", error);
    });
};

export const getMark = (id) => dispatch => {
  dispatch({type: types.FETCH_MARK_REQUEST});
  axios.get(API_MARKS_PATH + "/" + id)
    .then((response) => {
      dispatch({type: types.FETCH_MARK_SUCCESS, payload: response.data});
    })
    .catch((error) => {
      console.log("WARN", error);
    });
};

export const getAllSessions = () => dispatch => {
  dispatch({type: types.FETCH_SESSIONS_FOR_MARK_REQUEST});
  axios.get(constants.API_SESSIONS_PATH)
    .then((response) => {
      dispatch({type: types.FETCH_SESSIONS_FOR_MARK_SUCCESS, payload: response.data});
    })
    .catch((error) => {
      console.log("WARN", error);
    });
};

export const getStudentsBySession = (sessionId) => dispatch => {
  dispatch({type: types.FETCH_STUDENTS_BY_SESSION_REQUEST});
  axios.post(constants.API_STUDENTS_PATH + "/bySession", {
    id: sessionId
  })
    .then((response) => {
      dispatch({type: types.FETCH_STUDENTS_BY_SESSION_SUCCESS, payload: response.data});
    })
    .catch((error) => {
      console.log("WARN", error);
    });
};

export const getSubjectsBySessionAndStudent = (sessionId, studentId) => dispatch => {
  dispatch({type: types.FETCH_SUBJECTS_BY_SESSION_AND_STUDENT_REQUEST});
  axios.post(constants.API_SUBJECTS_PATH + "/forSessionAndStudent", {
    sessionId,
    studentId
  })
    .then((response) => {
      dispatch({type: types.FETCH_SUBJECTS_BY_SESSION_AND_STUDENT_SUCCESS, payload: response.data});
    })
    .catch((error) => {
      console.log("WARN", error);
    });
};

export const onSave = (sessionId, studentId, subjectId, mark) => dispatch => {
  dispatch({type: types.CREATE_MARK_REQUEST});
  axios.post(API_MARKS_PATH + "/create", {
    sessionId,
    studentId,
    subjectId,
    mark
  })
  .then((response) => {
    dispatch({type: types.CREATE_MARK_SUCCESS, payload: response.data});
    dispatch(push(constants.MARKS_PAGE_PATH))
  })
  .catch((error) => {
    console.log("WARN", error);
  });
};

export const onClickDeleteMark = (markId) => dispatch => {
  axios.delete(API_MARKS_PATH + "/" + markId)
  .then((response) => {
    dispatch({type: types.DELETE_MARK_SUCCESS, payload: response.data});
  })
  .catch((error) => {
    console.log("WARN", error);
  });
};
