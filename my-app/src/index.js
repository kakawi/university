import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools}from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {Route, Switch} from 'react-router-dom';
import rootReducer from './reducers';
import { routerMiddleware, ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'

import App from './App';
import NoMatch from './component/NoMatch';
import Navbar from './component/Navbar';
import FacultyPage from "./component/faculty/FacultyPage";
import DepartmentPage from "./component/department/DepartmentPage";
import SpecialityPage from "./component/speciality/SpecialityPage";
import GroupPage from "./component/group/GroupPage";
import SetPage from "./component/set/SetPage";
import StudentPage from './component/student/StudentPage';
import SubjectPage from './component/subject/SubjectPage';
import SessionPage from './component/session/SessionPage';
import MarkPage from './component/mark/MarkPage';
import ReportPage from './component/report/ReportPage';
import LoadingDimmer from './component/LoadingDimmer';

import * as constants from './config/constants';
// import 'semantic-ui-css/semantic.min.css';

export const history = createHistory();
const middleware = [
  thunk,
  routerMiddleware(history)
];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);


// ========================================

ReactDOM.render(
  <Provider store={store}>
    {/* Don't Use <Router> here if you use ConnectedRouter */}
    <ConnectedRouter history={history}>
      <div>
        <Navbar/>
        <Switch>
          <Route exact path={constants.HOME_PATH} component={App}/>
          <Route path={constants.FACULTIES_PAGE_PATH} component={FacultyPage}/>
          <Route path={constants.DEPARTMENTS_PAGE_PATH} component={DepartmentPage}/>
          <Route path={constants.SPECIALITIES_PAGE_PATH} component={SpecialityPage}/>
          <Route path={constants.SETS_PAGE_PATH} component={SetPage}/>
          <Route path={constants.GROUPS_PAGE_PATH} component={GroupPage}/>
          <Route path={constants.STUDENTS_PAGE_PATH} component={StudentPage}/>
          <Route path={constants.SUBJECTS_PAGE_PATH} component={SubjectPage}/>
          <Route path={constants.SESSIONS_PAGE_PATH} component={SessionPage}/>
          <Route path={constants.MARKS_PAGE_PATH} component={MarkPage}/>
          <Route path={constants.REPORTS_PAGE_PATH} component={ReportPage}/>
          <Route component={NoMatch}/>
        </Switch>
        <LoadingDimmer/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
