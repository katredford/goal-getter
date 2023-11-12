import React, { useState, useEffect } from 'react';
import './increment.css'
import Ring from "../Ring/index"



export default function Increment() {
  const [progress, setProgress] = useState(0);

  
  const handleButtonClick = () => {
    // Increase progress by 10 on button click
    setProgress((prevProgress) => prevProgress + 10);
  };
  return (
    <>
  
      <button onClick={handleButtonClick}>increment</button>
      <Ring radius={60} stroke={4} progress={progress} />
    </>
  )
}