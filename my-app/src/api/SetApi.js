import axios from 'axios';
import * as constants from '../config/constants';

class SetApi {
  static getSets() {
    return axios.get(constants.API_SETS_PATH)
    .then((response) => {
      return response.data;
    });
  }
}

export default SetApi;
