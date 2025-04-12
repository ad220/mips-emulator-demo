// components/RegisterTableComponent.js
import {useState} from 'react';
import './RegisterTable.css'

const RegisterTableComponent = ({
  registers,
  pc,
  hi,
  lo
}) => {

  const [useNameAsLabel, toggleLabel] = useState(false);

  return (
    <>
    <a>Registers</a>
    <br></br>
    <label>Show register index</label>
    <input type="checkbox" id="register-label-switch" value={useNameAsLabel} onChange={(e) => {toggleLabel(e.target.checked);}}></input>
    <div class="register-table">
          {Object.keys(registers).map((key, index) => (
            <div class="register-cell-container" key={key}>
              <div class="register-cell">
                <div class="register-header">
                  <a>{useNameAsLabel ? key : '$'+('0'+index).slice(-2)}</a>
                </div>
                <div class="register-value">
                  {registers[key]}
                </div>
              </div>
            </div>
          ))}
          <div class="register-cell-container">
            <div class="register-cell">
              <div class="register-header">
                  <a>$hi</a>
                </div>
                <div class="register-value">
                  {hi}
                </div>
            </div>
          </div>
          <div class="register-cell-container">
            <div class="register-cell">
              <div class="register-header">
                  <a>$lo</a>
                </div>
                <div class="register-value">
                  {lo}
                </div>
            </div>
          </div>
          <div class="register-cell-container" id="cell-pc">
            <div class="register-cell">
              <div class="register-header">
                  <a>$pc</a>
                </div>
                <div class="register-value">
                  {pc}
                </div>
            </div>
          </div>
    </div>
    </>
  );
};

export default RegisterTableComponent;
