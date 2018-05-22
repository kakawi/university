import React from 'react';
import { Table, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom';

const FacultyListItem = ({ faculty, onClickEditFaculty }) =>
  <Table.Row onDoubleClick={() => onClickEditFaculty(faculty.id)}>
    <Table.Cell>
      {faculty.id}
    </Table.Cell>
    <Table.Cell>
      {faculty.name}
    </Table.Cell>
    <Table.Cell>
      <Button
        content={"Просмотреть"}
        as={Link}
        to={"faculties/" + faculty.id}
      />
    </Table.Cell>
  </Table.Row>
;

export default FacultyListItem;
