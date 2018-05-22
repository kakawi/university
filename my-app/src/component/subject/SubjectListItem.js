import React from 'react';
import { Table, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import * as constants from '../../config/constants';

const SubjectListItem = ({ subject }) =>
  <Table.Row>
    <Table.Cell>
      {subject.id}
    </Table.Cell>
    <Table.Cell>
      {subject.name}
    </Table.Cell>
    <Table.Cell>
      <Button
        content={ "Просмотреть" }
        as={ Link }
        to={ `${constants.SUBJECTS_PAGE_PATH}/${subject.id}` }
      />
    </Table.Cell>
  </Table.Row>
;

export default SubjectListItem;
