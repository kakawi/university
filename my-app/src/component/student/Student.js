import React from 'react'
import { Loader } from 'semantic-ui-react'

export default class Student extends React.Component {
  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.getStudent(id);
  }
  render() {
    return(
      <div>
        {
          this.props.isFetched ?
            <div>{this.props.student.id} - {this.props.student.name}</div>
            :
            <Loader active inline />
        }
      </div>
    )
  }
}
