import React from 'react';
import { useTaskContext } from '../TaskContext';
import GoalCard from '../GoalCard/index';


export default function GoalsList() {
  const { tasks, deleteTask } = useTaskContext();
  console.log(tasks)
  return (
    <div>
      {tasks.map((task, index) => (
        <GoalCard key={index} task={task} onDelete={() => deleteTask(task.name)} />
      ))}
    </div>
  );
}

