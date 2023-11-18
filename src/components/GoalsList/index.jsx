
import './goalsList.css'
import GoalCard from "../GoalCard/index"



export default function GoalsList({ tasks, onDelete }) {
  
  

  return (
    <div>
      {tasks.map((task, index) =>
      (
        <GoalCard key={index} task={task} onDelete={onDelete} />
      )
      )}
    </div>
    
  )
}

