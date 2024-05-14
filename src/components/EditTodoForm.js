import React, {useState} from 'react';

function EditTodoForm({editTask, task}) {
  const [inputValue, setInputValue] = useState(task.todo);
  const handleSubmit = e => {
    e.preventDefault();

    editTask(inputValue, task.id);

    setInputValue('');
  };
  return (
    <form className='todo-form' onSubmit={handleSubmit}>
      <input 
        type='text' 
        className='todo-input'
        value={inputValue}
        placeholder='Update task'
        onChange={(e) =>setInputValue(e.target.value)}
      />
      <button type='submit' className='todo-btn'>Update</button>
    </form>
  )
}

export default EditTodoForm;