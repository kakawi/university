import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/department_action';
import DepartmentForm from './DepartmentForm';
import FacultyApi from '../../api/FacultyApi';
import DepartmentApi from '../../api/DepartmentApi';

import {Modal} from 'semantic-ui-react'

class DepartmentFormContainer extends React.Component {
  state = {
    allFaculties: [],
    currentDepartment: {},
    isDataReady: false
  };

  componentDidMount() {
    FacultyApi.getFaculties().then(faculties => {
      const {departmentId} = this.props;
      if (departmentId) {
        DepartmentApi.getDepartment(departmentId).then(department => {
          this.setState({
            allFaculties: faculties,
            currentDepartment: department,
            isDataReady: true
          });
        })
      } else {
        this.setState({
          allFaculties: faculties,
          isDataReady: true
        });
      }
    });
  }

  close = () => {
    this.setState({
      allFaculties: [],
      isDataReady: false,
      currentDepartment: {}
    });
    this.props.onClose();
  };
  onCancelClick = () => {
    this.close();
  };

  render() {
    const {departmentId} = this.props;
    let headerMessage;
    if (departmentId) {
      headerMessage = 'Редактировать кафедру'
    } else {
      headerMessage = 'Добавить кафедру'
    }
    return (
        <Modal
          open={true}
          onClose={this.onCancelClick}
        >
          <Modal.Header>{headerMessage}</Modal.Header>
          <Modal.Content>
            {this.state.isDataReady ? <DepartmentForm
              onCancelClick={this.onCancelClick}
              department={this.state.currentDepartment}
              allFaculties={this.state.allFaculties}
              />
            :
            <div>Loading</div>
            }
          </Modal.Content>
        </Modal>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    departments: state.departments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    markActions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentFormContainer);
