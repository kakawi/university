import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as markActions from '../../actions/mark_action';
import {Route, Switch, Link} from 'react-router-dom';
import MarkList from './MarkList';
import Mark from './Mark';
import MarkForm from "./MarkForm";
import MarkFormPopup from "./MarkFormPopup";
import {Button} from 'semantic-ui-react'
import * as constants from '../../config/constants';
import MarkApi from '../../api/MarkApi';
import SessionApi from '../../api/SessionApi';
import SubjectApi from '../../api/SubjectApi';
import StudentApi from '../../api/StudentApi';

class MarkPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenForm: false,
      isLoading: false,
      actionType: null,
      currentMark: {},
      allSessions: [],
      allStudents: [],
      allSubjects: []
    };

    this.onClickEditMark = this.onClickEditMark.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onNewClick = this.onNewClick.bind(this);
  }

  onNewClick() {
    this.setState({
      isOpenForm: true,
      isLoading: true,
      actionType: 'Add',
      currentMark: {}
    });
    let allSessions, allStudents;

    SessionApi.getSessions()
      .then(sessions => {
        allSessions = sessions;
        StudentApi.getStudents()
          .then(students => {
            allStudents = students;
            SubjectApi.getSubject()
              .then(subjects => {
                this.setState({
                  allSubject: subjects,
                  allSessions: allSessions,
                  allStudents: allStudents,
                  isLoading: false
                })
              })
          })
      })

  }

  onCancelClick() {
    this.setState({
      isOpenForm: false,
      isLoading: false,
      actionType: null,
      currentMark: {}
    })
  }

  onSaveClick(sessionId, studentId, subjectId, mark) {
    this.setState({
      isOpenForm: false,
      currentMark: {}
    });
    this.props.markActions.onSave(sessionId, studentId, subjectId, mark);
  }

  onEditClick(markId, mark) {
    this.setState({
      isOpenForm: false,
      faculty: {}
    });
    this.props.markActions.onEditClick(markId, mark);
  }

  onClickEditMark(idMark) {
    this.setState({
      isOpenForm: true,
      actionType: 'Edit',
      isLoading: true
    });
    MarkApi.getMark(idMark)
      .then(mark => {
        this.setState({
          isLoading: false,
          currentMark: mark
        })
      });
  }

  render() {
    return (
      <div>
        <Button
        as={Link}
        to={`${constants.MARKS_PAGE_PATH}/create`}
        content={"Добавить"}
        />

        <Switch>
          <Route exact path={constants.MARKS_PAGE_PATH} render={
            (props) =>
              <MarkList
                {...props}
                marks={this.props.marks.all.items}
                getMarks={this.props.markActions.getMarks}
                isFetched={this.props.marks.all.isFetched}
                onClickEditMark={this.onClickEditMark}
                onClickDeleteMark={this.props.markActions.onClickDeleteMark}
              />
          }/>
          <Route path={`${constants.MARKS_PAGE_PATH}/create`} render={
            (props) =>
              <MarkForm
                {...props}
                allSessions={this.props.marks.form.allSessions}
                isFetchingSession={this.props.marks.form.isFetchingSession}
                students={this.props.marks.form.students}
                isFetchingStudents={this.props.marks.form.isFetchingStudents}
                subjects={this.props.marks.form.subjects}
                isFetchingSubjects={this.props.marks.form.isFetchingSubjects}
                getAllSessions={this.props.markActions.getAllSessions}
                getStudentsBySession={this.props.markActions.getStudentsBySession}
                getSubjectsBySessionAndStudent={this.props.markActions.getSubjectsBySessionAndStudent}
                onSave={this.props.markActions.onSave}
              />
          }
          />
          <Route path={`${constants.MARKS_PAGE_PATH}/:id`} render={
            (props) =>
              <Mark
                {...props}
                getMark={this.props.markActions.getMark}
                mark={this.props.marks.currentMark.mark}
                isFetched={this.props.marks.currentMark.isFetched}
              />
          }/>
        </Switch>
        <MarkFormPopup
          isLoading={this.state.isLoading}
          actionType={this.state.actionType}
          currentMark={this.state.currentMark}
          allSessions={this.state.allSessions}
          allStudents={this.state.allStudents}
          allSubjects={this.state.allSubjects}
          isOpenForm={this.state.isOpenForm}
          onCancelClick={this.onCancelClick}
          onSaveClick={this.onSaveClick}
          onEditClick={this.onEditClick}
        />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    marks: state.marks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    markActions: bindActionCreators(markActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkPage);
