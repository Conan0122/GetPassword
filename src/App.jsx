import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-2xl text-center mt-10 bg-gray-800 p-11 rounded-xl border-2 border-gray-400'>Password Generator</h1>
    </>
  )
}

export default App
