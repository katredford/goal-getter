
import React, { useState, useEffect } from 'react';
import './goalCard.css';
import Ring from '../Ring/index'; 

export default function GoalCard({ task }) {
  const [progress, setProgress] = useState(0);
  const [currentClicks, setCurrentClicks] = useState(0);

  useEffect(() => {
    const storedProgress = JSON.parse(localStorage.getItem(task.name)) || 0;
    setProgress(storedProgress);
    setCurrentClicks(JSON.parse(localStorage.getItem(`${task.name}_clicks`)) || 0);
  }, [task.name]);

  function handleIncrement() {
    const updatedClicks = currentClicks + 1;
    setCurrentClicks(updatedClicks);

    if (updatedClicks >= task.frequency) {
      setCurrentClicks(0);

      const updatedProgress = progress + 10;
      setProgress(updatedProgress);
      localStorage.setItem(task.name, JSON.stringify(updatedProgress));
    } else {
      localStorage.setItem(`${task.name}_clicks`, JSON.stringify(updatedClicks));
    }
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
