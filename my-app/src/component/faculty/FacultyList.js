import React from 'react';
import FacultyListItem from './FacultyListItem';
import { Table } from 'semantic-ui-react'

export default class FacultyList extends React.Component {
  componentDidMount() {
    this.props.getFaculties();
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
                Название
              </Table.HeaderCell>
              <Table.HeaderCell>
                Действия
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.faculties.map((faculty) =>
              <FacultyListItem
                key={faculty.id}
                faculty={faculty}
                onClickEditFaculty={this.props.onClickEditFaculty}
              />
            )}
          </Table.Body>
        </Table>
    )
  }
}
