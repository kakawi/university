import React from 'react'
import { Form, Button, Loader, Modal, Dimmer } from 'semantic-ui-react'

export default class FacultyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      id: nextProps.faculty.id ? nextProps.faculty.id : '',
      name: nextProps.faculty.name ? nextProps.faculty.name : '',
    });
  }
  handleInputChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    const {actionType} = this.props;
    if (actionType === 'Add') {
      this.props.onSaveClick(this.state);
    } else {
      this.props.onEditClick(this.state);
    }
  }
  render() {
    const {isLoading, isOpenForm, onCancelClick} = this.props;
    return (
      <Modal
        open={isOpenForm}
        onClose={onCancelClick}
      >
        <Modal.Header>Редактировать Факультет</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <div>
              {
                isLoading ?
                  <Dimmer active inverted>
                    <Loader active inline='centered'/>
                  </Dimmer>
                  :
                  <Form>
                    <Form.Field>
                      <label>Название Факультета</label>
                      <input
                        placeholder='Название Факультета'
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        name={"name"}
                      />
                    </Form.Field>
                  </Form>
              }
            </div>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red'
                  type='submit'
                  onClick={onCancelClick}
          >Отменить</Button>
          <Button color='green'
                  type='submit'
                  onClick={this.handleSubmit}
          >Сохранить</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
