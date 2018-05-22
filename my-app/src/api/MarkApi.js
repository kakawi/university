import axios from 'axios';
import * as constants from '../config/constants';

class MarkApi {
  // static getFaculties() {
  //   return axios
  //     .get(constants.API_FACULTIES_PATH)
  //     .then((response) => {
  //       return response.data;
  //     })
  //     .catch((error) => {
  //       return error;
  //     });
  // }

  static getMark(id) {
    return axios.get(constants.API_MARK_PATH + "/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

}

export default MarkApi;
