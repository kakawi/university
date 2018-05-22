import React from 'react'
import { Form, Button, Select, Loader } from 'semantic-ui-react'
import PropTypes from 'prop-types';

export default class MarkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionId: '',
      studentId: '',
      subjectId: '',
      mark: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSessionSelectChange = this.handleSessionSelectChange.bind(this);
    this.handleStudentSelectChange = this.handleStudentSelectChange.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }
  handleSelectChange(event, data) {
    this.setState({
      [data.name]: data.value
    });
  }
  handleSessionSelectChange(event, data) {
    this.setState({
      [data.name]: data.value
    });

    this.props.getStudentsBySession(data.value);
  }
  handleStudentSelectChange(event, data) {
    this.setState({
      [data.name]: data.value
    });

    this.props.getSubjectsBySessionAndStudent(this.state.sessionId, data.value);
  }
  handleSubmit(event) {
    this.props.onSave(this.state.sessionId, this.state.studentId, this.state.subjectId, this.state.mark);
    event.preventDefault();
  }
  componentDidMount() {
      this.props.getAllSessions();
  }
  renderSessionSelect() {
    const {isFetchingSession, allSessions} = this.props;
    let sessionOptions = [];

    if (!isFetchingSession) {
      sessionOptions = allSessions.map(session => {
        return {key: session.id, text:`${session.name} - ${session.yearOfSession}`, value: session.id}
      })
    }
    return <Form.Field>
      <Select
        options={sessionOptions}
        placeholder='Сессия'
        onChange={this.handleSessionSelectChange}
        name={"sessionId"}
      />
    </Form.Field>;
  }
  renderStudentSelect() {
    const {isFetchingStudents, students} = this.props;
    let studentOptions = [];

    if (!isFetchingStudents) {
      studentOptions = students.map(student => {
        return {key: student.id, text:`${student.lastName} ${student.firstName} ${student.middleName}`, value: student.id}
      })
    }
    // let studentSelectDisabled = false;
    return <Form.Field>
      <Select
        // disabled={studentSelectDisabled}
        options={studentOptions}
        placeholder='Студент'
        defaultValue={this.state.groupId}
        onChange={this.handleStudentSelectChange}
        name={"studentId"}
      />
    </Form.Field>;
  }
  renderSubjectSelect() {
    const {isFetchingSubject, subjects} = this.props;
    let subjectOptions = [];

    if (!isFetchingSubject) {
      subjectOptions = subjects.map(subject => {
        return {key: subject.id, text:`${subject.name}`, value: subject.id}
      })
    }
    return <Form.Field>
      <Select
        options={subjectOptions}
        placeholder='Предмет'
        defaultValue={this.state.groupId}
        onChange={this.handleSelectChange}
        name={"subjectId"}
      />
    </Form.Field>;
  }
  render() {
    return(
      <div>
      {
        this.props.isFetchingSession ?
          <Loader active inline />
          :
          <Form>
            {this.renderSessionSelect()}
            {this.renderStudentSelect()}
            {this.renderSubjectSelect()}
            <Form.Field>
              <label>Оценка</label>
              <input
                placeholder='Оценка'
                value={this.state.groupNumber}
                onChange={this.handleInputChange}
                name={"mark"}
              />
            </Form.Field>
            <Button
              type='submit'
              onClick={this.handleSubmit}
            >Добавить</Button>
          </Form>
      }
      </div>
    )
  }
}

MarkForm.propTypes = {
  allSessions: PropTypes.array,
  isFetchingSession: PropTypes.bool,
  students: PropTypes.array,
  isFetchingStudents: PropTypes.bool,
  subjects: PropTypes.array,
  isFetchingSubjects: PropTypes.bool,
  getAllSessions: PropTypes.func,
  getStudentsBySession: PropTypes.func,
  getSubjectsBySessionAndStudent: PropTypes.func,
  onSave: PropTypes.func,
};
