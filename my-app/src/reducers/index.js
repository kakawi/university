import {combineReducers} from 'redux';
import faculty_reducer from './faculty_reducer';
import department_reducer from './department_reducer';
import speciality_reducer from './speciality_reducer';
import group_reducer from './group_reducer';
import set_reducer from './set_reducer';
import routing from './routing';
import student_reducer from './student_reducer';
import subject_reducer from './subject_reducer';
import session_reducer from './session_reducer';
import mark_reducer from './mark_reducer';
import report_reducer from './report_reducer';
import dimmer_reducer from './dimmer_reducer';

// import { routerReducer } from 'react-router-redux'

export default combineReducers({
  faculties: faculty_reducer,
  departments: department_reducer,
  specialities: speciality_reducer,
  groups: group_reducer,
  sets: set_reducer,
  students: student_reducer,
  subjects: subject_reducer,
  sessions: session_reducer,
  marks: mark_reducer,
  report: report_reducer,
  dimmer: dimmer_reducer,
  routing,
})
