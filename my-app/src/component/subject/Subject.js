import React from 'react'
import { Loader } from 'semantic-ui-react'

export default class Subject extends React.Component {
  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.getSubject(id);
  }
  render() {
    return(
      <div>
        {
          this.props.isFetched ?
            <div>{this.props.subject.id} - {this.props.subject.name}</div>
            :
            <Loader active inline />
        }
      </div>
    )
  }
}
