// components/RegisterTableComponent.js
import {useState} from 'react';
import './RegisterTable.css'

import TableCellComponent from './TableCell'

const RegisterTableComponent = ({
  registers,
  pc,
  hi,
  lo
}) => {

  const [useNameAsLabel, toggleLabel] = useState(false);

  return (
    <div class="register-display">
      <a class="register-title">Registers</a>
      <div class="register-options">
        <label>Show register index</label>
        <input type="checkbox" id="register-label-switch" value={useNameAsLabel} onChange={(e) => {toggleLabel(e.target.checked);}}></input>
      </div>
      <div class="register-table">
            {Object.keys(registers).map((key, index) => (
              <TableCellComponent
                className="register"
                key={key}
                header={useNameAsLabel ? key : '$'+('0'+index).slice(-2)}
                value={registers[key]}
              />
            ))}
            <TableCellComponent className="register" key="$hi" header="hi" value={hi}/>
            <TableCellComponent className="register" key="$lo" header="lo" value={lo}/>
            <TableCellComponent className="register cell-pc" key="$pc" header="pc" value={pc}/>
      </div>
    </div>
  );
};

export default RegisterTableComponent;
