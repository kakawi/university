import axios from 'axios';
import {SERVER} from '../config/constants';
import * as types from '../reducers/faculty_reducer';
import * as dimmerActions from './dimmer_actions';


const API_FACULTIES_PATH = `${SERVER}/faculties`;

export const getFaculties = () => dispatch => {
  axios.get(API_FACULTIES_PATH)
    .then((response) => {
      dispatch({type: types.FETCH_FACULTIES_SUCCESS, payload: response.data});
    })
    .catch((error) => {
      console.log("WARN", error);
    });
};

export const getFaculty = (id) => dispatch => {
  dispatch({type: types.FETCH_FACULTY_REQUEST});
  axios.get(API_FACULTIES_PATH + "/" + id)
    .then((response) => {
      dispatch({type: types.FETCH_FACULTY_SUCCESS, payload: response.data});
    })
    .catch((error) => {
      console.log("WARN", error);
    });
};

export const onSaveClick = (updatedFaculty) => dispatch => {
  dispatch(dimmerActions.dimmerStart());
  axios.put(API_FACULTIES_PATH + "/" + updatedFaculty.id, {
    updatedFaculty
  }).then(response => {
    dispatch({type: types.UPDATE_FACULTY, payload: response.data});
    dispatch(dimmerActions.dimmerStop());
  })
    .catch(error => {
      console.log("ERROR", error);
    })
};

export const onEditClick = (updatedFaculty) => dispatch => {
  dispatch(dimmerActions.dimmerStart());
  axios.put(API_FACULTIES_PATH + "/" + updatedFaculty.id, {
    id: updatedFaculty.id,
    name: updatedFaculty.name,
  }).then(response => {
    dispatch({type: types.UPDATE_FACULTY, payload: response.data});
    dispatch(dimmerActions.dimmerStop());
  })
  .catch(error => {
    console.log("ERROR", error);
  })
};
