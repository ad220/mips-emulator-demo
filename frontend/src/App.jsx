import { useState } from 'react'
import './App.css'
import Terminal from './assets/terminal.png'

// import EditorComponent from './components/Editor'
import MemoryPageComponent from './components/MemoryPage'
import RegisterTableComponent from './components/RegisterTable'

function App() {
  
  // Init registers before first run
  var registerInit = {}
  for (let index = 0; index < 32; index++) {
    registerInit['$'+('0'+index).slice(-2)] = 0;
  }
  
  // Init memory page before first run
  var memoryInit = {0: []}
  for (let index = 0; index < 64; index++) {
    memoryInit[0].push(0);
  }

  const [code, setCode] = useState('');
  const [registers, setRegisters] = useState(registerInit);
  const [memory, setMemory] = useState(memoryInit);
  const [pc, setPc] = useState(0);
  const [hi, setHi] = useState(0);
  const [lo, setLo] = useState(0);

  // console.log(registers);

  async function handleRun() {
    const API_URL = "http://localhost:8000"

    if (!code.trim()) {
      setError('Please enter or select MIPS code');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/emulate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error running emulator');
      }

      const data = await response.json();
      
      // setOutput(data.output);
      setRegisters(data.registers);
      setPc(data.pc);
      setHi(data.hi);
      setLo(data.lo);
      setMemory(data.memory);
    } catch (err) {
      // setError(err.message);
      console.error(err);
    }
  }

  return (
    <div>
      <header>
      {/* <Terminal/> */}
      <div>MIPS Emulator Demo</div>
      </header>
      <div id="demo-container">
        <div id="input-output">
          <div class="editor-container">
            <div class="editor-header">
              {/* <select>
              </select> */}
              {/* <button onClick={handleDebug}>Debug</button> */}
              <button class="editor-run-button" onClick={handleRun}>Run</button>
            </div>
            <textarea class="editor-text-input"
              placeholder='Enter MIPS instructions'
              value={code}
              onChange={(e) => {setCode(e.target.value);}}
            />
          </div>
          {/* <StandardOutputComponent/> */}
        </div>
        <div id="state-view">
          <RegisterTableComponent registers={registers} pc={pc} hi={hi} lo={lo}/>
          <MemoryPageComponent memory={memory}/>
        </div>
      </div>
    </div>
  )
}

export default App
