import { useState } from 'react'

import './App.css'
import { TaskProvider } from './components/TaskContext';
import CreateGoal from './components/CreateGoal'


function App() {

  return (
    <>
      <TaskProvider>
        <CreateGoal />
      </TaskProvider>
      
    </>
  )
}

export default App
