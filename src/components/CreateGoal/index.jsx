import { useState } from 'react'
import "./createGoal.css"
import Increment from "../Increment"

export default function CreateGoal() {
  const [increment, setIncrement] = useState(10);

  const handleInputChange = (event) => {
    // Update the increment value based on user input
    const inputValue = event.target.value;
    setIncrement(Number(inputValue));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Reset progress to 0 when the form is submitted
    setProgress(0);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Increment:
          <input
            type="number"
            value={increment}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Set Increment</button>
      </form>
      <Increment progress={increment} />
    </>
  )
}