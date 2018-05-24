import React from 'react'
import {Button, Form, Modal, Select} from 'semantic-ui-react'
import SessionApi from '../../../api/SessionApi';
import SubjectApi from '../../../api/SubjectApi';
import SetApi from '../../../api/SetApi';

export default class ScheduleAddNew extends React.Component {
  state = {
    allSessions: [],
    allSubjects: [],
    allSets: [],
    sessionId: '',
    subjectId: '',
    setId: '',
    isDataReady: false
  };

  componentDidMount() {
    // get all sessions
    SessionApi.getSessions().then(sessions => {
      SubjectApi.getSubject().then(subjects => {
        SetApi.getSets().then(sets => {
          this.setState({
            allSessions: sessions,
            allSubjects: subjects,
            allSets: sets,
            isDataReady: true
          })
        })
      })
    })
  }

  handleSelectChange = (event, data) => {
    this.setState({
      [data.name]: data.value
    });
  };

  clear = () => {
    this.setState({
      allSessions: [],
      allSubjects: [],
      allSets: [],
      sessionId: [],
      subjectId: [],
      setId: [],
      isDataReady: false,
    });
  };
  onCancelClick = () => {
    this.clear();
    this.props.onClose();
  };

  render() {
    const {isDataReady, allSessions, allSets, allSubjects} = this.state;
    let subjectsOptions;
    let sessionOptions;
    let setOptions;

    if (isDataReady) {
      subjectsOptions = allSubjects.map(subject => {
        return {key: subject.id, text: subject.name, value: subject.id}
      });
      setOptions = allSets.map(set => {
        return {key: set.id, text: `${set.speciality.name} ${set.yearOfEstablishment}`, value: set.id}
      });
      sessionOptions = allSessions.map(subject => {
        return {key: subject.id, text: subject.name, value: subject.id}
      });
    }
    return (
      <Modal
        open={true}
        onClose={this.onCancelClick}
      >
        <Modal.Header>Экзамены</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {isDataReady ?
              (<div>
                  <Form>
                    <Form.Field>
                      <label>Набор групп</label>
                      <Select
                        options={setOptions}
                        placeholder='Набор групп'
                        onChange={this.handleSelectChange}
                        name={"setId"}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Предмет</label>
                      <Select
                        options={subjectsOptions}
                        placeholder='Предмет'
                        onChange={this.handleSelectChange}
                        name={"subjectId"}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Сессия</label>
                      <Select
                        options={sessionOptions}
                        placeholder='Сессия'
                        onChange={this.handleSelectChange}
                        name={"sessionId"}
                      />
                    </Form.Field>
                    <Button
                      type={"submit"}
                      onClick={() => this.props.addNewSubject(this.state.sessionId, this.state.setId, this.state.subjectId)}
                      content={"Добавить предмет"}
                    />
                  </Form>
                </div>
              )
              : <div>Loading...</div>
            }
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}
