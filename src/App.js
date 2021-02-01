import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import About from './components/About';
import Navbar from './components/Navbar';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import EditTodo from './components/EditTodo';
import SearchTodo from './components/SearchTodo';

const App = () =>{

  const [todos, setTodos] = useState([]);

  const [todoToEdit, setTodoToEdit] = useState({
    id: null,
    title: '',
    completed: false
  });

  const [editMode, setEditMode] = useState(false);
  
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const todosFromServer = await fetchTodos();
      setTodos(todosFromServer);
    } 
    getTodos();
    // eslint-disable-next-line
  },[]);

  const fetchTodos = async () => {
    const res = await fetch('http://localhost:5000/todos');
    const data = await res.json()
    return data 
  }

  const fetchSingleTodo = async (id) => {
    const res = await fetch(`http://localhost:5000/todos/${id}`);
    const data = await res.json()
    return data 
  }

  const completeTodo = async (id) => {
    const dbTodo = await fetchSingleTodo(id);
    dbTodo.completed = !dbTodo.completed;
    const res = await fetch(`http://localhost:5000/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(dbTodo)
    })
    const data = await res.json()
    setTodos([...todos.map(todo => {
      if(todo.id === id){
        todo = {...data};
      }
      return todo
    })])
  }
  
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/todos/${id}`, {method: 'DELETE'})
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const addTodo = async (title) => {
    const res = await fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({title, completed:false})
    });
    const data = await res.json();
    setTodos([...todos, data]);
  }

  const activateEditMode = todo => {
    setEditMode(true);
    setTodoToEdit(todo);
  }

  const deactivateEditMode = todo => {
    setEditMode(false);
    setTodoToEdit({
      id: null,
      title: '',
      completed: false
    });
  }

  const editTodo = async (id, title) => {
    const dbTodo = await fetchSingleTodo(id);
    dbTodo.title = title;

    const res = await fetch(`http://localhost:5000/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(dbTodo)
    });
    const data = await res.json();
    setTodos([...todos.map(todo => {
        if(todo.id === id){
          todo.title = data.title
        }
        return todo;
      }
    )])
  }

  const searchTodo = title => {
    setFiltered([...todos.filter(todo => {
      const regex = new RegExp(`${title}`, 'gi');
      return todo.title.match(regex)
    })])
  }
  
  return (
    <Router>
      <Fragment>
        <Navbar todosQuantity={todos.length}/>
        <Route exact path="/"  render={props => (
          <div className="container">
            <Fragment>
              {
                editMode ?
                <EditTodo
                  todoToEdit={todoToEdit}
                  deactivateEditMode={deactivateEditMode}
                  editTodo={editTodo}
                />
                :
                <AddTodo addTodo={addTodo}/>
              }
              <SearchTodo searchTodo={searchTodo}/>
              {
                filtered.length === 0 ?
                  <Todos
                    todos={todos}
                    completeTodo={completeTodo}
                    deleteTodo={deleteTodo}
                    activateEditMode={activateEditMode}
                  />
                :
                  <Todos
                    todos={filtered}
                    completeTodo={completeTodo}
                    deleteTodo={deleteTodo}
                    activateEditMode={activateEditMode}
                  />
              }
            </Fragment>
          </div>
        )}/>
        <Route path="/about" component={About} />
      </Fragment>
    </Router>
  )
}

export default App