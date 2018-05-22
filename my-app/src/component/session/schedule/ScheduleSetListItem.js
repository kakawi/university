import React from 'react';
import { Table, Button } from 'semantic-ui-react'

const ScheduleSetListItem = ({ set, onShowSet }) =>
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
        content={ "Просмотреть" }
        onClick={onShowSet}
      />
    </Table.Cell>
  </Table.Row>
;

export default ScheduleSetListItem;
