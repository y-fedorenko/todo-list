import React, { useState, useEffect, useReducer } from 'react';
import TodoForm from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import Todo from './Todo';
import EditTodoForm from './EditTodoForm';

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { id: uuidv4(), todo: action.payload, completed: false, isEditing: false, date: getDate() }];
    case 'TOGGLE_COMPLETE':
      return state.map(task => task.id === action.payload ? { ...task, completed: !task.completed } : task);
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload);
    case 'EDIT_TASK':
      return state.map(task => task.id === action.payload.id ? { ...task, todo: action.payload.todo, isEditing: false, date: getDate() } : task);
    case 'TOGGLE_EDIT':
      return state.map(task => task.id === action.payload ? { ...task, isEditing: !task.isEditing } : task);
    default:
      return state;
  }
};

function getDate() {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
              'July', 'August', 'September', 'October', 'November', 'December'];
    const currentDate = new Date();
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const formattedTime =
   `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

  return `${month} ${day}, ${year} | ${formattedTime}`;
}

function TodoWrapper() {
  const [tasks, dispatch] = useReducer(todoReducer, [], () => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    dispatch({ type: 'ADD_TASK', payload: task });
  };

  const toggleComplete = (id) => {
    dispatch({ type: 'TOGGLE_COMPLETE', payload: id });
  };

  const deleteTask = (id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const editTask = (newTask, id) => {
    dispatch({ type: 'EDIT_TASK', payload: { id, todo: newTask } });
  };

  const toggleEdit = (id) => {
    dispatch({ type: 'TOGGLE_EDIT', payload: id });
  };

  return (
    <div className='todo-wrapper'>
      <h1>My to do list</h1>
      <TodoForm addTask={addTask} />
      {tasks.map((task) => (
        task.isEditing ? (
          <EditTodoForm key={task.id} editTask={editTask} task={task} />
        ) : (
          <Todo key={task.id} task={task}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
            toggleEdit={toggleEdit}
          />
        )
      ))}
    </div>
  );
}

export default TodoWrapper;
