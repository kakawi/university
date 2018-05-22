import React from 'react'
import { Loader } from 'semantic-ui-react'

export default class Set extends React.Component {
  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.getSet(id);
  }
  render() {
    return(
      <div>
        {
          this.props.isFetched ?
            <div>{this.props.set.id} - {this.props.set.yearOfEstablishment}</div>
            :
            <Loader active inline />
        }
      </div>
    )
  }
}
