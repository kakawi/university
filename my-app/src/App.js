import React from 'react';
import {connect} from 'react-redux';
import {getTracks} from './actions/tracks';
import {getFaculties} from './actions/faculty_action';



class App extends React.Component {
  addTrack() {
    this.props.onAddTrack(this.trackInput.value);
    this.trackInput.value = '';
  }
  render() {
    return (
      <div>

      </div>
    )
  }
}

export default connect(
  mapStateToProps => ({
    tracks: mapStateToProps.tracks,
    faculties: mapStateToProps.faculties
  }),
  dispatch => ({
    onAddTrack: (trackName) => {
      dispatch({type:'ADD_TRACK', payload:trackName});
    },
    onGetTracks: () => {
      dispatch(getTracks());
    },
    onGetFaculties: () => {
      dispatch(getFaculties());
    }
  })
)(App);