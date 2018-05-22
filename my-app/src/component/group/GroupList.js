import React from 'react';
import GroupListItem from './GroupListItem';
import { Table } from 'semantic-ui-react'

export default class GroupList extends React.Component {
  componentDidMount() {
    if (!this.props.cancelFetch) {
      this.props.getGroups();
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
                Номер группы
              </Table.HeaderCell>
              <Table.HeaderCell>
                Специальность
              </Table.HeaderCell>
              <Table.HeaderCell>
                Год набора
              </Table.HeaderCell>
              <Table.HeaderCell>
                Действия
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.groups.map((group) =>
              <GroupListItem
                key={group.id}
                group={group}
              />
            )}
          </Table.Body>
        </Table>
    )
  }
}
