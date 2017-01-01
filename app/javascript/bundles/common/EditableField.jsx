import React  from 'react';
import { withState, withHandlers, compose, pure } from 'recompose';
import PropTypes from 'prop-types';
const text = withState('text', 'setText', ({ value }) => value);

const editMode = withState('editMode', 'setEditMode', false);

const handlers = withHandlers({
  onFormSubmit: ({ type, text, onSubmit, setEditMode }) =>  (event) => {
    event.preventDefault();
    onSubmit(type, text);
    setEditMode(false);
  }
})

const InputRenderer = ({ text, onFormSubmit, setText, setEditMode }) => {
  return (
    <div >
      <form
        onSubmit={onFormSubmit}
        className='edit-field justify-center align-items-center'
      >
        <input
          type="text" value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <i className="material-icons" onClick={onFormSubmit}>done</i>
        <i className="material-icons" onClick={() => setEditMode(false)}>clear</i>
      </form>
    </div>
  );
}

const ParagraphRenderer = ({ value, setEditMode }) => {
  return (
    <div className='frozen-field direction-row align-items-center'>
      <p>{value}</p>
      <i className="material-icons" onClick={() => setEditMode(true)}>edit</i>
    </div>
  );
}

let EditableField = ({ label, error, onFormSubmit, text, setText, editMode, setEditMode }) => {
  return(
    <div>
      <label>{label}
        <span className="red-text">{error ? error : ''}</span>
      </label>
      {editMode ?
        <InputRenderer
          text={text}
          onFormSubmit={onFormSubmit}
          setText={setText}
          setEditMode={setEditMode} />
      :
        <ParagraphRenderer
          value={text}
          setEditMode={setEditMode} />
      }
    </div>
  )
}

EditableField.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string,
  text: PropTypes.string,
  onFormSubmit: PropTypes.func,
  setEditMode: PropTypes.func,
  setText: PropTypes.func,
  editMode: PropTypes.bool
};

InputRenderer.propTypes = {
  text: PropTypes.string,
  onFormSubmit: PropTypes.func,
  setEditMode: PropTypes.func,
  setText: PropTypes.func,
};

ParagraphRenderer.propTypes = {
  value: PropTypes.string,
  setEditMode: PropTypes.func,
};

EditableField = compose(
  text,
  editMode,
  handlers,
  pure
)(EditableField)

export { EditableField };
