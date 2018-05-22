import axios from 'axios';
import {SERVER} from '../config/constants';
import * as types from '../reducers/group_reducer';
import { push } from 'react-router-redux'
import * as constants from '../config/constants';


const API_GROUPS_PATH = `${SERVER}/groups`;

export const getGroups = () => dispatch => {
  axios.get(API_GROUPS_PATH)
    .then((response) => {
      dispatch({type: types.FETCH_GROUPS_SUCCESS, payload: response.data});
    })
    .catch((error) => {
      console.log("WARN", error);
    });
};

export const getGroup = (id) => dispatch => {
  dispatch({type: types.FETCH_GROUP_REQUEST});
  axios.get(API_GROUPS_PATH + "/" + id)
    .then((response) => {
      dispatch({type: types.FETCH_GROUP_SUCCESS, payload: response.data});
    })
    .catch((error) => {
      console.log("WARN", error);
    });
};

export const onSave = (newGroup) => dispatch => {
  dispatch({type: types.CREATE_GROUP_REQUEST});
  axios.post(API_GROUPS_PATH + "/create", {
      groupNumber: newGroup.groupNumber,
      set: {
        id: newGroup.setId
      }
    })
    .then((response) => {
      dispatch({type: types.CREATE_GROUP_SUCCESS, payload: response.data});
      dispatch(push(constants.GROUPS_PAGE_PATH))
    })
    .catch((error) => {
      console.log("WARN", error);
    });
};
