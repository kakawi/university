import React from 'react';
import SessionListItem from './SessionListItem';
import { Table } from 'semantic-ui-react'

export default class SessionList extends React.Component {
  componentDidMount() {
    if (!this.props.cancelFetch) {
      this.props.getSessions();
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
                Год
              </Table.HeaderCell>
              <Table.HeaderCell>
                Статус
              </Table.HeaderCell>
              <Table.HeaderCell>
                Действия
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.sessions.map((session) =>
              <SessionListItem
                key={session.id}
                session={session}
              />
            )}
          </Table.Body>
        </Table>
    )
  }
}
