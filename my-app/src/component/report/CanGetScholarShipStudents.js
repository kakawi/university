import React from 'react'
import { Loader, Table } from 'semantic-ui-react'

export default class CanGetScholarShipStudents extends React.Component {
  componentDidMount() {
    this.props.canGetScholarShipStudents(this.props.sessionId)
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
                ФИО
              </Table.HeaderCell>
              <Table.HeaderCell>
                Резидент
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
          {row.isLocal ? 'Да' : 'Нет'}
        </Table.Cell>
      </Table.Row>
    )
  }
  render() {
    return(
      <div>
        {this.renderReport(this.props.report)}
      </div>
    )
  }
}
