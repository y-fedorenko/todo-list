import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

function Todo({task, toggleComplete, deleteTask, toggleEdit}) {
  return (
    <div className='todo'>
      <div className='todo-text' onClick={() => toggleComplete(task.id)}>
        <p 
        className={task.completed ? "task-completed" : "" }
        >{task.todo}
        </p>
        <p className={task.completed ? "task-completed" : "" }>
          {task.date}
        </p>
      </div>
      <div className='icons-wrapper'>
        <FontAwesomeIcon 
          icon={faPenToSquare} 
          onClick={() => toggleEdit(task.id)}
          color='#048106'
        />
        <FontAwesomeIcon 
          icon={faTrash} 
          onClick={() => deleteTask(task.id)} 
          color='#a22213'
        />
      </div>
    </div>
  )
}

export default Todo;