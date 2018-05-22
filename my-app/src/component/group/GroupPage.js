import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/group_action';
import * as setActions from '../../actions/set_action';
import {Route, Switch, Link} from 'react-router-dom';
import GroupList from './GroupList';
import Group from './Group';
import GroupForm from "./GroupForm";
import { Button } from 'semantic-ui-react'

class GroupPage extends React.Component {
  render() {
    return(
      <div>
        <Button
          as={Link}
          to={"/groups/create"}
          content={"Новая"}
        />

        <Switch>
          <Route exact path="/groups" render={
            (props) =>
              <GroupList
                {...props}
                groups={this.props.groups.all.items}
                getGroups={this.props.markActions.getGroups}
                isFetched={this.props.groups.all.isFetched}
              />
          }/>
          <Route path="/groups/create" render={
            (props) =>
              <GroupForm
                {...props}
                sets={this.props.sets.all.items}
                getSets={this.props.setActions.getSets}
                isFetched={this.props.sets.all.isFetched}
                onSave={this.props.markActions.onSave}
              />
          }
          />
          <Route path="/groups/:id" render={
            (props) =>
              <Group
                {...props}
                getGroup={this.props.markActions.getGroup}
                group={this.props.groups.currentGroup.group}
                isFetched={this.props.groups.currentGroup.isFetched}
              />
          }/>
        </Switch>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    groups: state.groups,
    sets: state.sets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    markActions: bindActionCreators(actions, dispatch),
    setActions: bindActionCreators(setActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);
