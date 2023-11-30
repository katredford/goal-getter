import React, { createContext, useContext, useEffect, useState } from 'react';

const TaskContext = createContext();
import { isAfter, set, format, startOfDay, addDays } from 'date-fns';

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);


  const handleMidnightReset = () => {
    console.log("day day day");

    const now = new Date();
    const midnight = set(now, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    const twoMinutesPastMidnight = set(midnight, { minutes: 2 });

    //# TESTING
    // const now = new Date('2023-11-27T00:01:00'); // Set it to a time between midnight and two minutes past midnight
    // const midnight = set(now, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    // const twoMinutesPastMidnight = set(midnight, { minutes: 2 });
   

    console.log('now:', now);
    console.log('midnight:', midnight);
   

    let updatedTasks = tasks; // Initialize with the current tasks

    if (now >= midnight && now <= twoMinutesPastMidnight) {
      updatedTasks = tasks.map((task) =>
        task.timePeriod === 'day' ? { ...task, clickNum: 0, completeCirc: 0 } : task
      );

      console.log('bleep blorp', updatedTasks);
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    return updatedTasks;
  };

  const handleWeeklyReset = () => {
    console.log("day day day");

    const now = new Date();
    const midnight = set(now, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    const twoMinutesPastMidnight = set(midnight, { minutes: 2 });
    const isMonday = now.getDay() === 1;

    //# TESTING
    // const now = new Date('2023-11-27T00:01:00'); // Set it to a time between midnight and two minutes past midnight
    // const midnight = set(now, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    // const twoMinutesPastMidnight = set(midnight, { minutes: 2 });

    // console.log("MONDAY", isMonday)

    let updatedTasks = tasks; // Initialize with the current tasks

  
    if (now >= midnight && isMonday && now <= twoMinutesPastMidnight) {
      // Use the functional form of setTasks
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.timePeriod === 'week' ? { ...task, clickNum: 0, completeCirc: 0 } : task
        )
      );

      // Save to local storage
      const updatedTasks = tasks.map((task) =>
        task.timePeriod === 'week' ? { ...task, clickNum: 0, completeCirc: 0 } : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    return updatedTasks;
  };

  const handleMonthlyReset = () => {

    console.log("MONT MONTH MONTH")
    const now = new Date();
    // const now = new Date('2023-11-01T00:01:00');
    const midnight = set(now, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    const twoMinutesPastMidnight = set(midnight, { minutes: 2 });
    const isFirstDayOfMonth = now.getDate() === 1;

    // Uncomment the line below for testing a specific date
    // const now = new Date('2023-11-01T00:01:00');
    console.log("new month", isFirstDayOfMonth)
    let updatedTasks = tasks; // Initialize with the current tasks

    if (now >= midnight && isFirstDayOfMonth && now <= twoMinutesPastMidnight) {
      // Use the functional form of setTasks
      console.log("THIS THIS HTIS")
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.timePeriod === 'month' ? { ...task, clickNum: 0, completeCirc: 0 } : task
        )
      );

      // Save to local storage
      const updatedTasks = tasks.map((task) =>
        task.timePeriod === 'month' ? { ...task, clickNum: 0, completeCirc: 0 } : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    return updatedTasks;
  };

  useEffect(() => {
    // Load tasks from localStorage on component mount
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleMidnightReset();
    }, 10000);
    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [tasks]);
  
  useEffect(() => {
    const weeklyIntervalId = setInterval(() => {
      handleWeeklyReset();
    }, 10000);
    return () => clearInterval(weeklyIntervalId);
  }, [tasks]);

  useEffect(() => {
    const monthlyIntervalId = setInterval(() => {
      handleMonthlyReset();
    }, 10000);
    return () => clearInterval(monthlyIntervalId);
  }, [tasks]);
    
  //   // const now = new Date();
  //   // const midnight = set(now, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  //   // const twoMinutesPastMidnight = set(midnight, { minutes: 2 });

  //   //TESTING

  //   const now = new Date('2023-11-25T00:01:00'); // Set it to a time between midnight and two minutes past midnight
  //   const midnight = set(now, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  //   const twoMinutesPastMidnight = set(midnight, { minutes: 2 });

  //   console.log('now:', now);
  //   console.log('midnight:', midnight);


  //   if (now >= midnight && now <= twoMinutesPastMidnight) {
  //     const updatedTasks = tasks.map((task) =>
  //       task.timePeriod === 'day' ? { ...task, clickNum: 0, completeCirc: 0 } : task
  //     );

  //     console.log('bleep blorp', updatedTasks);
  //     setTasks(updatedTasks);
  //     localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  //   }

  //   return updatedTasks;
  // };
  

  // useEffect(() => {
  //   // Load tasks from localStorage on component mount
  //   const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  //   setTasks(savedTasks);
  // }, []);


  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     handleMidnightReset()
     
  //   }, 10000)
  //   // }, 60000)
  //   // Cleanup the interval on component unmount
  //   return () => clearInterval(intervalId);
  // }, [tasks]);

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