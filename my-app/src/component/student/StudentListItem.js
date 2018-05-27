import React from 'react';
import { Table, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import * as constants from '../../config/constants';
import {Label} from 'semantic-ui-react'

const StudentListItem = ({ student }) =>
  <Table.Row>
    <Table.Cell>
      {student.id}
    </Table.Cell>
    <Table.Cell>
      {student.lastName}
    </Table.Cell>
    <Table.Cell>
      {student.firstName}
    </Table.Cell>
    <Table.Cell>
      {student.middleName}
    </Table.Cell>
    <Table.Cell>
      {student.group.groupNumber}
    </Table.Cell>
    <Table.Cell>
      {student.isLocal
        ? <Label as='a' color="green" tag>Да</Label>
        : <Label as='a' color="teal" tag>Нет</Label>
      }
    </Table.Cell>
    <Table.Cell>
      {student.isGetScholarship
        ? <Label as='a' color={"green"} tag>{100 + student.premium}%</Label>
        : <Label as='a' tag>Не получает</Label>
      }
    </Table.Cell>
    <Table.Cell>
      <Button
        content={ "Просмотреть" }
        as={ Link }
        to={ `${constants.STUDENTS_PAGE_PATH}/${student.id}` }
      />
    </Table.Cell>
  </Table.Row>
;

export default StudentListItem;
