// import './App.css'
import { TaskProvider } from './components/TaskContext';
import CreateGoal from './components/CreateGoal'
import GoalsList from './components/GoalsList';
import "./fonts/Nanum_Gothic_Coding/NanumGothicCoding-Regular.ttf"



function App() {


  return (
    <>
      <TaskProvider>
        <CreateGoal />
        <GoalsList />
      </TaskProvider>
      {/* <h1>Hello</h1> */}

    </>
  )
}


export default App
