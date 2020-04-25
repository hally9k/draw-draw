import React from 'react';
import starMonster from './assets/StarMonster.svg';
import spiralMonster from './assets/SpiralMonster.svg';
import cravingMonster from './assets/CravingMonster.svg';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={starMonster} className="star-monster" alt="star-monster" />
        <img src={spiralMonster} className="spiral-monster" alt="spiral-monster" />
        <img src={cravingMonster} className="craving-monster" alt="craving-monster" />
      </header>
    </div>
  );
}

export default App;
