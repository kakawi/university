import React from 'react';
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import * as constants from '../config/constants';


export default class Navbar extends React.Component {
  render() {
    return (
      <Menu>
        <Menu.Item
          name="Главная"
          as={NavLink}
          to={constants.HOME_PATH}
          exact
        />
        <Menu.Item
          name="Факультеты"
          as={NavLink}
          to={constants.FACULTIES_PAGE_PATH}
        />
        <Menu.Item
          name="Кафедры"
          as={NavLink}
          to={constants.DEPARTMENTS_PAGE_PATH}
        />
        <Menu.Item
          name="Специальности"
          as={NavLink}
          to={constants.SPECIALITIES_PAGE_PATH}
        />
        <Menu.Item
          name="Наборы"
          as={NavLink}
          to={constants.SETS_PAGE_PATH}
        />
        <Menu.Item
          name="Группы"
          as={NavLink}
          to={constants.GROUPS_PAGE_PATH}
        />
        <Menu.Item
          name="Студенты"
          as={NavLink}
          to={constants.STUDENTS_PAGE_PATH}
        />
        <Menu.Item
          name="Оценки"
          as={NavLink}
          to={"/marks"}
        />
        <Menu.Item
          name="Предметы"
          as={NavLink}
          to={constants.SUBJECTS_PAGE_PATH}
        />
        <Menu.Item
          name="Сессия"
          as={NavLink}
          to={constants.SESSIONS_PAGE_PATH}
        />
        <Menu.Item
          name="Отчеты"
          as={NavLink}
          to={"/reports"}
        />
      </Menu>
    );
  }
}
