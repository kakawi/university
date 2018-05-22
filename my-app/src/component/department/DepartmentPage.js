import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/department_action';
import {Route, Switch} from 'react-router-dom';
import DepartmentList from './DepartmentList';
import Department from './Department';
import {Button} from 'semantic-ui-react'
import DepartmentFormContainer from './DepartmentFormContainer';

class DepartmentPage extends React.Component {
  state = {
    openForm: false,
    departmentId: ''
  };
  onNewClick = (e) => this.setState({
    openForm: true
  });
  onClose = () => this.setState({
    openForm: false,
    departmentId: ''
  });
  onEditClick = (departmentId) =>
    this.setState({
      openForm: true,
      departmentId: departmentId
    });

  render() {
    const {openForm} = this.state;
    return (
      <div>
        <Button
          onClick={this.onNewClick}
          content="Добавить"
        />
        {openForm &&
        <DepartmentFormContainer
          departmentId={this.state.departmentId}
          onClose={this.onClose}
        />}
        <Switch>
          <Route exact path="/departments" render={
            (props) =>
              <DepartmentList
                {...props}
                departments={this.props.departments.all}
                getDepartments={this.props.markActions.getDepartments}
                onEditClick={this.onEditClick}
              />
          }/>
          <Route path="/departments/:id" render={
            (props) =>
              <Department
                {...props}
                getDepartment={this.props.markActions.getDepartment}
                department={this.props.departments.currentDepartment.department}
                isFetched={this.props.departments.currentDepartment.isFetched}
              />
          }/>
        </Switch>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentPage);
