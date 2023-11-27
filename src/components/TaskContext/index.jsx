import React, { createContext, useContext, useEffect, useState } from 'react';

const TaskContext = createContext();
import { isAfter, set, format, startOfDay, addDays } from 'date-fns';

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const simulateMidnight = () => {
    // Set the time to midnight
    const now = set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });

    // Log the current time
    console.log('Current time:', now);

    // Call your reset function
    handleMidnightReset(now);
  };

  const handleMidnightReset = () => {
    console.log("day day day");
 
    
    const now = new Date();
    const midnight = set(now, { hours: 24, minutes: 0, seconds: 0, milliseconds: 0 });

    //TESTING
    // Set now to midnight (00:00:00) of the current day
    // const now = startOfDay(new Date());

    // // Set midnight to 00:00:00 tomorrow
    // const midnight = startOfDay(addDays(now, 1));

    console.log('now:', now);
    console.log('midnight:', midnight);


    if (isAfter(midnight, now)) {
      // if (isAfter(now, midnight)) {
       const updatedTasks = tasks.map((task) =>
        task.timePeriod === 'day' ? { ...task, clickNum: 0, completeCirc: 0 } : task
      );
      console.log("bleep blorp", updatedTasks)
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
    return updatedTasks;
  };
  



    // simulateMidnight()
  const handleWeeklyReset = () => {
    // console.log("week week week")
    const now = new Date();
    const nextMonday = new Date(now);
    nextMonday.setDate(now.getDate() + ((7 - now.getDay()) + 1) % 7); // Calculate days until next Monday
    // console.log("nextMonday", nextMonday)
    nextMonday.setHours(0, 0, 0, 0);

    const updatedTasks = tasks.map((task) => {
      if (task.timePeriod === 'week' && now >= nextMonday) {
        // Reset clickNum and completeCirc for tasks with timePeriod === "week"
        return { ...task, clickNum: 0, completeCirc: 0 };
      }
      return task;
    });

    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleMonthlyReset = () => {
    // console.log("month month month")
    const now = new Date();
    const nextMonth = new Date(now);
    nextMonth.setMonth(now.getMonth() + 1, 1); // Set to the first day of the next month
    nextMonth.setHours(0, 0, 0, 0);

    const updatedTasks = tasks.map((task) => {
      if (task.timePeriod === 'month' && now >= nextMonth) {
        // Reset clickNum and completeCirc for tasks with timePeriod === "month"
        return { ...task, clickNum: 0, completeCirc: 0 };
      }
      return task;
    });

    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  //   useEffect(() => {
  //   const intervalId = setInterval(handleMidnightReset, 60000); // Check every minute (adjust as needed)

  //   // Cleanup the interval on component unmount
  //   return () => clearInterval(intervalId);
  // }, [tasks]);




  useEffect(() => {
    // Load tasks from localStorage on component mount
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);


  useEffect(() => {
    const intervalId = setInterval(() => {
      handleMidnightReset()
      handleWeeklyReset()
      handleMonthlyReset()
    }, 10000)
    // }, 60000)
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