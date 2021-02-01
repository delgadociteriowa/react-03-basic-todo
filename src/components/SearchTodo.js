import PropTypes from 'prop-types';

const SearchTodo = ({searchTodo}) => {
  const onChange = e => {
    searchTodo(e.target.value)
  }

  return (
    <form>
      <div className="form-group">
        <input type="text" className="form-control" name="title" onChange={onChange} placeholder="Search Todo"/>
      </div>
    </form>
  )
}

SearchTodo.propTypes = {
  searchTodo: PropTypes.func.isRequired,
}

export default SearchTodo
