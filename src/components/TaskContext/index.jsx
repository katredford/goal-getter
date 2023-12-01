import React, { createContext, useContext, useEffect, useState } from 'react';

const TaskContext = createContext();
import { set } from 'date-fns';

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const resetTaskValues = (timePeriod) => {
    return tasks.map((task) =>
      task.timePeriod === timePeriod ? { ...task, clickNum: 0, completeCirc: 0 } : task
    );
  };

  const handleReset = (timePeriod, condition) => {
    //TESTING remember to change this based on what is being tested, 
    //not every monday starts a new month
    const now = new Date('2023-12-04T00:00:00');

    // const now = new Date();
    
    const midnight = set(now, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    const twoMinutesPastMidnight = set(midnight, { minutes: 2 });
    console.log(condition, timePeriod)
    if (condition(now)) {
      const isMidnight = now >= midnight;
      const isTwoMinutesPastMidnight = now <= twoMinutesPastMidnight;
      console.log('Is midnight?', isMidnight);
      console.log('Is two minutes past midnight?', isTwoMinutesPastMidnight);
      const updatedTasks = resetTaskValues(timePeriod);
      console.log("handle reset", updatedTasks)
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    }

    return tasks;
  };

  const handleMidnightReset = () => {
    console.log('day day day');
    // const now = new Date('2023-11-01T00:00:00');
    const now = new Date();
    const midnight = set(now, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    const twoMinutesPastMidnight = set(midnight, { minutes: 2 });
    const condition = () => now >= midnight && now <= twoMinutesPastMidnight;
    return handleReset('day', condition);
  };


  const handleWeeklyReset = () => {
    // const now = new Date('2023-12-04T00:00:00'); //this is a monday
    // const isMonday = now.getDay() === 1;
    const now = new Date();
    const isMonday = new Date().getDay() === 1;
    const midnight = set(now, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
   
    // console.log(isMonday, "week?")
   
    const condition = () => isMonday && now >= midnight;
    
    return handleReset('week', condition);
  };

  const handleMonthlyReset = () => {
    // const now = new Date('2023-11-01T00:01:00'); this is a beginning of a month
    // const isFirstDayOfMonth = now.getDate() === 1;
    const now = new Date();
    const isFirstDayOfMonth = new Date().getDate() === 1;
    const midnight = set(now, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    const twoMinutesPastMidnight = set(midnight, { minutes: 2 });
    return handleReset('month', (now) => isFirstDayOfMonth && now >= midnight && now <= twoMinutesPastMidnight);
  };

  useEffect(() => {
    // Load tasks from localStorage on component mount
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleMidnightReset();
      handleWeeklyReset();
      handleMonthlyReset();
    }, 10000);


    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [tasks]);
      
 

  const addTask = (newTask) => {
    try {
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error adding task to localStorage:', error);
    }
  };

  const deleteTask = (taskName) => {
    try {
      const updatedTasks = tasks.filter((task) => task.name !== taskName);
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error deleting task from localStorage:', error);
    }
  };

  const incrementTask = (updatedTask) => {
    try {
      const updatedTasks = tasks.map((task) =>
        task.name === updatedTask.name ? updatedTask : task
      );
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error updating task in localStorage:', error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, incrementTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};