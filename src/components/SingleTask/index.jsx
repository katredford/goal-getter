import React, { useEffect, useState } from 'react';
import { useTaskContext } from '../TaskContext';
import "./singleTask.css"

export default function SingleTask({ task }) {
  const [isComplete, setIsComplete] = useState(false)
  const [isPriority, setIsPriority] = useState(false)
  const { deleteTask, tasks, setComplete, setPriority } = useTaskContext();
  const [isBlinking, setIsBlinking] = useState(false);
  const [isPastDue, setIsPastDue] = useState(false)

  // console.log(isPriority)

  const handleDelete = () => {
    deleteTask(task?.name);
  };


  useEffect(() => {
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
    const deadlineDate = task.deadline.date;
    // console.log(formattedCurrentDate);
    // console.log(deadlineDate);

    const currentDateObj = new Date(formattedCurrentDate);
    const deadlineDateObj = new Date(deadlineDate);

    // If the dates are the same, enable blinking
    if (currentDateObj.getTime() === deadlineDateObj.getTime()) {
      setIsBlinking(true);
    } else {
      setIsBlinking(false);
    }

    // If the deadline is in the past or equal to the current date, set isPastDue to true
    if (currentDateObj >= deadlineDateObj) {
      setIsPastDue(true);
    } else {
      setIsPastDue(false);
    }
  }, [task.deadline.date]);


  useEffect(() => {
    const storedTask = tasks.find((t) => t.name === task?.name);
    if (storedTask && storedTask.priority) {
      setIsPriority(true)
    } else {
      setIsPriority(false)
    }
    if (storedTask && storedTask.complete) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [tasks, task?.name]);

  function handleCheckboxChange() {
    if (task && task.name) {
      // Toggle the completion status using setComplete
      setComplete(task.name, !isComplete);
      // Update the local state to reflect the change
      setIsComplete(!isComplete);
    }
  }

  function handlePriorityChange() {
    if (task && task.name) {
      setPriority(task.name, !isPriority);
      setIsPriority(!isPriority);
    }
  }

  const formattedDate = new Date(task.deadline.date).toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });


  const formattedTime = new Date(task.deadline.date + 'T' + task.deadline.time).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return (
    <>

      <div className={`singleTaskCard ${isBlinking ? 'blinking' : ''}
       ${isPastDue ? 'flashing-past-due' : ''}`}>
        <h3>{task?.name}</h3>
        <div className='deadline-box'>

          {task?.deadline.date && (
            <h3>
              {isPastDue ? `Past Due: ${formattedDate}` : `Deadline: ${formattedDate}`}
            </h3>
          )}
          {task?.deadline.time ? <h3> {formattedTime}</h3> : ""}

        </div>
        <div className='clickables-box'>
          <label>
            <input
              type="checkbox"
              checked={isPriority}
              onChange={handlePriorityChange}
            />
            <span
              className={`priority ${isPriority ? "priority--active" : ""}`}
              aria-hidden="true"
            />

          </label>

          <label>
            <input
              type="checkbox"
              checked={isComplete}
              onChange={handleCheckboxChange}
            />
            <svg
              className={`checkbox ${isComplete ? "checkbox--active" : ""}`}
              // This element is purely decorative so
              // we hide it for screen readers
              aria-hidden="true"
              viewBox="0 0 15 11"
              fill="none"
            >
              <path
                d="M1 4.5L5 9L14 1"
                strokeWidth="2"
                stroke={isComplete ? "#fff" : "none"} // only show the checkmark when `isCheck` is `true`
              />
            </svg>
          </label>

          <li className='del-btn' onClick={handleDelete}>Delete</li>
        </div>
      </div>
    </>
  )
}