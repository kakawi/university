import React from 'react';
import { Table, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import * as constants from '../../config/constants';

const MarkListItem = ({ mark, onClickEditMark, onClickDeleteMark }) => {
  const session = mark.schedule.session;
  const subject = mark.schedule.subject;
  const student = mark.student;
  return (
  <Table.Row
    onDoubleClick={() => onClickEditMark(mark.id)}
  >
    <Table.Cell>
      {mark.id}
    </Table.Cell>
    <Table.Cell>
      {session.name} {session.yearOfSession}
    </Table.Cell>
    <Table.Cell>
      {subject.name}
    </Table.Cell>
    <Table.Cell>
      {student.lastName} {student.firstName} {student.middleName}
    </Table.Cell>
    <Table.Cell>
      {mark.mark}
    </Table.Cell>
    <Table.Cell>
      <Button
        content={ "Просмотреть" }
        as={ Link }
        to={ `${constants.STUDENTS_PAGE_PATH}/${mark.id}` }
      />
      <Button
        content={"Удалить"}
        onClick={() => onClickDeleteMark(mark.id)}
      />
    </Table.Cell>
  </Table.Row>)
}
;

export default MarkListItem;
