import React from 'react';
import {Form, Button, Select} from 'semantic-ui-react'

class DepartmentForm extends React.Component {
  constructor(props) {
    super(props);
    const {department} = this.props;
    this.state = {
      isEdit: department.id,
      departmentId: department.id ? department.id : '',
      departmentName: department.name ? department.name : '',
      facultyId: department.faculty ? department.faculty.id : ''
    };
  }

  componentWillReceiveProps(nextProps) {
    debugger;
    // this.setState({
    //   departmentId: nextProps.,
    //   departmentName: nextProps.department.name ? nextProps.department.name : '',
    //   facultyId: nextProps.department.facultyId ? nextProps.department.facultyId : '',
    // });
  }

  handleInputChange = (event) => {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  };

  handleSelectChange = (event, data) => {
    this.setState({
      [data.name]: data.value
    });
  };

  render() {
    const {allFaculties} = this.props;
    const facultyOptions = allFaculties.map(faculty => {
      return {key: faculty.id, text: faculty.name, value: faculty.id}
    });
    return (
      <Form>
        <Form.Field>
          <label>Название кафедры</label>
          <input
            placeholder='Название кафедры'
            value={this.state.departmentName}
            onChange={this.handleInputChange}
            name={"departmentName"}
          />
        </Form.Field>
        <Form.Field>
          <Select
            options={facultyOptions}
            placeholder='Факультет'
            defaultValue={this.state.facultyId}
            onChange={this.handleSelectChange}
            name={"facultyId"}
          />
        </Form.Field>
        <Button
          type='submit'
          onClick={this.handleSubmit}
        >{this.state.isEdit ? "Редактировать" : "Добавить"}</Button>
      </Form>
    )
  }
}

export default DepartmentForm;
