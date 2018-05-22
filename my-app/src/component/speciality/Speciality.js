import React from 'react'
import { Loader } from 'semantic-ui-react'

export default class Speciality extends React.Component {
  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.getSpeciality(id);
  }
  render() {
    return(
      <div>
        {
          this.props.isFetched ?
            <div>{this.props.speciality.id} - {this.props.speciality.name}</div>
            :
            <Loader active inline />
        }
      </div>
    )
  }
}
