import React from 'react';
import { Table, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom';

const SetListItem = ({ set }) =>
  <Table.Row>
    <Table.Cell>
      {set.id}
    </Table.Cell>
    <Table.Cell>
      {set.speciality.name}
    </Table.Cell>
    <Table.Cell>
      {set.yearOfEstablishment}
    </Table.Cell>
    <Table.Cell>
      <Button
        content={"Просмотреть"}
        as={Link}
        to={"/sets/" + set.id}
      />
    </Table.Cell>
  </Table.Row>
;

export default SetListItem;
