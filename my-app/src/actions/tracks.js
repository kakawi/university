import axios from 'axios';
import {SERVER} from '../config/constants';


const API_END_POINT = `${SERVER}/endpoint`;

export const getTracks = () => dispatch => {
  axios.get(API_END_POINT)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log("WARN", error);
    });

  // dispatch({ type: 'FETCH_TRACKS_SUCCESS', payload: mockApiData})
};