import axios from 'axios';
import * as constants from '../config/constants';

class SubjectApi {
  static getSubject() {
    return axios.get(constants.API_SUBJECTS_PATH)
    .then((response) => {
      return response.data;
    });
  }
}

export default SubjectApi;
