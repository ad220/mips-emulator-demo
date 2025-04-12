// components/MemoryPageComponent.js
import {useState} from 'react';
import './MemoryPage.css'

const MemoryPageComponent = ({
  memory
}) => {

  const [pageIndex, setPageIndex] = useState(0);
  const [oldMemory, setOldMemory] = useState({});
  const pageIndexes = Object.keys(memory);

  if (oldMemory != memory) {
    setPageIndex(0);
    setOldMemory(memory);
    return;
  }
  
  console.log(pageIndex);
  console.log(pageIndexes.findIndex((_, i, o) => {pageIndex==o[i];}))

  return (
    <>
      <a>Memory</a> <br></br>
      {
        pageIndex>0 &&
        <button onClick={() => {setPageIndex(pageIndex-1);}}>Previous</button>
      }
      <a>Page {pageIndexes[pageIndex]*1+1}/{pageIndexes[pageIndexes.length-1]*1+1}</a>
      {
        pageIndex<pageIndexes.length-1 &&
        <button onClick={() => {setPageIndex(pageIndex+1);}}>Next</button>
      }
      <div class="memory-pages">
        {memory[pageIndexes[pageIndex]].map((value, index) => (
          <div class="memory-cell-container">
            <div class="memory-cell">
              <div class="memory-header">
                <a>{('00'+index*4).slice(-3)}</a>
              </div>
              <div class="register-value">
                {value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MemoryPageComponent;
