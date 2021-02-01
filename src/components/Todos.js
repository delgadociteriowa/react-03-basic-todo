import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const Todos = ({todos, completeTodo, deleteTodo, activateEditMode}) => {
  return (
    <ul className="list-group">
      {
        todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
            activateEditMode={activateEditMode}
          />
        ))
      }
    </ul>
  )
}

Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  completeTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  activateEditMode: PropTypes.func.isRequired,
}

export default Todos
