
import React, { useState, useEffect } from 'react';
import './goalCard.css';
import Ring from '../Ring/index'; 

export default function GoalCard({ task }) {
  const [progress, setProgress] = useState(0);
 

  useEffect(() => {
    const storedProgress = JSON.parse(localStorage.getItem(task.name)) || 0;
    setProgress(storedProgress);
   
  }, [task.name]);

  function handleIncrement() {
    
    const completeCirc = 100 / task.frequency
    
    const updatedProgress = progress + completeCirc;
    
      setProgress(updatedProgress);
    
  }

  return (
    <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
      <h3>{task.name}</h3>
      <p>
        Frequency: {task.frequency} times every {task.timePeriod}
      </p>
      <Ring radius={60} stroke={4} progress={progress} />
      <button onClick={handleIncrement}>Increment Ring</button>
    </div>
  );
}
