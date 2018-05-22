import axios from 'axios';
import * as constants from '../config/constants';

class SessionApi {
  static getSessions() {
    return axios.get(constants.API_SESSIONS_PATH)
    .then((response) => {
      return response.data;
    });
  }
}

export default SessionApi;
