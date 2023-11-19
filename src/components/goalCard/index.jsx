
import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../TaskContext/index';
import './goalCard.css';
import Ring from '../Ring/index'; 

import { getDay, startOfDay, addDays } from 'date-fns';


export default function GoalCard({ task }) {
  const [progress, setProgress] = useState(0);
  const [clickNum, setClickNum] = useState(0);
  const { deleteTask, addTask } = useTaskContext();

  const handleDelete = () => {
    deleteTask(task?.name); // Add null check for task
  };

  useEffect(() => {
    const resetClickCount = () => {
      let now = new Date();
      const midnight = startOfDay(addDays(now, 1));

      if (task && task.name) { // Add null checks for task and task.name
        if (midnight - now < 5 * 60 * 1000) {
          setClickNum(0);
          setProgress(0);
          const updatedTask = { ...task, clickNum: 0, completeCirc: 0 };
          localStorage.setItem(`task-${task.name}`, JSON.stringify(updatedTask));

          const nextMidnight = startOfDay(addDays(now, 1));
          const delay = nextMidnight - now;

          setTimeout(resetClickCount, delay);
        }

        if (task.timePeriod === 'week' && getDay(now) === 1) {
          setClickNum(0);
          setProgress(0);
          const updatedTask = { ...task, clickNum: 0, completeCirc: 0 };
          localStorage.setItem(`task-${task.name}`, JSON.stringify(updatedTask));

          const nextMonday = addDays(startOfDay(now), (8 - getDay(now)) % 7);
          const delay = getDay(now) === 1 ? nextMonday - now : 24 * 60 * 60 * 1000;

          setTimeout(resetClickCount, delay);
        }

        if (task.timePeriod === "month" && now.getDate() === 1) {
          const updatedTask = { ...task, clickNum: 0, completeCirc: 0 };
          localStorage.setItem(`task-${task.name}`, JSON.stringify(updatedTask));
          setClickNum(0);
          setProgress(0);

          const nextMonth = addDays(startOfDay(now), 31 - now.getDate());
          const delay = nextMonth - now;

          setTimeout(resetClickCount, delay);
        }
      }
    };

    resetClickCount();

    return () => clearTimeout();
  }, [task?.name, task?.timePeriod]); // Add null checks for task properties

  useEffect(() => {
    const storedTask = localStorage.getItem(`task-${task?.name}`);
    if (storedTask) {
      const parsedTask = JSON.parse(storedTask);
      setClickNum(parsedTask?.clickNum || 0); // Add null check for parsedTask
    }
  }, [task?.name]);

  useEffect(() => {
    const storedTask = localStorage.getItem(`task-${task?.name}`);
    if (storedTask) {
      const parsedTask = JSON.parse(storedTask);
      setProgress(parsedTask?.completeCirc || 0); // Add null check for parsedTask
    }
  }, [task?.name]);

  const handleIncrement = () => {
    const completeCirc = 100 / task?.frequency;

    const updatedProgress = progress + completeCirc;
    setProgress(updatedProgress);

    const updatedClickNum = clickNum + 1;
    setClickNum(updatedClickNum);

    if (task && task.name) {
      const updatedTask = { ...task, clickNum: updatedClickNum, completeCirc: updatedProgress };
      addTask(updatedTask);

      if (updatedClickNum >= task.frequency) {
        const resetTask = { ...task, clickNum: 0 };
        addTask(resetTask);
      }
    }
  };

  return (
    <div className='goalCard'>
      <h3>{task?.name}</h3>
      <p>
        Frequency: {task?.frequency} times every {task?.timePeriod}
      </p>
      <Ring radius={100} stroke={10} progress={progress} />
      <div className='background-circ'>hellow</div>
      <h1 className='click-total'>{clickNum}</h1>
      {progress < 100 ? (
        <button className='inc-btn' onClick={handleIncrement}>
          Increment Ring
        </button>
      ) : (
        <h1>Complete!</h1>
      )}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}