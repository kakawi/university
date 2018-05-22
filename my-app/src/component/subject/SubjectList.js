import React from 'react';
import SubjectListItem from './SubjectListItem';
import { Table } from 'semantic-ui-react'

export default class SubjectList extends React.Component {
  componentDidMount() {
    if (!this.props.cancelFetch) {
      this.props.getSubjects();
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
                Действия
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.subjects.map((subject) =>
              <SubjectListItem
                key={subject.id}
                subject={subject}
              />
            )}
          </Table.Body>
        </Table>
    )
  }
}
