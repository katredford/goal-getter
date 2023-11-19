import { useState, useEffect } from 'react';
import { TaskProvider, useTaskContext } from '../TaskContext';
import "./createGoal.css"
import GoalsList from '../GoalsList';

export default function CreateGoal() {
  const [taskName, setTaskName] = useState('');
  const [frequency, setFrequency] = useState('');
  const [timePeriod, setTimePeriod] = useState('day')
  const { tasks, addTask } = useTaskContext();
  

  useEffect(() => {
    // Load tasks from localStorage on component mount
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Iterate over the array and add each task
    savedTasks.forEach((task) => {
      addTask(task);
    });
  }, []); // Empty dependency array to run only once on mount

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

    const newTask = {
      name: taskName,
      frequency: frequency,
      timePeriod: timePeriod,
      clickNum: 0,
      completeCirc: 0,
    }

    addTask(newTask);
    setTaskName('');
    setFrequency('');
    setTimePeriod('day');
  }

  function handleDeleteTask(taskNameToDelete) {
 
    deleteTask(taskNameToDelete);
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