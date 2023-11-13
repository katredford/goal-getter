
import './goalsList.css'
import GoalCard from "../GoalCard/index"

export default function GoalsList() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || []
  

  return (
    <div>
      {tasks.map((task, index) =>
      (
        <GoalCard key={index} task={task} />
      )
      )}
    </div>
    
  )
}

