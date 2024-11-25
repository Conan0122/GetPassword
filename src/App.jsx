import { useState, useCallback, useEffect, useRef } from 'react'

/*
  useState:-    to change any state or update any variable(it works as variable)

  useCallback:- to optimize the function call(uses memoization to remember the function calls)

  useEffect:-   is used for functions that you don’t want to run on every render but instead want to run when specific dependencies change or at certain points in the component's lifecycle

  useRef:-      used to take reference of anything. We can use it to give users better experience like in our case showing what has been copied from password section
*/

function App() {
  let [length, setLength] = useState(5)
  let [numCheck, setNumCheck] = useState(false)
  let [symbolCheck, setSymbolCheck] = useState(false)
  let [password, setPassword] = useState("")

  const pwdRef = useRef(null)

  // Using useCallback hook to optimize the function call whenever any updation is requested for pwd generation
  const generatePwd = useCallback( ()=>{
    let pwd = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if (numCheck) str += "0123456789"
    if (symbolCheck) str += "@#$%&_!*+~^[]{}-`"

    for (let i=1; i<=length; i++){
      // Generating random char from str using Math.random
      let char = Math.floor(Math.random() * str.length + 1)
      // pwd += str[char];  // Same as below
      pwd += str.charAt(char);
    }
    
    setPassword(pwd)
    
    // Below line has dependencies which states that call func whenever these dependencies updates.
  } , [length, numCheck, symbolCheck, setPassword]) // Passing setPassword since we will generate password based on setPassword as well
  
  // generatePwd()  // This throws error. We can't call func like this and hence we need to call useEffect
  useEffect(() => {
    generatePwd()
  }, [length, numCheck, symbolCheck, setPassword])
  

  const copyPwd = useCallback(()=>{
    // We took reference of input field of password so that we can use it to select and show user what is selected.
    pwdRef.current?.select()  // use to select the referenced section
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
    <div className='w-full flex justify-center mt-10'>
      <div className='w-full max-w-3xl bg-gray-800 p-5 rounded-xl border-2 border-gray-400'>
        <h1 className='text-3xl text-center p-5 font-light tracking-widest'>GetPassword</h1>
        <div className='flex justify-center pb-5'>
          <hr className='w-[50%] text-white text-center' />

        </div>
        <div className='flex'>
          <input type="text" 
            value = {password}
            className='outline-none w-full py-2 px-3 rounded-md text-black'
            placeholder='Password'
            ref={pwdRef}
            readOnly
          />
          {/* <button className='bg-blue-600 tracking-wider font-semibold rounded-md py-2 px-3 ml-1' onClick={()=>{
            window.navigator.clipboard.writeText(password)
          }}> */}
          <button className='bg-blue-600 tracking-wider font-semibold rounded-md py-2 px-3 ml-1 hover:bg-blue-800 transition-colors duration-300 ease-in-out'
          // We can even above button's onclick but this one will optimize the func call
          onClick={ copyPwd } >
            Copy
          </button>
        </div>

        <div className='flex justify-evenly py-5 text-xl'>
          {/* Length */}
          <div>
            <input type="range"
              min={5}
              max={50}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{
                setLength(e.target.value)
              }}
            />
            <label className='px-2'>Length: {length}</label>
          </div>

          {/* Symbol */}
          <div>
            <label className='px-2'>Symbols {symbolCheck}</label>
            <input type="checkbox"
              defaultChecked={symbolCheck}
              className='cursor-pointer'
              onChange={()=>{
                setSymbolCheck((prev)=> !prev)
              }}
            />
          </div>

          {/* Numbers */}
          <div>
            <label className='px-2'>Numbers {numCheck}</label>
            <input type="checkbox"
              defaultChecked={numCheck}
              className='cursor-pointer'
              onChange={()=>{
                setNumCheck((prev)=> !prev)
              }}
            />
          </div>
        </div>

      </div>
    </div>

    </>
  )
}

export default App
