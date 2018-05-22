import React from 'react';
import DepartmentListItem from './DepartmentListItem';
import { Table } from 'semantic-ui-react'

export default class DepartmentList extends React.Component {
  componentDidMount() {
    if (!this.props.cancelFetch) {
      this.props.getDepartments();
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
                Название
              </Table.HeaderCell>
              <Table.HeaderCell>
                Факультет
              </Table.HeaderCell>
              <Table.HeaderCell>
                Действия
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.departments.map((department) =>
              <DepartmentListItem
                key={department.id}
                department={department}
                onEditClick={this.props.onEditClick}
              />
            )}
          </Table.Body>
        </Table>
    )
  }
}
