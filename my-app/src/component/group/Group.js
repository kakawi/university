import React from 'react'
import { Loader } from 'semantic-ui-react'

export default class Group extends React.Component {
  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.getGroup(id);
  }
  render() {
    return(
      <div>
        {
          this.props.isFetched ?
            <div>{this.props.Group.id} - {this.props.Group.name}</div>
            :
            <Loader active inline />
        }
      </div>
    )
  }
}
