import PropTypes from 'prop-types';

const TodoItem = ({todo, completeTodo, deleteTodo, activateEditMode}) => {
  const {id, title, completed} = todo;
  return (
    <li className="list-group-item">
      <input type="checkbox" onChange={completeTodo.bind(this, id)}/>{' '}
      <span  className={completed ? 'completed' : undefined}>{title}</span>
      <button className="btn btn-danger btn-todo" onClick={deleteTodo.bind(this, id)}>Delete</button>
      <button className="btn btn-primary btn-todo" onClick={activateEditMode.bind(this, todo)}>Edit</button>
    </li>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  completeTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  activateEditMode: PropTypes.func.isRequired,
} 

export default TodoItem
