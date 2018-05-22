import React from 'react'
import { Loader, Table, Select } from 'semantic-ui-react'
import DepartmentApi from "../../api/DepartmentApi";

export default class DontPassStudentsReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departmentId: '',
      allDepartments: [],
      isFetchingDepartments: true
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  componentDidMount() {
    DepartmentApi.getDepartments().then(sessions => {
      this.setState({
        allDepartments: sessions,
        isFetchingDepartments: false
      })
    });
  }
  handleSelectChange(event, data) {
    this.setState({
      [data.name]: data.value
    });
    this.props.getDontPassStudentsReport(this.props.sessionId, data.value)
  }
  renderReport(report) {
    const {isFetchingReport, name, data} = report;
    return (<div>
      {isFetchingReport || name !== 'dontPassStudents' ?
        <Loader active inline />
        :
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                ФИО
              </Table.HeaderCell>
              <Table.HeaderCell>
                Название предмета
              </Table.HeaderCell>
              <Table.HeaderCell>
                Номер группы
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map((row, index) =>
              this.renderItem(row, index)
            )}
          </Table.Body>
        </Table>
      }
    </div>);
  }
  renderItem(row, key) {
    return (
      <Table.Row key={key}>
        <Table.Cell>
          {row.lastName} {row.firstName} {row.middleName}
        </Table.Cell>
        <Table.Cell>
          {row.subjectName}
        </Table.Cell>
        <Table.Cell>
          {row.groupNumber}
        </Table.Cell>
      </Table.Row>
    )
  }
  render() {
    const {departmentId, allDepartments, isFetchingDepartments} = this.state;
    let departmentOptions = [];
    if (!isFetchingDepartments) {
      departmentOptions = allDepartments.map(department => {
        return {key: department.id, text: department.name, value: department.id}
      })
    }
    return(
      <div>
        <Select
          fluid
          options={departmentOptions}
          placeholder='Кафедра'
          defaultValue={departmentId}
          onChange={this.handleSelectChange}
          name={"departmentId"}
        />
        {departmentId && this.renderReport(this.props.report)}
      </div>
    )
  }
}
