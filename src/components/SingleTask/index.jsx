import React, { useEffect, useState } from 'react';
import { useTaskContext } from '../TaskContext';

export default function SingleTask({task}) {
  const { deleteTask, tasks } = useTaskContext();

  const handleDelete = () => {
    deleteTask(task?.name);
  };
  return (
    <>
      <h3>{task?.name}</h3>

      {/* <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        Complete
      </label> */}
      <li className='del-btn' onClick={handleDelete}>Delete</li>

    </>
  )
}