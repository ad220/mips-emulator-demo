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

  const registerNames = ["$zero","$at","$v0","$v1","$a0","$a1","$a2","$a3","$t0","$t1","$t2","$t3","$t4","$t5","$t6","$t7","$s0","$s1","$s2","$s3","$s4","$s5","$s6","$s7","$t8","$t9","$k0","$k1","$gp","$sp","$fp","$ra"]

  const [useNameAsLabel, toggleLabel] = useState(false);

  return (
    <div class="register-display">
      <p class="register-title">Registers</p>
      <div class="register-options">
        <label>Show register index</label>
        <input type="checkbox" id="register-label-switch" value={useNameAsLabel} onChange={(e) => {toggleLabel(e.target.checked);}}></input>
      </div>
      <div class="register-table">
            {Object.keys(registers).map((key, index) => (
              <TableCellComponent
                className="register"
                key={key}
                header={useNameAsLabel ? registerNames[index] : '$'+('0'+index).slice(-2)}
                value={registers[key]}
              />
            ))}
            <TableCellComponent className="register" key="$hi" header="$hi" value={hi}/>
            <TableCellComponent className="register" key="$lo" header="$lo" value={lo}/>
            <TableCellComponent className="register cell-pc" key="$pc" header="$pc" value={pc}/>
      </div>
    </div>
  );
};

export default RegisterTableComponent;
