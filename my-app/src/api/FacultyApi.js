import axios from 'axios';
import * as constants from '../config/constants';

class FacultyApi {
  static getFaculties() {
    return axios
      .get(constants.API_FACULTIES_PATH)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

  static getFaculty(id) {
    return axios.get(constants.API_FACULTIES_PATH + "/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

}

export default FacultyApi;
