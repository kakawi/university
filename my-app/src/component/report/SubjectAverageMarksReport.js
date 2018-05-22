import React from 'react'
import { Loader, Table } from 'semantic-ui-react'

export default class SubjectAverageMarksReport extends React.Component {
  componentDidMount() {
    this.props.getSubjectAverageMarksReport(this.props.sessionId)
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
                Название предмета
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
          {row.subjectName}
        </Table.Cell>
        <Table.Cell>
          {row.averageMark}
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
