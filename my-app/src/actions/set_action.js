import axios from 'axios';
import * as constants from '../config/constants';
import * as types from '../reducers/set_reducer';

export const getSets = () => dispatch => {
  dispatch({type: types.FETCH_SETS_REQUEST});
  axios.get(constants.API_SETS_PATH)
    .then((response) => {
      dispatch({type: types.FETCH_SETS_SUCCESS, payload: response.data});
    })
    .catch((error) => {
      console.log("WARN", error);
    });
};

export const getSet = (id) => dispatch => {
  dispatch({type: types.FETCH_SET_REQUEST});
  axios.get(constants.API_SETS_PATH + "/" + id)
    .then((response) => {
      dispatch({type: types.FETCH_SET_SUCCESS, payload: response.data});
    })
    .catch((error) => {
      console.log("WARN", error);
    });
};
