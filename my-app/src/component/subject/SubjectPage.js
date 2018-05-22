import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/subject_action';
import {Route, Switch} from 'react-router-dom';
import SubjectList from './SubjectList';
import Subject from './Subject';
import * as constants from '../../config/constants';


class SubjectPage extends React.Component {
  render() {
    return(
      <div>
        <Switch>
          <Route exact path={constants.SUBJECTS_PAGE_PATH} render={
            (props) =>
              <SubjectList
                {...props}
                subjects={this.props.subjects.all.items}
                getSubjects={this.props.markActions.getSubjects}
                isFetched={this.props.subjects.all.isFetched}
              />
          }/>
          <Route path={`${constants.SUBJECTS_PAGE_PATH}/:id`} render={
            (props) =>
              <Subject
                {...props}
                getSubject={this.props.markActions.getSubject}
                subject={this.props.subjects.currentSubject.subject}
                isFetched={this.props.subjects.currentSubject.isFetched}
              />
          }/>
        </Switch>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    subjects: state.subjects,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    markActions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectPage);
