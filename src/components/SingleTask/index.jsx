import React, { useEffect, useState } from 'react';
import { useTaskContext } from '../TaskContext';

export default function SingleTask({ task }) {
  const [isComplete, setIsComplete] = useState(false)
  const { deleteTask, tasks } = useTaskContext();

  const handleDelete = () => {
    deleteTask(task?.name);
  };

  useEffect(() => {
    const storedTask = tasks.find((t) => t.name === task?.name);
    console.log(storedTask)
    
    if (storedTask.complete) {
      setIsComplete(true)
      
    }
  }, [tasks, task?.name]);

  function handleCheckboxChange() {
    if (task && task.name) {
      const existingTask = tasks.find((t) => t.name === task.name);

      if (existingTask) {
       
        const updatedTask = {
          ...existingTask,
          complete: !isComplete  
        };

       
        setIsComplete(!isComplete);
        const updatedTasks = tasks.map((t) =>
          t.name === task.name ? updatedTask : t
        );

       
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      }
    }
  }

  return (
    <>
      <h3>{task?.name}</h3>

      <label>
        <input
          type="checkbox"
          checked={isComplete}
          onChange={handleCheckboxChange}
        />
        Complete
      </label>
      <li className='del-btn' onClick={handleDelete}>Delete</li>

    </>
  )
}