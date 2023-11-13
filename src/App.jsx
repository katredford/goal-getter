import { useState } from 'react'
import Ring from "./components/Ring/index"
import './App.css'

import CreateGoal from './components/CreateGoal'
import GoalsList from './components/GoalsList'

function App() {

  return (
    <>
      <CreateGoal />
      <GoalsList />
    </>
  )
}

export default App
