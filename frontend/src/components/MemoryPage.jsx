// components/MemoryPageComponent.js
import React from 'react';
import './MemoryPage.css'

const MemoryPageComponent = () => {
  // Exemple de données pour la mémoire
  const memory = Array(64).fill(0);

  return (
    <>
      <a>Memory</a>
      <div class="memory-pages">
        {memory.map((value, index) => (
          <div class="memory-cell-container">
            <div class="memory-cell">
              <div class="memory-header">
                <a>${('0'+index).slice(-2)}</a>
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
