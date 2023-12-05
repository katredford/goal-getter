import { useEffect, useState } from 'react';
import { useTaskContext } from '../TaskContext';
import GoalCard from '../GoalCard';
import SingleTask from '../SingleTask';
import "./goalsList.css"


export default function GoalsList() {
  const { tasks, deleteTask, setPriority, setComplete, setColor } = useTaskContext();
  const [taskChange, setTaskChange] = useState(0);

  // setColor() 

  const sortedTasks = [...tasks].sort((a, b) => {
    
    
   
    // Move completed SingleTasks to the bottom
    if (a.frequency === "" && b.frequency === "") {
      if (a.complete && !b.complete) {
        return 1; // a is completed, move it to the end
      } else if (!a.complete && b.complete) {
        return -1; // b is completed, move it to the end
      }
    }

    // Sort by priority first (true comes before false)
    if (b.priority - a.priority !== 0) {
      return b.priority - a.priority;
    }

    // Sort by deadline for SingleTasks
    if (a.frequency === "" && b.frequency === "") {
      const aDeadline = new Date(a.deadline.date + 'T' + a.deadline.time);
      const bDeadline = new Date(b.deadline.date + 'T' + b.deadline.time);

      // If priority is the same, sort by deadline
      if (aDeadline - bDeadline !== 0) {
        return aDeadline - bDeadline;
      }
    }
 


    // If priority and deadline are the same, sort by other criteria, e.g., task name
    return a.name.localeCompare(b.name);
  });


  useEffect(() => {
    // The effect will run whenever taskChange changes
    setTaskChange(taskChange + 1);
  }, [tasks]);

  const handleDelete = (taskId) => {
    deleteTask(taskId);
    // Increment taskChange to trigger a re-render
    setTaskChange(taskChange + 1);
  };

  const handleCheckboxChange = (taskId, isComplete) => {
    setComplete(taskId, isComplete);
    setTaskChange(taskChange + 1);
  };

  const handlePriorityChange = (taskId, isPriority) => {
    setPriority(taskId, isPriority);
    // setColor(taskName)
    setTaskChange(taskChange + 1);
  };

  return (
    <>
      <div>
        {sortedTasks.map((task) => (
          task.frequency === "" && (
            <SingleTask
              key={task.id}
              task={task}
              onDelete={() => handleDelete(task.id)}
              onCheckboxChange={(isComplete) => handleCheckboxChange(task.id, isComplete)}
              onPriorityChange={(isPriority) => handlePriorityChange(task.id, isPriority)}
              style={{ backgroundColor: task.color }}
            />
          )
        ))}
      </div>
      <div className='goalsList'>
        {sortedTasks.map((task) => (
          task.frequency !== "" && (
            <GoalCard key={task.id} task={task}
              onDelete={() => handleDelete(task.id)}
              onPriorityChange={(isPriority) => handlePriorityChange(task.id, isPriority)}
              // style={{ backgroundColor: task.color }}
            />
          )
        ))}
      </div>
    </>
  );
}




