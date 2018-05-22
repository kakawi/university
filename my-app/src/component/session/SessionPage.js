import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/session_action';
import * as subjectActions from '../../actions/subject_action';
import * as sessionActions from '../../actions/session_action';
import {Route, Switch} from 'react-router-dom';
import SessionList from './SessionList';
import Session from './Session';
import * as constants from '../../config/constants';

class SessionPage extends React.Component {
  render() {
    return(
      <div>
        <Switch>
          <Route exact path={constants.SESSIONS_PAGE_PATH} render={
            (props) =>
              <SessionList
                {...props}
                sessions={this.props.sessions.all.items}
                getSessions={this.props.markActions.getSessions}
                isFetched={this.props.sessions.all.isFetched}
              />
          }/>
          <Route exact path={`${constants.SESSIONS_PAGE_PATH}/:id`} render={
            (props) =>
              <Session
                {...props}
                currentSession={this.props.sessions.currentSession}
                getSetsBySession={this.props.sessionActions.getSetsBySession}
                updateSession={this.props.sessionActions.updateSession}
                getSubjectBySessionAndSet={this.props.sessionActions.getSubjectBySessionAndSet}
                getSession={this.props.markActions.getSession}
                onShowSet={this.props.markActions.onShowSet}
                onCloseSet={this.props.markActions.onCloseSet}
                addSubjectInSession={this.props.markActions.addSubjectInSession}
                getSubjects={this.props.subjectActions.getSubjects}
                allSubjects={this.props.subjects.all}
              />
          }/>
        </Switch>

      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    sessions: state.sessions,
    subjects: state.subjects,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    markActions: bindActionCreators(actions, dispatch),
    subjectActions: bindActionCreators(subjectActions, dispatch),
    sessionActions: bindActionCreators(sessionActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionPage);
