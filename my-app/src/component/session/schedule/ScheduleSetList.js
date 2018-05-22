import React from 'react';
import ScheduleSetListItem from './ScheduleSetListItem';
import { Table } from 'semantic-ui-react'

export default class ScheduleSetList extends React.Component {
  render() {
    return(
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              ID
            </Table.HeaderCell>
            <Table.HeaderCell>
              Специальность
            </Table.HeaderCell>
            <Table.HeaderCell>
              Год
            </Table.HeaderCell>
            <Table.HeaderCell>
              Действия
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.sets.map((set) =>
            <ScheduleSetListItem
              key={set.id}
              set={set}
              onShowSet={() => {
                this.props.onShowSet(set.id)
              }}
            />
          )}
        </Table.Body>
      </Table>
    )
  }
}
