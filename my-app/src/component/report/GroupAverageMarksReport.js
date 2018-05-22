import React from 'react'
import { Loader, Table, Select } from 'semantic-ui-react'
import FacultyApi from "../../api/FacultyApi";

export default class GroupAverageMarksReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      facultyId: '',
      allFaculties: [],
      isFetchingFaculties: true
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  componentDidMount() {
    FacultyApi.getFaculties().then(sessions => {
      this.setState({
        allFaculties: sessions,
        isFetchingFaculties: false
      })
    });
  }
  handleSelectChange(event, data) {
    this.setState({
      [data.name]: data.value
    });
    this.props.getGroupAverageMarksReport(this.props.sessionId, data.value)
  }
  renderReport(report) {
    const {isFetchingReport, data} = report;
    return (<div>
      {isFetchingReport ?
        <Loader active inline />
        :
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                Номер группы
              </Table.HeaderCell>
              <Table.HeaderCell>
                Средний бал
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
          {row.groupNumber}
        </Table.Cell>
        <Table.Cell>
          {row.averageMark}
        </Table.Cell>
      </Table.Row>
    )
  }
  render() {
    const {facultyId, allFaculties, isFetchingFaculties} = this.state;
    let facultyOptions = [];
    if (!isFetchingFaculties) {
      facultyOptions = allFaculties.map(faculty => {
        return {key: faculty.id, text: faculty.name, value: faculty.id}
      })
    }
    return(
      <div>
        <Select
          fluid
          options={facultyOptions}
          placeholder='Факультет'
          defaultValue={facultyId}
          onChange={this.handleSelectChange}
          name={"facultyId"}
        />
        {facultyId && this.renderReport(this.props.report)}
      </div>
    )
  }
}
