import { useTaskContext } from '../TaskContext';
import './goalsList.css'
import GoalCard from "../GoalCard/index"



export default function GoalsList() {
  const { tasks, deleteTask } = useTaskContext();
  

  return (
    <div>
      {tasks.map((task, index) =>
      (
        <GoalCard key={index} task={task} onDelete={() => deleteTask(task.name)} />
      )
      )}
    </div>
    
  )
}

