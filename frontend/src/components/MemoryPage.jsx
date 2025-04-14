// components/MemoryPageComponent.js
import {useState} from 'react';
import './MemoryPage.css'

import TableCellComponent from './TableCell'

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

  return (
    <div class="memory-pages">
      <p class="memory-title">Memory</p>
      <div class="page-browser">
          <button class="mono" disabled={pageIndex<=0} onClick={() => {setPageIndex(pageIndex-1);}}>&lt;</button>
          <div>Page <index class="mono">{pageIndexes[pageIndex]*1+1}/{pageIndexes[pageIndexes.length-1]*1+1}</index></div>
          <button class="mono" disabled={pageIndex>=pageIndexes.length-1} onClick={() => {setPageIndex(pageIndex+1);}}>&gt;</button>
      </div>
      <div class="memory-table">
        {memory[pageIndexes[pageIndex]].map((value, index) => (
          <TableCellComponent className="memory" key={index} header={index*4} value={value}/>
        ))}
      </div>
    </div>
  );
};

export default MemoryPageComponent;
