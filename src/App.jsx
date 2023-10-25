import { useCallback, useEffect, useRef } from "react";
import { useState } from "react"


function App() {
  const [length, setLength] = useState(4);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const copyPaasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length)
    
    window.navigator.clipboard.writeText(password);
  }, [password, length])

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*[]{}~`"
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword])


  useEffect(() => { 
    passwordGenerator()
  }, [length, charAllowed, numberAllowed, passwordGenerator])


  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center mb-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref= {passwordRef}
          />
          <button className="bg-blue-700 outline-none active:bg-blue-800 text-white px-3 py-0.5 shrink-0"
          onClick={copyPaasswordToClipboard}
          >Copy</button>
        </div>
        <div className="flex  text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer accent-blue-700"
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="numberInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Characters</label>
          </div>


        </div>

      </div>
    </>
  )
}

export default App
