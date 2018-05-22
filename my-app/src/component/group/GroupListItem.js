import React from 'react';
import { Table, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom';

const GroupListItem = ({ group }) =>
  <Table.Row>
    <Table.Cell>
      {group.id}
    </Table.Cell>
    <Table.Cell>
      {group.groupNumber}
    </Table.Cell>
    <Table.Cell>
      {group.set.speciality.name}
    </Table.Cell>
    <Table.Cell>
      {group.set.yearOfEstablishment}
    </Table.Cell>
    <Table.Cell>
      <Button
        content={"Просмотреть"}
        as={Link}
        to={"/groups/" + group.id}
      />
    </Table.Cell>
  </Table.Row>
;

export default GroupListItem;
