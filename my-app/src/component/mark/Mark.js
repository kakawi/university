import React from 'react'
import { Loader } from 'semantic-ui-react'

export default class Mark extends React.Component {
  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.getMark(id);
  }
  render() {
    return(
      <div>
        {
          this.props.isFetched ?
            <div>{this.props.mark.id} - {this.props.mark.name}</div>
            :
            <Loader active inline />
        }
      </div>
    )
  }
}
