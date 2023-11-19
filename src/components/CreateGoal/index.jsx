import React, { useState } from 'react';
import { useTaskContext } from '../TaskContext';


export default function CreateGoal() {
  const [taskName, setTaskName] = useState('');
  const [frequency, setFrequency] = useState('');
  const [timePeriod, setTimePeriod] = useState('day');
  const { addTask } = useTaskContext();


  function handleTaskNameChange(event) {
    setTaskName(event.target.value);
  }


  function handleFrequencyChange(event) {
    setFrequency(event.target.value);
  }


  function handleTimePeriodChange(event) {
    setTimePeriod(event.target.value);
  }


  function handleSubmit(event) {
    event.preventDefault();


    const newTask = {
      name: taskName,
      frequency: frequency,
      timePeriod: timePeriod,
      clickNum: 0,
      completeCirc: 0,
    };


    addTask(newTask);


    setTaskName('');
    setFrequency('');
    setTimePeriod('day');
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
          />
        </label>


        <label>
          Time Period:
          <select value={timePeriod} onChange={handleTimePeriodChange}>
            <option value="day"> Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </label>


        <button type='submit'>Create Task</button>
      </form>
    </>
  );
}
