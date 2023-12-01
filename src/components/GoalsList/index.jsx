import React from 'react';
import { useTaskContext } from '../TaskContext';
import GoalCard from '../GoalCard';
import SingleTask from '../SingleTask';
import "./goalsList.css"


export default function GoalsList() {
  const { tasks, deleteTask } = useTaskContext();

  // Sorting logic
  const sortedTasks = [...tasks].sort((a, b) => {
    // Sort by priority first (true comes before false)
    if (b.priority - a.priority !== 0) {
      return b.priority - a.priority;
    }

    // If priority is the same, sort by deadline for singleTasks
    if (a.frequency === "" && b.frequency === "") {
      const aDeadline = new Date(a.deadline.date + 'T' + a.deadline.time);
      const bDeadline = new Date(b.deadline.date + 'T' + b.deadline.time);
      return aDeadline - bDeadline;
    }

    // If priority is the same, you can sort by other criteria, e.g., task name
    return a.name.localeCompare(b.name);
  });

  return (
    <>
      <div>
        {sortedTasks.map((task, index) => (
          // Only render SingleTask if frequency is empty
          task.frequency === "" && (
            <SingleTask key={index} task={task} onDelete={() => deleteTask(task.name)} />
          )
        ))}
      </div>
      <div className='goalsList'>
        {sortedTasks.map((task, index) => (
          // Only render GoalCard if frequency is not empty
          task.frequency !== "" && (
            <GoalCard key={index} task={task} onDelete={() => deleteTask(task.name)} />
          )
        ))}
      </div>
    </>
  );
}


