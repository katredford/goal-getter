import React, { useEffect, useState } from 'react';
import { useTaskContext } from '../TaskContext';
import "./singleTask.css"

export default function SingleTask({ task }) {
  const [isComplete, setIsComplete] = useState(false)
  const [isPriority, setIsPriority] = useState(false)
  const { deleteTask, tasks, setComplete, setPriority } = useTaskContext();

// console.log(isPriority)

  const handleDelete = () => {
    deleteTask(task?.name);
  };

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
      // Toggle the completion status using setComplete
      setPriority(task.name, !isPriority);
      // Update the local state to reflect the change
      setIsPriority(!isPriority);
    }
  }

  const formattedDate = new Date(task.deadline.date ).toLocaleDateString('en-GB', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedTime = new Date(task.deadline.date + 'T' + task.deadline.time).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
// console.log(formattedTime)
  const formattedDateTime = `${formattedDate} ${formattedTime}`;
  return (
    <>
      <div className='singleTaskCard'>
      <h3>{task?.name}</h3>
      <h3>Deadline: {formattedDateTime}</h3>
      
        <div className='clickables-box'>
      <label>
        <input
          type="checkbox"
          checked={isPriority}
          onChange={handlePriorityChange}
        />
        <span
          className={`priority ${isPriority ? "priority--active" : ""}`}
          // This element is purely decorative so
          // we hide it for screen readers
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