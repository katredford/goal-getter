import React, { useState } from 'react';
import { useTaskContext } from '../TaskContext';
import { v4 as uuidv4 } from 'uuid';
import "./createGoal.css"

export default function CreateGoal() {
  const [taskName, setTaskName] = useState('');
  const [frequency, setFrequency] = useState('');
  const [timePeriod, setTimePeriod] = useState('no-repeat');
  const [isChecked, setIsChecked] = useState(false);
  const [deadline, setDeadline] = useState({ date: '', time: '' });
  const [color, setColor] = useState('#c798cd')
  const { addTask, tasks } = useTaskContext();


  function handleTaskNameChange(event) {
    setTaskName(event.target.value);
  }


  function handleDeadlineChange(event) {
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

  const handleColorChange = (event) => {
    // console.log(event.target.value)
    setColor(event.target.value)
  };

  function handleSubmit(event) {
    event.preventDefault();
    const taskId = uuidv4();

    const newTask = {
      id: taskId,
      name: taskName,
      frequency: frequency,
      timePeriod: timePeriod,
      priority: isChecked,
      deadline: deadline,
      complete: false,
      color: color,
      clickNum: 0,
      completeCirc: 0,
    };


 
    addTask(newTask);


    setTaskName('');
    setFrequency('');
    setTimePeriod('no-repeat');
    setIsChecked(false);
    setDeadline({ date: '', time: '' });
    setColor('#c798cd')
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

          <label>
        <input 
          type="color"
          onChange={handleColorChange}
          id="favcolor"
          value={color}
        />

        <span
            className='color-picker'
          aria-hidden="true"
        />choose color
      </label>
       
        <button type='submit'>Create Task</button>
      </form>
    </>
  );
}
