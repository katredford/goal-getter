
import React, { useState, useEffect } from 'react';
import './goalCard.css';
import Ring from '../Ring/index'; 

import { getDay, startOfDay, addDays } from 'date-fns';

export default function GoalCard({ task, onDelete }) {
  const [progress, setProgress] = useState(0);
  const [clickNum, setClickNum] = useState(0);


  //*
  const handleDelete = () => {
    // Call the onDelete function with the task name to delete
    onDelete(task.name);
  };


  useEffect(() => {
    const resetClickCount = () => {
      let now = new Date();
      const midnight = startOfDay(addDays(now, 1));
      // now = startOfDay(addDays(now, 1));
      // Check if it's close to midnight (within a small threshold, e.g., 5 minutes)
      if (midnight - now < 5 * 60 * 1000) {
        setClickNum(0);
        setProgress(0);
        const updatedTask = { ...task, clickNum: 0, completeCirc: 0 };
        localStorage.setItem(`task-${task.name}`, JSON.stringify(updatedTask));

        // Calculate the time until the next midnight
        const nextMidnight = startOfDay(addDays(now, 1));

        // Calculate the delay until the next midnight
        const delay = nextMidnight - now;

        // Set a timeout for the next midnight
        setTimeout(resetClickCount, delay);
      }
     
      if (task.timePeriod === 'week' && getDay(now) === 1) {
       
        setClickNum(0);
        setProgress(0);
        const updatedTask = { ...task, clickNum: 0, completeCirc: 0 };
        localStorage.setItem(`task-${task.name}`, JSON.stringify(updatedTask));

        // Calculate the time until the next Monday midnight
        const nextMonday = addDays(startOfDay(now), (8 - getDay(now)) % 7);
      
        // If it's already Monday, set the delay to midnight; otherwise, set the delay to the next Monday
        const delay = getDay(now) === 1 ? nextMonday - now : 24 * 60 * 60 * 1000;

        // Set a timeout for the next Monday midnight
        setTimeout(resetClickCount, delay);
      }
    

        
      if (task.timePeriod === "month") {
        // now = addDays(startOfDay(now), 31 - now.getDate());
        // now = new Date('2023-12-01T00:00:00.000Z');
        console.log(now)
        console.log("NONONOW", now.getDate())
        console.log("Nnow again", getDay(now))
        if (now.getDate() === 1) {
        const updatedTask = { ...task, clickNum: 0, completeCirc: 0 };
        localStorage.setItem(`task-${task.name}`, JSON.stringify(updatedTask));
          setClickNum(0);
          setProgress(0);

          // Calculate the time until the next month's first day
          const nextMonth = addDays(startOfDay(now), 31 - now.getDate());
          const delay = nextMonth - now;
          console.log("delay dealay",delay)
          // Set a timeout for the next month's first day
          setTimeout(resetClickCount, delay);
        }
      }
    };
    // };

    resetClickCount();

    // Clean up the timeout when the component unmounts
    return () => clearTimeout();
  }, [task.name, task.timePeriod]);
 


  useEffect(() => {
    const storedTask = localStorage.getItem(`task-${task.name}`);
    if (storedTask) {
      const parsedTask = JSON.parse(storedTask);
      setClickNum(parsedTask.clickNum || 0);
    }
  }, [task.name]);



  useEffect(() => {
    const storedTask = localStorage.getItem(`task-${task.name}`);

    if (storedTask) {
      const parsedTask = JSON.parse(storedTask);
      setProgress(parsedTask.completeCirc || 0);
    }
  }, [task.name]);





  function handleIncrement() {
    
    const completeCirc = 100 / task.frequency

    const updatedProgress = progress + completeCirc;
  
    setProgress(updatedProgress);
    
    const updatedClickNum = clickNum + 1;
    setClickNum(updatedClickNum);
console.log("updated progress: ", updatedProgress, "updated clicknum", updatedClickNum)
    const updatedTask = { ...task, clickNum: updatedClickNum, completeCirc: updatedProgress };
    localStorage.setItem(`task-${task.name}`, JSON.stringify(updatedTask));

    if (updatedClickNum >= task.frequency) {
    
      localStorage.setItem(`task-${task.name}`, JSON.stringify(0));
    }
  
  }

  return (
    <div className='goalCard'>
      <h3>{task.name}</h3>
      <p>
        Frequency: {task.frequency} times every {task.timePeriod}
      </p>
      <Ring radius={100} stroke={10} progress={progress} />
      <div className='background-circ'>hellow</div>
      <h1 className='click-total'>{clickNum}</h1>
      {/* <button className='inc-btn' onClick={handleIncrement}>Increment Ring</button> */}
      {progress < 100 ? (
        <button className='inc-btn' onClick={handleIncrement}>
          Increment Ring
        </button>
      ): (
      <h1>Complete!</h1>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
