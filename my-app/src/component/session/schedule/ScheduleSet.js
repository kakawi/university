import React from 'react'
// import { Loader } from 'semantic-ui-react'
import { Button, Form, Modal, Select } from 'semantic-ui-react'
import { Table } from 'semantic-ui-react'

export default class ScheduleSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectId: '',
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  componentDidMount() {
    const {
      idCurrentSet,
    } = this.props.currentSession;

    this.props.getSubjectBySessionAndSet(this.props.currentSession.session.id, idCurrentSet);
    this.props.getSubjects();
  }
  handleSelectChange(event, data) {
    this.setState({
      [data.name]: data.value
    });
  }

  render() {
    const {subjectsForSet, isSubjectsFetched, idCurrentSet} = this.props.currentSession;
    const {allSubjects} = this.props;
    let subjectsOptions;
    if (isSubjectsFetched && allSubjects.isFetched) {
      subjectsOptions = allSubjects.items.filter(item => {
        return subjectsForSet.map(s => s.id).indexOf(item.id) === -1
      }).map(subject => {
        return {key: subject.id, text: subject.name, value: subject.id}
      });
    }

    return(
      <Modal open={true}
      onClose={this.props.onCloseSet}
      >
        <Modal.Header>Экзамены</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {isSubjectsFetched ?
              (<div>
                  <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>
                        ID
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        Название
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {subjectsForSet.map((subject) => {
                      return  <Table.Row key={subject.id}>
                        <Table.Cell>
                          {subject.id}
                        </Table.Cell>
                        <Table.Cell>
                          {subject.name}
                        </Table.Cell>
                      </Table.Row>

                    })
                    }
                  </Table.Body>
                </Table>
                  {isSubjectsFetched ?
                    <Form>
                      <Form.Field>
                        <label>Год набора</label>
                        <Select
                          options={subjectsOptions}
                          placeholder='Предмет'
                          onChange={this.handleSelectChange}
                          name={"subjectId"}
                        />
                      </Form.Field>

                      <Button
                        type={"submit"}
                        onClick={() => this.props.addSubjectInSession(idCurrentSet, this.state.subjectId)}
                        content={"Добавить предмет"}
                      />
                    </Form>
                    :
                    <div>Loading Subjects...</div>
                  }
                </div>
              )
              : <div>Loading</div>
              }
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}
