import React from 'react';
import TopBar from './Components/TopBar/TopBar';
import Dice from './Components/Dice/Dice';
import Initiative from './Components/Initiative/Initiative';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'two',
    }
  }

  render() {
    const tab = this.state.tab;
    const setValue = (event, newValue) =>{
      this.setState({
        tab: newValue,
      })
    }
    return (
      <div className="App">
        <div className="App-header">
          <TopBar
            value={tab}
            onChange={setValue}
          />
        </div>
        <Dice hidden={tab!=='one'}/>
        <Initiative hidden={tab!=='two'}>initiative</Initiative>
        <p hidden={tab!=='three'}>rules</p>
      </div>
    );
  }
}

export default App;
