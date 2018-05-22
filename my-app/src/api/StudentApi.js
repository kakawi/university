import axios from 'axios';
import * as constants from '../config/constants';

class StudentApi {
  static getStudents() {
    return axios.get(constants.API_STUDENTS_PATH)
    .then((response) => {
      return response.data;
    });
  }
}

export default StudentApi;
