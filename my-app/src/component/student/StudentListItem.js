import React from 'react';
import { Table, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import * as constants from '../../config/constants';

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
      <Button
        content={ "Просмотреть" }
        as={ Link }
        to={ `${constants.STUDENTS_PAGE_PATH}/${student.id}` }
      />
    </Table.Cell>
  </Table.Row>
;

export default StudentListItem;
