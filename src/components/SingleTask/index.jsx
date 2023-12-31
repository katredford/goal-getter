import React, { useEffect, useState } from 'react';
import { useTaskContext } from '../TaskContext';
import "./singleTask.css"
import { parse } from 'date-fns';

export default function SingleTask({ task }) {
  const [isComplete, setIsComplete] = useState(false)
  const [isPriority, setIsPriority] = useState(false)
  const { deleteTask, tasks, setComplete, setPriority, setColor } = useTaskContext();
  const [isBlinking, setIsBlinking] = useState(false);
  const [isPastDue, setIsPastDue] = useState(false)
  const [colorChange, setColorChage] = useState(task.color)

  // console.log(isPriority)

  const handleDelete = () => {
    deleteTask(task?.id);
  };

  useEffect(() => {
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toLocaleDateString('en-US'); // Format as 'MM/DD/YYYY'
    const deadlineDate = task.deadline.date;

    // Parse the deadlineDate using date-fns
    const deadlineDateParsed = parse(deadlineDate, 'yyyy-MM-dd', new Date());

    // console.log("Formatted Current Date:", formattedCurrentDate);
    // console.log("Deadline Date:", deadlineDateParsed.toLocaleDateString('en-US'));
    const newCurrentDate = new Date(formattedCurrentDate);
    const newDeadlineDate = new Date(deadlineDateParsed);

    // If the dates are the same, enable blinking
    if (formattedCurrentDate === deadlineDateParsed.toLocaleDateString('en-US')) {
      // console.log("Same day");
      setIsBlinking(true);
    } else {
      setIsBlinking(false);
    }

    // If the deadline is in the past or equal to the current date, set isPastDue to true
    if (newCurrentDate > newDeadlineDate) {
      // console.log("The date should be in the past");
      setIsPastDue(true);
    } else {
      setIsPastDue(false);
    }
  }, [task.deadline.date]);

  useEffect(() => {
    const storedTask = tasks.find((t) => t.id === task?.id);
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
  }, [tasks, task?.id]);

  function handleCheckboxChange() {
    if (task && task.id) {
      // Toggle the completion status using setComplete
      setComplete(task.id, !isComplete);
      // Update the local state to reflect the change
      setIsComplete(!isComplete);
    }
  }

  function handlePriorityChange() {
    if (task && task.id) {
      setPriority(task.id, !isPriority);
      setIsPriority(!isPriority);
    }
  }

  const handleColorChange = (event) => {
    
    if (task && task.id) {
      setColor(task.id, event.target.value)
      setColorChage(event.target.value)

      // setIsBlinking(true);
    }
    
  };


  const parts = task.deadline.date.split('-');
  const formattedDate = `${parts[1]}/${parts[2]}/${parts[0]}`;

  // console.log(formattedDate, task.deadline.date);
  
  const formattedTime = new Date(task.deadline.date + 'T' + task.deadline.time).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const blinkingStyle = {
    backgroundColor: colorChange,
    '--blinking-color': colorChange,
  };

  // console.log("isBlinking:", isBlinking);
  // console.log("isPastDue:", isPastDue);

  return (
    <>
      <div
        className={`singleTaskCard ${isBlinking ? 'blinking' : ''} ${isPastDue ? 'flashing-past-due' : ''}`}
        style={blinkingStyle}
      >


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

          <label>
          <input
            type="color"
            // checked={isComplete}
            onChange={handleColorChange}
            id="favcolor"
            value={colorChange}
          />

          <span

            className='color mirror'
            aria-hidden="true"
          />
        </label>


          <li className='del-btn' onClick={handleDelete}>Delete</li>
        </div>
      </div>
    </>
  )
}