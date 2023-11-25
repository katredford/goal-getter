
import React, { useEffect, useState } from 'react';
import { useTaskContext } from '../TaskContext';
import Ring from '../Ring';
import "../../fonts/Nanum_Gothic_Coding/NanumGothicCoding-Regular.ttf"
import "./goalCard.css"

//is this true?
export default function GoalCard({ task }) {
  const [progress, setProgress] = useState(0);
  const [clickNum, setClickNum] = useState(0);
  const { deleteTask, incrementTask, tasks } = useTaskContext();

  const handleDelete = () => {
    deleteTask(task?.name);
  };

  useEffect(() => {
    const storedTask = tasks.find((t) => t.name === task?.name);
    if (storedTask) {
      setClickNum(storedTask.clickNum || 0);
      setProgress(storedTask.completeCirc || 0);

      if (storedTask.clickNum >= task?.frequency) {
        // Ensure progress is set to 100 when the click count equals or exceeds the frequency
        setProgress(100);
      }
    }
  }, [tasks, task?.name]);


  const handleIncrement = () => {
    const completeCirc = 100 / task?.frequency;

    const updatedProgress = progress + completeCirc;

    // Increment clickNum
    const updatedClickNum = clickNum + 1;

    if (updatedClickNum < task?.frequency) {
      // If clickNum is less than the frequency, update progress and clickNum
      setProgress(updatedProgress);
      setClickNum(updatedClickNum);
    } else {
      // If clickNum reaches the frequency, set progress to 100 and reset clickNum
      setProgress(100);
      setClickNum(0);
    }

    if (task && task.name) {
      const existingTask = tasks.find((t) => t.name === task.name);

      if (existingTask) {
        // Task already exists, update it
        const updatedTask = {
          ...existingTask,
          clickNum: updatedClickNum,
          completeCirc: updatedProgress,
        };
        incrementTask(updatedTask);
      }
    }
  };

  return (
    <div className='goalCard'>
      <h3>{task?.name}</h3>
      <p>
       {task?.frequency} times every {task?.timePeriod}
      </p>
      <Ring radius={100} stroke={10} progress={progress} />
      {/* <div className='background-circ'>hellow</div> */}
      <h1 className='click-total'>{clickNum}</h1>

      <div className='btn-box'>
      {progress < 100 ? (
        <li className='inc-btn' onClick={handleIncrement}>
          +
        </li>
      ) : (
        <h2>Complete!</h2>
      )}
        <li className='del-btn' onClick={handleDelete}>Delete</li>
      </div>
    </div>
  );
}

