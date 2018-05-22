import React from 'react'
import { Loader } from 'semantic-ui-react'
import DepartmentList from '../department/DepartmentList';

export default class Faculty extends React.Component {
  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.getFaculty(id);
  }
  render() {

    return(
      <div>
        {
          this.props.isFetched ?
            <div>
              {this.props.faculty.id} - {this.props.faculty.name}
              <DepartmentList cancelFetch={true} departments={this.props.faculty.departments}/>
            </div>
            :
            <Loader active inline />
        }
      </div>
    )
  }
}
