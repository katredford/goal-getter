
import React, { useState, useEffect } from 'react';
import './goalCard.css';
import Ring from '../Ring/index'; 

export default function GoalCard({ task }) {
  const [progress, setProgress] = useState(0);
  const [clickNum, setClickNum] = useState(0);

 

  useEffect(() => {
    const storedTask = localStorage.getItem(`task-${task.name}`);
    if (storedTask) {
      const parsedTask = JSON.parse(storedTask);
      setClickNum(parsedTask.clickNum || 0);
    }
  }, [task.name]);

  function handleIncrement() {
    
    const completeCirc = 100 / task.frequency

    const updatedProgress = progress + completeCirc;
  
    setProgress(updatedProgress);
    
    const updatedClickNum = clickNum + 1;
    setClickNum(updatedClickNum);

    const updatedTask = { ...task, clickNum: updatedClickNum };
    localStorage.setItem(`task-${task.name}`, JSON.stringify(updatedTask));

    if (updatedClickNum >= task.frequency) {
    
      localStorage.setItem(`task-${task.name}`, JSON.stringify(0));
    }
  
  }

  return (
    <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
      <h3>{task.name}</h3>
      <p>
        Frequency: {task.frequency} times every {task.timePeriod}
      </p>
      <Ring radius={60} stroke={4} progress={progress} />

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
