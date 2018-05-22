import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/faculty_action';
import {Route, Switch} from 'react-router-dom';
import FacultyList from './FacultyList';
import Faculty from './Faculty';
import FacultyApi from '../../api/FacultyApi';
import FacultyForm from './FacultyForm';

class FacultyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenForm: false,
      isLoading: false,
      actionType: null,
      faculty: {},
    };

    this.onClickEditFaculty = this.onClickEditFaculty.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
  }
  onCancelClick() {
    this.setState({
      isOpenForm: false,
      faculty: {}
    })
  }
  onSaveClick(newFaculty) {
    this.setState({
      isOpenForm: false,
      faculty: {}
    });
    this.props.actions.onSaveClick(newFaculty);
  }
  onEditClick(updatedFaculty) {
    this.setState({
      isOpenForm: false,
      faculty: {}
    });
    this.props.actions.onEditClick(updatedFaculty);
  }
  onClickEditFaculty(idFaculty) {
    this.setState({
      isOpenForm: true,
      actionType: 'Edit',
      isLoading: true
    });
    FacultyApi
      .getFaculty(idFaculty)
      .then((faculty) => {
        this.setState({
          isLoading: false,
          faculty
        })
      })
  }
  render() {
    return(
      <div>
        <Switch>
          <Route exact path="/faculties" render={
            (props) =>
              <FacultyList
                {...props}
                faculties={this.props.faculties.all}
                getFaculties={this.props.actions.getFaculties}
                changeLocation={this.props.changeLocation}
                onClickEditFaculty={this.onClickEditFaculty}
              />
          }/>
          <Route path="/faculties/:id" render={
            (props) =>
              <Faculty
                {...props}
                getFaculty={this.props.actions.getFaculty}
                faculty={this.props.faculties.currentFaculty.faculty}
                isFetched={this.props.faculties.currentFaculty.isFetched}
              />
          }/>
        </Switch>
        <FacultyForm
          isLoading={this.state.isLoading}
          actionType={this.state.actionType}
          faculty={this.state.faculty}
          isOpenForm={this.state.isOpenForm}
          onCancelClick={this.onCancelClick}
          onSaveClick={this.onSaveClick}
          onEditClick={this.onEditClick}
        />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    faculties: state.faculties
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FacultyPage);
