import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/report_action';
import * as sessionActions from '../../actions/session_action';
import {NavLink, Route, Switch} from 'react-router-dom';
import * as constants from '../../config/constants';
import { Menu, Select } from 'semantic-ui-react'
import DontPassStudentsReport from './DontPassStudentsReport';
import GroupAverageMarksReport from './GroupAverageMarksReport';
import SubjectAverageMarksReport from './SubjectAverageMarksReport';
import CanGetScholarShipStudents from './CanGetScholarShipStudents';
import SessionApi from '../../api/SessionApi';

class ReportPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionId: '',
      allSessions: [],
      isFetchingSessions: true
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  componentDidMount() {
    SessionApi.getSessions().then(sessions => {
      this.setState({
        allSessions: sessions,
        isFetchingSessions: false
      })
    });
  }
  handleSelectChange(event, data) {
    this.setState({
      [data.name]: data.value
    });
  }
  renderReportNav() {
    return (
      <Menu tabular>
        <Menu.Item
          name="Запрос №1"
          as={NavLink}
          to={constants.REPORTS_PAGE_PATH + "/dontPassStudents"}
          exact
        />
        <Menu.Item
          name="Запрос №2"
          as={NavLink}
          to={constants.REPORTS_PAGE_PATH + "/groupAverageMarks"}
          exact
        />
        <Menu.Item
          name="Запрос №3"
          as={NavLink}
          to={constants.REPORTS_PAGE_PATH + "/subjectAverageMarks"}
          exact
        />
        <Menu.Item
          name="Запрос №4"
          as={NavLink}
          to={constants.REPORTS_PAGE_PATH + "/canGetScholarShipStudents"}
          exact
        />
      </Menu>
    )
  }
  renderReports() {
    const {sessionId} = this.state;
    return (
      <div>
        {this.renderReportNav()}
        <Switch>
          <Route path={constants.REPORTS_PAGE_PATH + "/dontPassStudents"} render={
            (props) => (
              <DontPassStudentsReport
                {...props}
                sessionId={sessionId}
                report={this.props.report}
                getDontPassStudentsReport={this.props.reportActions.getDontPassStudentsReport}
              />
            )
          }/>
          <Route path={constants.REPORTS_PAGE_PATH + "/groupAverageMarks"} render={
            (props) => (
              <GroupAverageMarksReport
                {...props}
                sessionId={sessionId}
                report={this.props.report}
                getGroupAverageMarksReport={this.props.reportActions.getGroupAverageMarksReport}
              />
            )
          }/>
          <Route path={constants.REPORTS_PAGE_PATH + "/subjectAverageMarks"} render={
            (props) => (
              <SubjectAverageMarksReport
                {...props}
                sessionId={sessionId}
                report={this.props.report}
                getSubjectAverageMarksReport={this.props.reportActions.getSubjectAverageMarksReport}
              />
            )
          }/>
          <Route path={constants.REPORTS_PAGE_PATH + "/canGetScholarShipStudents"} render={
            (props) => (
              <CanGetScholarShipStudents
                {...props}
                sessionId={sessionId}
                report={this.props.report}
                canGetScholarShipStudents={this.props.reportActions.canGetScholarShipStudents}
              />
            )
          }/>
        </Switch>
      </div>
    );
  }
  render() {
    let sessionOptions = [];
    const {isFetchingSessions, allSessions, sessionId} = this.state;
    if (!isFetchingSessions) {
      sessionOptions = allSessions.map(session => {
        return {key: session.id, text: `${session.name} ${session.yearOfSession}`, value: session.id}
      })
    }
    return(
      <div>
        <Select
          options={sessionOptions}
          placeholder='Сессия'
          defaultValue={sessionId}
          onChange={this.handleSelectChange}
          name={"sessionId"}
        />
        {sessionId && this.renderReports()}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    report: state.report,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    reportActions: bindActionCreators(actions, dispatch),
    sessionActions: bindActionCreators(sessionActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportPage);
