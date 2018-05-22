import axios from 'axios';
import * as constants from '../config/constants';

class DepartmentApi {
  static getDepartments() {
    return axios.get(constants.API_DEPARTMENTS_PATH)
    .then((response) => {
      return response.data;
    })
  }
  static getDepartment(id) {
    return axios.get(constants.API_DEPARTMENTS_PATH + "/" + id)
      .then((response) => {
        return response.data;
      })
  }
}

export default DepartmentApi;
