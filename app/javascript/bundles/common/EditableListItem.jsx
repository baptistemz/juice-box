import React, { Component } from 'react';

class EditableListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.value,
      editMode: false
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ text: nextProps.value });
  }
  edit(event){
    event.preventDefault();
    this.props.onEdit()
    this.setState({ editMode: true });
  }
  freeze() {
    this.setState({ text: this.props.value, editMode: false });
  }
  onInputChange(event) {
    event.preventDefault();
    const text = event.target.value;
    this.setState({ text });
  }
  onInputFocus(event) {
    console.log("focus")
    event.preventDefault();
  }
  onFormSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.props.type, this.state.text);
    this.freeze();
  }

  renderParagraph() {
    return (
      <div className='frozen-field align-items-center'>
        <i className="material-icons" onClick={this.edit.bind(this)}>edit</i>
        <p>{this.props.value}</p>
      </div>
    );
  }
  renderInput() {
    return (
      <div >
        <form
          onSubmit={this.onFormSubmit.bind(this)}
          className='edit-field align-items-center'
        >
          <i className="material-icons" onClick={this.onFormSubmit.bind(this)}>done</i>
          <i className="material-icons" onClick={this.freeze.bind(this)}>clear</i>
          <input
            type="text" value={this.state.text}
            onChange={this.onInputChange.bind(this)}
            onFocus={this.onInputFocus.bind(this)}
          />
        </form>
      </div>
    );
  }
  render() {
    const {error} = this.props;
    return (
      <div className="z-index">
        {this.state.editMode ? this.renderInput() : this.renderParagraph()}
      </div>
    );
  }
}

export { EditableListItem };
