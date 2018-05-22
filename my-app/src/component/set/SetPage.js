import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/set_action';
import {Route, Switch} from 'react-router-dom';
import SetList from './SetList';
import Set from './Set';

class SetPage extends React.Component {
  render() {
    return(
      <Switch>
        <Route exact path="/sets" render={
          (props) =>
            <SetList
              {...props}
              sets={this.props.sets.all.items}
              getSets={this.props.markActions.getSets}
            />
        }/>
        <Route path="/sets/:id" render={
          (props) =>
            <Set
              {...props}
              getSet={this.props.markActions.getSet}
              set={this.props.sets.currentSet.set}
              isFetched={this.props.sets.currentSet.isFetched}
            />
        }/>
      </Switch>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    sets: state.sets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    markActions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetPage);
