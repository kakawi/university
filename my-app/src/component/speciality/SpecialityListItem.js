import React from 'react';
import { Table, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom';

const SpecialityListItem = ({ speciality }) =>
  <Table.Row>
    <Table.Cell>
      {speciality.id}
    </Table.Cell>
    <Table.Cell>
      {speciality.name}
    </Table.Cell>
    <Table.Cell>
      {speciality.department.name}
    </Table.Cell>
    <Table.Cell>
      <Button
        content={"Просмотреть"}
        as={Link}
        to={"/specialities/" + speciality.id}
      />
    </Table.Cell>
  </Table.Row>
;

export default SpecialityListItem;
