import React from 'react'
import { Form, Button, Select, Loader } from 'semantic-ui-react'

export default class GroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupNumber: '',
      setId: '',
      specialityId: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }
  handleSelectChange(event, data) {
    this.setState({
      [data.name]: data.value
    });
  }
  handleSubmit(event) {
    this.props.onSave(this.state);
    event.preventDefault();
  }
  componentDidMount() {
      this.props.getSets();
  }
  render() {
    let specialityOptions;
    let yearOfEstablishmentDisabled = true;
    let yearOfEstablishmentOptions = [];
    if (this.props.isFetched) {
      const sets = this.props.sets;

      const uniqueSpecialities = [];
      const flags = [];
      for (let i = 0; i < sets.length; i++) {
        const speciality = sets[i].speciality;
        if (flags.indexOf(speciality.id) === -1) {
          uniqueSpecialities.push(speciality);
          flags.push(speciality.id)
        }
      }

      specialityOptions = uniqueSpecialities.map(speciality => {
        return {key: speciality.id, text: speciality.name, value: speciality.id}
      });

      if (this.state.specialityId) {
        yearOfEstablishmentDisabled = false;
        yearOfEstablishmentOptions = sets
          .filter((set) => {return set.speciality.id === this.state.specialityId})
          .map(set => {
            return {key: set.id, text: set.yearOfEstablishment, value: set.id}
          });
      }

    }

    return(
      <div>
      {
        this.props.isFetched ?
          <Form>
            <Form.Field>
              <label>Номер группы</label>
              <input
                placeholder='Номер группы'
                value={this.state.groupNumber}
                onChange={this.handleInputChange}
                name={"groupNumber"}
              />
            </Form.Field>
            <Form.Field>
              <Select
                options={specialityOptions}
                placeholder='Специальность'
                defaultValue={this.state.specialityId}
                onChange={this.handleSelectChange}
                name={"specialityId"}
              />
            </Form.Field>
            <Form.Field>
              <label>Год набора</label>
              <Select
                disabled={yearOfEstablishmentDisabled}
                options={yearOfEstablishmentOptions}
                placeholder='Год набора'
                defaultValue={this.state.setId}
                onChange={this.handleSelectChange}
                name={"setId"}
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
