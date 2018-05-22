import React from 'react';
import { Table, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import * as constants from '../../config/constants';

const SessionListItem = ({ session }) =>
  <Table.Row>
    <Table.Cell>
      {session.id}
    </Table.Cell>
    <Table.Cell>
      {session.name}
    </Table.Cell>
    <Table.Cell>
      {session.yearOfSession}
    </Table.Cell>
    <Table.Cell>
      {session.isFinished ? 'Завершена' : 'В процессе'}
    </Table.Cell>
    <Table.Cell>
      <Button
        content={ "Расписание" }
        as={ Link }
        to={ `${constants.SESSIONS_PAGE_PATH}/${session.id}` }
      />
    </Table.Cell>
  </Table.Row>
;

export default SessionListItem;
