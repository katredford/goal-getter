import React, { createContext, useContext, useEffect, useState } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Load tasks from localStorage on component mount
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

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