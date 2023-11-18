import { useState, useEffect } from 'react';
import "./createGoal.css"
import GoalsList from '../GoalsList';

export default function CreateGoal() {
  const [taskName, setTaskName] = useState('');
  const [frequency, setFrequency] = useState('');
  const [timePeriod, setTimePeriod] = useState('day')
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    // Load tasks from localStorage on component mount
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);


  function handleTaskNameChange(event) {
    setTaskName(event.target.value)
  }

  function handleFrequencyChange(event) {
    setFrequency(event.target.value)
  }

  function handleTimePeriodChange(event) {
    setTimePeriod(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()

    const task = {
      name: taskName,
      frequency: frequency,
      timePeriod: timePeriod,
      clickNum: 0,
      completeCirc: 0,
    }

    const tasks = JSON.parse(localStorage.getItem("tasks")) || []
    const newTasks = [...tasks, task]
    localStorage.setItem('tasks', JSON.stringify(newTasks))

    setTaskName('');
    setFrequency('');
    setTimePeriod('day');
  }

  function handleDeleteTask(taskNameToDelete) {
    // Filter out the task to delete
    const updatedTasks = tasks.filter((task) => task.name !== taskNameToDelete);

    // Save the updated list of tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Update the state to reflect the deleted task
    setTasks(updatedTasks);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Task Name:
          <input type="text" value={taskName} onChange={handleTaskNameChange}></input>
        </label>

        <label>
          Frequency:
          <input
            type="number"
            value={frequency}
            onChange={handleFrequencyChange}
          >
          </input>
        </label>

        <label>
          Time Period:
          <select value={timePeriod} onChange={handleTimePeriodChange}>
            <option value="day"> Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </label>

        <button type='submit'>create task</button>
      </form>
      <GoalsList tasks={tasks} onDelete={handleDeleteTask} />
    </>
  )
}