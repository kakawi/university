import React from 'react';
import SpecialityListItem from './SpecialityListItem';
import { Table } from 'semantic-ui-react'

export default class SpecialityList extends React.Component {
  componentDidMount() {
    if (!this.props.cancelFetch) {
      this.props.getSpecialities();
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
                Кафедра
              </Table.HeaderCell>
              <Table.HeaderCell>
                Действия
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.specialities.map((speciality) =>
              <SpecialityListItem
                key={speciality.id}
                speciality={speciality}
              />
            )}
          </Table.Body>
        </Table>
    )
  }
}
