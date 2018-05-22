import React from 'react';
import MarkListItem from './MarkListItem';
import { Table } from 'semantic-ui-react'

export default class MarkList extends React.Component {
  componentDidMount() {
    if (!this.props.cancelFetch) {
      this.props.getMarks();
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
                Сессия
              </Table.HeaderCell>
              <Table.HeaderCell>
                Предмет
              </Table.HeaderCell>
              <Table.HeaderCell>
                Студент
              </Table.HeaderCell>
              <Table.HeaderCell>
                Оценка
              </Table.HeaderCell>
              <Table.HeaderCell>
                Действия
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.marks.map((mark) =>
              <MarkListItem
                key={mark.id}
                mark={mark}
                onClickEditMark={this.props.onClickEditMark}
                onClickDeleteMark={this.props.onClickDeleteMark}
              />
            )}
          </Table.Body>
        </Table>
    )
  }
}
