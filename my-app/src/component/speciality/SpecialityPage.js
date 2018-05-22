import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/speciality_action';
import {Route, Switch} from 'react-router-dom';
import SpecialityList from './SpecialityList';
import Speciality from './Speciality';

class SpecialityPage extends React.Component {
  render() {
    return(
      <Switch>
        <Route exact path="/specialities" render={
          (props) =>
            <SpecialityList
              {...props}
              specialities={this.props.specialities.all.items}
              getSpecialities={this.props.markActions.getSpecialities}
            />
        }/>
        <Route path="/specialities/:id" render={
          (props) =>
            <Speciality
              {...props}
              getSpeciality={this.props.markActions.getSpeciality}
              speciality={this.props.specialities.currentSpeciality.speciality}
              isFetched={this.props.specialities.currentSpeciality.isFetched}
            />
        }/>
      </Switch>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    specialities: state.specialities
  };
}

function mapDispatchToProps(dispatch) {
  return {
    markActions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecialityPage);
