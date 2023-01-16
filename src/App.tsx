import React, { useState } from 'react';
import TopBar from './Components/TopBar/TopBar';
import Dice from './Components/Dice/Dice';
import Initiative from './Components/Initiative/Initiative';
import './App.css';

export default function App() {
  const [tab, setTab] = useState('one')
  const tabChange = (_event: any, newValue: any) => setTab(newValue)
  return (
    <div className="App">
      <div className="App-header">

        <TopBar
          value={tab}
          onChange={tabChange}
        />
      </div>
      <Dice hidden={tab!=='one'}/>
      <Initiative hidden={tab!=='two'}/>
      <p hidden={tab!=='three'}>rules</p>
    </div>
  );
}