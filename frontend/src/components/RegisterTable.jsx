// components/RegisterTableComponent.js
import React from 'react';
import './RegisterTable.css'

const RegisterTableComponent = ({
  registers,
  pc,
  hi,
  lo
}) => {

  return (
    <>
    <a>Registers</a>
    <div class="register-table">
          {Object.keys(registers).map((key) => (
            <div class="register-cell-container">
              <div class="register-cell">
                <div class="register-header">
                  <a>${key}</a>
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
                  <a>$HI</a>
                </div>
                <div class="register-value">
                  {hi}
                </div>
            </div>
          </div>
          <div class="register-cell-container">
            <div class="register-cell">
              <div class="register-header">
                  <a>$LO</a>
                </div>
                <div class="register-value">
                  {lo}
                </div>
            </div>
          </div>
          <div class="register-cell-container" id="cell-pc">
            <div class="register-cell">
              <div class="register-header">
                  <a>$PC</a>
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
