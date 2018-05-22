import React from 'react';
import SetListItem from './SetListItem';
import { Table } from 'semantic-ui-react'

export default class SetList extends React.Component {
  componentDidMount() {
    if (!this.props.cancelFetch) {
      this.props.getSets();
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
            {this.props.sets.map((set) =>
              <SetListItem
                key={set.id}
                set={set}
              />
            )}
          </Table.Body>
        </Table>
    )
  }
}
