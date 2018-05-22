import React from 'react';
import StudentListItem from './StudentListItem';
import { Table } from 'semantic-ui-react'

export default class StudentList extends React.Component {
  componentDidMount() {
    if (!this.props.cancelFetch) {
      this.props.getStudents();
    }
  }
  render() {
    return(
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                ID
              </Table.HeaderCell>
              <Table.HeaderCell>
                Фамилия
              </Table.HeaderCell>
              <Table.HeaderCell>
                Имя
              </Table.HeaderCell>
              <Table.HeaderCell>
                Отчество
              </Table.HeaderCell>
              <Table.HeaderCell>
                Номер группы
              </Table.HeaderCell>
              <Table.HeaderCell>
                Действия
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.students.map((student) =>
              <StudentListItem
                key={student.id}
                student={student}
              />
            )}
          </Table.Body>
        </Table>
    )
  }
}
