import React from 'react'
import { Form, Button, Select, Loader } from 'semantic-ui-react'

export default class StudentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastName: '',
      firstName: '',
      middleName: '',
      recordBook: '',
      addressOfPermanentResidence: '',
      addressOfResidence: '',
      isGetScholarship: '',
      isLocal: '',
      groupId: '',
      group: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChangeGroup = this.handleSelectChangeGroup.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }
  handleSelectChangeGroup(event, data) {
    const groupId = data.value;
    const chosenGroup = this.props.groups.filter(group => group.id === groupId)[0];
    this.setState({
      groupId: groupId,
      group: chosenGroup
    });
  }
  handleSubmit(event) {
    this.props.onSave(this.state);
    event.preventDefault();
  }
  componentDidMount() {
      this.props.getGroups();
  }
  render() {
    let groupsOptions;
    if (this.props.isFetched) {
      const groups = this.props.groups;

      groupsOptions = groups.map(group => {
        return {key: group.id, text: group.groupNumber, value: group.id}
      });
    }

    return(
      <div>
      {
        this.props.isFetched ?
          <Form>
            <Form.Field>
              <label>Фамилия</label>
              <input
                placeholder='Фамилия'
                value={this.state.lastName}
                onChange={this.handleInputChange}
                name={"lastName"}
              />
            </Form.Field>
            <Form.Field>
              <label>Имя</label>
              <input
                placeholder='Имя'
                value={this.state.firstName}
                onChange={this.handleInputChange}
                name={"firstName"}
              />
            </Form.Field>
            <Form.Field>
              <label>Отчество</label>
              <input
                placeholder='Отчество'
                value={this.state.middleName}
                onChange={this.handleInputChange}
                name={"middleName"}
              />
            </Form.Field>
            <Form.Field>
              <label>Номер зачетной книжки</label>
              <input
                placeholder='Номер зачетной книжки'
                value={this.state.recordBook}
                onChange={this.handleInputChange}
                name={"recordBook"}
              />
            </Form.Field>
            <Form.Field>
              <label>Адрес постоянной прописки</label>
              <input
                placeholder='Адрес постоянной прописки'
                value={this.state.addressOfPermanentResidence}
                onChange={this.handleInputChange}
                name={"addressOfPermanentResidence"}
              />
            </Form.Field>
            <Form.Field>
              <label>Адрес проживания</label>
              <input
                placeholder='Адрес проживания'
                value={this.state.addressOfResidence}
                onChange={this.handleInputChange}
                name={"addressOfResidence"}
              />
            </Form.Field>
            <Form.Field>
              <label>Местный</label>
              <input
                placeholder='Местный'
                value={this.state.isLocal}
                onChange={this.handleInputChange}
                name={"isLocal"}
              />
            </Form.Field>
            <Form.Field>
              <Select
                options={groupsOptions}
                placeholder='Номер группы'
                defaultValue={this.state.groupId}
                onChange={this.handleSelectChangeGroup}
                name={"groupId"}
              />
            </Form.Field>
            <Button
              type='submit'
              onClick={this.handleSubmit}
            >Добавить</Button>
          </Form>
        :
        <Loader active inline />
      }
      </div>
    )
  }
}
