import React from 'react';
import { Table, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom';

const DepartmentListItem = ({ department, onEditClick }) =>
  <Table.Row
    onDoubleClick={() => onEditClick(department.id)}
  >
    <Table.Cell>
      {department.id}
    </Table.Cell>
    <Table.Cell>
      {department.name}
    </Table.Cell>
    <Table.Cell>
      {department.faculty.name}
    </Table.Cell>
    <Table.Cell>
      <Button
        content={"Просмотреть"}
        as={Link}
        to={"/departments/" + department.id}
      />
    </Table.Cell>
  </Table.Row>
;

export default DepartmentListItem;
