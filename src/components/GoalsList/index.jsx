import React from 'react';
import { useTaskContext } from '../TaskContext';
import GoalCard from '../GoalCard';
import SingleTask from '../SingleTask';
import "./goalsList.css"

export default function GoalsList() {
  const { tasks, deleteTask } = useTaskContext();
  console.log(tasks)

  const groupedTasks = tasks.reduce(
    (groups, task) => {
      if (task.frequency !== "") {
        groups.goals.push(task);
      } else {
        groups.singleTasks.push(task);
      }
      return groups;
    },
    { goals: [], singleTasks: [] }
  );
  return (
    <>
      <div>
        {groupedTasks.singleTasks.map((task, index) => (
          <SingleTask key={index} task={task} onDelete={() => deleteTask(task.name)} />
        ))}
      </div>
    <div className='goalsList'>
      
        {groupedTasks.goals.map((task, index) => (
          <GoalCard key={index} task={task} onDelete={() => deleteTask(task.name)} />
          ))}
     

    </div>
          </>
  );
}

