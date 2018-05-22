import React from 'react'
import PropTypes from 'prop-types';
import {Select, Form, Button, Loader, Modal, Dimmer, Input} from 'semantic-ui-react'

export default class MarkFormPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMarkId: '',
      sessionId: '',
      studentId: '',
      subjectId: '',
      mark: '',
      currentMark: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSessionSelectChange = this.handleSessionSelectChange.bind(this);
    this.handleStudentSelectChange = this.handleStudentSelectChange.bind(this);
    this.renderNewForm = this.renderNewForm.bind(this);
    this.renderEditForm = this.renderEditForm.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.currentMark.id ? nextProps.currentMark.id : '',
      mark: nextProps.currentMark.mark ? nextProps.currentMark.mark : '',
      currentMark: nextProps.currentMark
    });
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
    event.preventDefault();
    const {actionType} = this.props;
    if (actionType === 'Add') {
      this.props.onSaveClick(this.state.sessionId, this.state.studentId, this.state.subjectId, this.state.mark);
    } else {
      this.props.onEditClick(this.state.currentMarkId, this.state.mark);
    }
  }

  renderSessionSelect() {
    const {isFetchingSession, allSessions} = this.props;
    let sessionOptions = [];

    if (!isFetchingSession) {
      sessionOptions = allSessions.map(session => {
        return {key: session.id, text: `${session.name} - ${session.yearOfSession}`, value: session.id}
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
        return {
          key: student.id,
          text: `${student.lastName} ${student.firstName} ${student.middleName}`,
          value: student.id
        }
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
        return {key: subject.id, text: `${subject.name}`, value: subject.id}
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

  renderNewForm() {
    return (<Form>
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
    );
  }

  renderEditForm() {
    const {schedule, student} = this.state.currentMark;
    const {subject, session} = schedule;
    return (
      <Form>
        <Input placeholder={`${student.lastName} ${student.firstName} ${student.middleName}`} disabled />
        <Input placeholder={session.name} disabled />
        <Input placeholder={subject.name} disabled />
        <Form.Field>
          <label>Оценка</label>
          <input
            placeholder='Оценка'
            value={this.state.mark}
            onChange={this.handleInputChange}
            name={"mark"}
          />
        </Form.Field>
        <Button
          type='submit'
          onClick={this.handleSubmit}
        >Добавить</Button>
      </Form>
    )
  }

  render() {
    const {
      isLoading,
      isOpenForm,
      onCancelClick,
      actionType
    } = this.props;

    let form;
    if (actionType === "Edit") {
      form = this.renderEditForm;
    } else {
      form = this.renderNewForm;
    }

    return (
      <Modal
        open={isOpenForm}
        onClose={onCancelClick}
      >
        <Modal.Header>Редактировать Оценку</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <div>
              {
                !isOpenForm || isLoading ?
                  <Dimmer active inverted>
                    <Loader active inline='centered'/>
                  </Dimmer>
                  :
                  form()
              }
            </div>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red'
                  type='submit'
                  onClick={onCancelClick}
          >Отменить</Button>
          <Button color='green'
                  type='submit'
                  onClick={this.handleSubmit}
          >Сохранить</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

MarkFormPopup.propTypes = {
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
