import React, { createContext, useContext, useEffect, useState } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      try {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

        if (tasks.length === 0) {
          savedTasks.forEach((task) => {
            setTasks((prevTasks) => [...prevTasks, task]);
          });
        }

        setInitialized(true);
      } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
      }
    }
  }, [tasks, initialized]);

  const addTask = (newTask) => {
    try {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, newTask];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return updatedTasks;
      });
    } catch (error) {
      console.error('Error adding task to localStorage:', error);
    }
  };

  const deleteTask = (taskName) => {
    try {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.filter((task) => task.name !== taskName);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return updatedTasks;
      });
    } catch (error) {
      console.error('Error deleting task from localStorage:', error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask }}>
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