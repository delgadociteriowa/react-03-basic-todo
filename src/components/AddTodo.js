import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddTodo = ({addTodo}) => {
  const [title, setTitle] = useState('');

  const onChange = e => setTitle(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    addTodo(title);
    setTitle('');
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <input type="text" className="form-control" name="title" value={title} onChange={onChange} placeholder="Add a Todo"/>
      </div>
      <button type="submit" className="btn btn-success" disabled={title === '' ? true : false}>Submit</button>
    </form>
  )
}

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
}

export default AddTodo
