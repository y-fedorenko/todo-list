import React, {useState} from 'react';

function TodoForm({addTask}) {
  const [inputValue, setInputValue] = useState('');
  const handleSubmit = e => {
    e.preventDefault();

    addTask(inputValue);

    setInputValue('');
  };
  return (
    <form className='todo-form' onSubmit={handleSubmit}>
      <input 
        type='text' 
        className='todo-input'
        value={inputValue}
        placeholder='A task to remember...'
        onChange={(e) =>setInputValue(e.target.value)}
      />
      <button type='submit' className='todo-btn' >Add task</button>
    </form>
  )
}

export default TodoForm;