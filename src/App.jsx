import './App.css'
import { TaskProvider } from './components/TaskContext';
import CreateGoal from './components/CreateGoal'
import GoalsList from './components/GoalsList';




function App() {


  return (
    <>
      <TaskProvider>
        <CreateGoal />
        <GoalsList />
      </TaskProvider>

    </>
  )
}


export default App
