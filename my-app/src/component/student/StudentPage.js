import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/student_action';
import * as groupActions from '../../actions/group_action';
import {Route, Switch, Link} from 'react-router-dom';
import StudentList from './StudentList';
import Student from './Student';
import StudentForm from "./StudentForm";
import { Button } from 'semantic-ui-react'
import * as constants from '../../config/constants';


class StudentPage extends React.Component {
  render() {
    return(
      <div>
        <Button
          as={Link}
          to={`${constants.STUDENTS_PAGE_PATH}/create`}
          content={"Добавить"}
        />

        <Switch>
          <Route exact path={constants.STUDENTS_PAGE_PATH} render={
            (props) =>
              <StudentList
                {...props}
                students={this.props.students.all.items}
                getStudents={this.props.markActions.getStudents}
                isFetched={this.props.students.all.isFetched}
              />
          }/>
          <Route path={`${constants.STUDENTS_PAGE_PATH}/create`} render={
            (props) =>
              <StudentForm
                {...props}
                groups={this.props.groups.all.items}
                getGroups={this.props.sessionActions.getGroups}
                isFetched={this.props.groups.all.isFetched}
                onSave={this.props.markActions.onSave}
              />
          }
          />
          <Route path={`${constants.STUDENTS_PAGE_PATH}/:id`} render={
            (props) =>
              <Student
                {...props}
                getStudent={this.props.markActions.getStudent}
                student={this.props.students.currentStudent.student}
                isFetched={this.props.students.currentStudent.isFetched}
              />
          }/>
        </Switch>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    students: state.students,
    groups: state.groups
  };
}

function mapDispatchToProps(dispatch) {
  return {
    markActions: bindActionCreators(actions, dispatch),
    sessionActions: bindActionCreators(groupActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentPage);
