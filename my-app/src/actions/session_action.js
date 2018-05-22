import axios from 'axios';
import {SERVER} from '../config/constants';
import * as types from '../reducers/session_reducer';
import { push } from 'react-router-redux'
import * as constants from "../config/constants";

export const getSessions = () => dispatch => {
  axios.get(constants.API_SESSIONS_PATH)
  .then((response) => {
    dispatch({type: types.FETCH_SESSIONS_SUCCESS, payload: response.data});
  })
  .catch((error) => {
    console.log("WARN", error);
  });
};

export const getSession = (id) => dispatch => {
  dispatch({type: types.FETCH_SESSION_REQUEST});
  axios.get(constants.API_SESSIONS_PATH + "/" + id)
    .then((response) => {
      dispatch({type: types.FETCH_SESSION_SUCCESS, payload: response.data});
    })
    .catch((error) => {
      console.log("WARN", error);
    });
};

export const updateSession = (updatedSession) => dispatch => {
  axios.put(constants.API_SESSIONS_PATH + "/" + updatedSession.id, {
    id: updatedSession.id,
    name: updatedSession.name,
    yearOfSession: updatedSession.yearOfSession,
    isFinished: updatedSession.isFinished
  })
  .then((response) => {
    dispatch({type: types.FETCH_SESSION_SUCCESS, payload: response.data});
  })
  .catch((error) => {
    console.log("WARN", error);
  });
};

export const getSetsBySession = (id) => dispatch => {
  dispatch({type: types.FETCH_SETS_BY_SESSION_REQUEST});
  axios.post(constants.API_SETS_PATH + "/bySession", {
    id
  })
    .then((response) => {
      dispatch({type: types.FETCH_SETS_BY_SESSION_SUCCESS, payload: response.data});
    })
    .catch((error) => {
      console.log("WARN", error);
    });
};

export const getSubjectBySessionAndSet = (idSession, idSet) => dispatch => {
  dispatch({type: types.FETCH_SUBJECTS_BY_SESSION_AND_SET_REQUEST});
  axios.get(constants.API_SUBJECTS_PATH + "/bySessionAndSet", {
    params: {
      idSession,
      idSet
    }
  })
    .then((response) => {
      dispatch({type: types.FETCH_SUBJECTS_BY_SESSION_AND_SET_SUCCESS, payload: response.data});
    })
    .catch((error) => {
      console.log("WARN", error);
    });
};

export const onShowSet = (idSession, idSet) => dispatch => {
  dispatch({type: types.SHOW_SET, payload: {
    idSession,
    idSet
    }});
};

export const onCloseSet = () => dispatch => {
  dispatch({type: types.CLOSE_SET});
};

export const addSubjectInSession = (idSession, idSet, idSubject) => dispatch => {
  dispatch({type: types.ADD_SUBJECT_REQUEST});
  axios.post(`${SERVER}/schedule/add`, {
      idSession,
      idSet,
      idSubject
    })
    .then((response) => {
      dispatch(push(constants.SESSIONS_PAGE_PATH))
    })
    .catch((error) => {
      console.log("WARN", error);
    });
};
