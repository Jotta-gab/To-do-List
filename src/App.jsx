import React, { useState, useEffect } from 'react';
import './App.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskType, setTaskType] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const task = { text: newTask, completed: false, type: taskType };
      setTasks([...tasks, task]);
      setNewTask('');
      setTaskType('');
    }
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  return (
    <div className="todo-list-container">
      <div className="todo-card">
        <h2>To-do List</h2>
        <div className="input-group">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="add-task-input"
            placeholder="Adicionar nova tarefa..."
          />
          <select
            value={taskType}
            onChange={(e) => setTaskType(e.target.value)}
            className="task-type-select"
          >
            <option value="">Tipo da Tarefa</option>
            <option value="trabalho">Trabalho</option>
            <option value="estudo">Estudo</option>
            <option value="pessoal">Pessoal</option>
            <option value="bem-estar">Bem-estar</option>
          </select>
          <button onClick={addTask} className="add-task-button">
            Adicionar
          </button>
        </div>

        <button onClick={deleteAllTasks} className="delete-all-button">
          Excluir Tudo
        </button>
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(index)}
                  className="checkbox"
                  style={{ display: 'none' }}
                />
                <span className="task-text">
                  {task.text} - ({task.type})
                </span>
              </label>
              <div className="task-buttons">
                <button onClick={() => deleteTask(index)} className="delete-button">
                  X
                </button>
                <button onClick={() => toggleComplete(index)} className="complete-button">
                  Concluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
