
import React, { useState, useEffect } from 'react';
import './goalCard.css';
import Ring from '../Ring/index'; 

import { getDay, startOfDay, addDays } from 'date-fns';

export default function GoalCard({ task }) {
  const [progress, setProgress] = useState(0);
  const [clickNum, setClickNum] = useState(0);


  useEffect(() => {
    const resetClickCount = () => {
     let now = new Date();
      if (task.timePeriod === 'day') {
        setClickNum(0);
        setProgress(0)

      // Calculate the time until the next midnight
        const now = new Date();
        // const now = new Date('2023-11-21T00:00:00.000Z');
        console.log(now)
      const midnight = startOfDay(addDays(now, 1));

      // Calculate the delay until the next midnight
      const delay = midnight - now;

      // Set a timeout for the next midnight
        setTimeout(resetClickCount, delay);
      }

      if (task.timePeriod === 'week') {
       
        const now = new Date();
        // const now = new Date('2023-11-21T00:00:00.000Z');
        
        
        if (getDay(now) === 1) {
          setClickNum(0);
          setProgress(0);

          // Calculate the time until the next Monday midnight
          const nextMonday = addDays(startOfDay(now), (8 - getDay(now)) % 7);
          const delay = nextMonday - now;

          // Set a timeout for the next Monday midnight
          setTimeout(resetClickCount, delay);
        }
      }

      if (task.timePeriod === "month") {

        now = new Date('2023-12-01T00:00:00.000Z');
        console.log("NONONOW", now)
        // if (getDay(now) === 1 && now.getDate() === 1) {
          setClickNum(0);
          setProgress(0);

          // Calculate the time until the next month's first day
          const nextMonth = addDays(startOfDay(now), 32 - now.getDate());
          const delay = nextMonth - now;

          // Set a timeout for the next month's first day
          setTimeout(resetClickCount, delay);
        // }
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
    </div>
  );
}
