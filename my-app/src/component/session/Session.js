import React from 'react'
import { Loader, Button, Header } from 'semantic-ui-react'
import ScheduleSetList from './schedule/ScheduleSetList';
import ScheduleSet from './schedule/ScheduleSet';

export default class Session extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: {}
    };

    this.onShowSet = this.onShowSet.bind(this);
    this.addSubjectInSession = this.addSubjectInSession.bind(this);
    this.onClickFinishButton = this.onClickFinishButton.bind(this);
    this.onClickCancelButton = this.onClickCancelButton.bind(this);
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.getSession(id);
    this.props.getSetsBySession(id);
  }
  onShowSet(idSet) {
    const {session} = this.props.currentSession;
    this.props.onShowSet(session.id, idSet);
  }
  addSubjectInSession(idSet, idSubject) {
    const {session} = this.props.currentSession;
    this.props.addSubjectInSession(session.id, idSet, idSubject);
  }
  onSave() {

  }
  renderFinishButton() {
    return (
      <Button
        type={"submit"}
        color='green'
        onClick={() => this.onClickFinishButton()}
      >Закончить сессию</Button>
    )
  }
  renderCancelButton() {
    return (
      <Button
        type={"submit"}
        color='red'
        onClick={() => this.onClickCancelButton()}
      >Отменить окончание сессии</Button>
    )
  }
  onClickFinishButton() {
    const currentSession = this.props.currentSession.session;
    currentSession.isFinished = true;
    this.props.updateSession(currentSession);
  }
  onClickCancelButton() {
    const currentSession = this.props.currentSession.session;
    currentSession.isFinished = false;
    this.props.updateSession(currentSession);
  }
  render() {
    const {
      session,
      isShowSet,
      isSessionFetched,
      isSetsFetched,
      setsForSession,
    } = this.props.currentSession;
    return(
      <div>
        {
          isSessionFetched ?
            <div>
              <Header as={"h2"}>{session.name} - {session.yearOfSession}</Header>
              {session.isFinished ? this.renderCancelButton() : this.renderFinishButton()}
              {isSetsFetched ?
                <ScheduleSetList
                  sets={setsForSession}
                  onShowSet={this.onShowSet}
                />
                : <div>Loading</div>}
              {isShowSet === true &&
                <ScheduleSet
                  currentSession={this.props.currentSession}
                  onCloseSet={this.props.onCloseSet}
                  getSubjectBySessionAndSet={this.props.getSubjectBySessionAndSet}
                  getSubjects={this.props.getSubjects}
                  addSubjectInSession={this.addSubjectInSession}
                  allSubjects={this.props.allSubjects}
                />
              }
            </div>
            :
            <Loader active inline />
        }
      </div>
    )
  }
}
