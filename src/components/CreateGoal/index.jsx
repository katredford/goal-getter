import React, { useState } from 'react';
import { useTaskContext } from '../TaskContext';
import "./createGoal.css"

export default function CreateGoal() {
  const [taskName, setTaskName] = useState('');
  const [frequency, setFrequency] = useState('');
  const [timePeriod, setTimePeriod] = useState('no-repeat');
  const [isChecked, setIsChecked] = useState(false);
  const [deadline, setDeadline] = useState({ date: '', time: '' });
  const { addTask } = useTaskContext();


  function handleTaskNameChange(event) {
    setTaskName(event.target.value);
  }

  // function handleDeadlineChange(event) {
  //   console.log(event.target)
  //   setDeadlineDate(event.target.value);
  // }

  function handleDeadlineChange(event) {
    // Check if the event target has a 'type' property (i.e., it's an input element)
    if (event.target.type === 'date' || event.target.type === 'time') {
      setDeadline((prevDeadline) => ({
        ...prevDeadline,
        [event.target.type]: event.target.value,
      }));
    }
  }

  function handleFrequencyChange(event) {
    setFrequency(event.target.value);
  }


  function handleTimePeriodChange(event) {
    setTimePeriod(event.target.value);
  }

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  function handleSubmit(event) {
    event.preventDefault();


    const newTask = {
      name: taskName,
      frequency: frequency,
      timePeriod: timePeriod,
      priority: isChecked,
      deadline: deadline,
      complete: false,
      clickNum: 0,
      completeCirc: 0,
    };


    addTask(newTask);


    setTaskName('');
    setFrequency('');
    setTimePeriod('no-repeat');
    setIsChecked(false);
    setDeadline({ date: '', time: '' });
  }


  return (
    <>
      <form className="createForm" onSubmit={handleSubmit}>
        <label>
          Task Name:
          <input type="text" value={taskName} onChange={handleTaskNameChange}></input>
        </label>

        <label>
          Time Period:
          <select value={timePeriod} onChange={handleTimePeriodChange}>
            <option value="no-repeat">one time task</option>
            <option value="day"> Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </label>


        {timePeriod !== 'no-repeat' && (
          <label>
            Frequency:
            <input type="number" value={frequency} onChange={handleFrequencyChange} />
          </label>
        )}


        
        <label>
          Priority:
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span
            className={`priority ${isChecked ? "priority--active" : ""}`}
            aria-hidden="true"
          />
          
        </label>
        {timePeriod === 'no-repeat' && (

          <label>
            Deadline
            <input
              type="date"
              value={deadline.date}
              onChange={handleDeadlineChange}
            />
            <input
              type="time"
              value={deadline.time}
              onChange={handleDeadlineChange}
            />
          </label>
        )}



        <button type='submit'>Create Task</button>
      </form>
    </>
  );
}
