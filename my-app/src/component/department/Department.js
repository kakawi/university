import React from 'react'
import { Loader } from 'semantic-ui-react'

export default class Department extends React.Component {
  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.getDepartment(id);
  }
  render() {
    return(
      <div>
        {
          this.props.isFetched ?
            <div>{this.props.department.id} - {this.props.department.name}</div>
            :
            <Loader active inline />
        }
      </div>
    )
  }
}
