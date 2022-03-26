import * as React from 'react';
import InitiativeBar from './InitiativeBar/InitiativeBar';
import { Box, Button, TextField } from '@material-ui/core';
import Groups from './Groups/Groups';

class Initiative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'groups',
      groups:{
        name: '',
        count: 0,
        health: 0,
        bonus: 0,
        track: true
      }
    };
  }

  render() {
    const tab = this.state.tab;
    const setValue = (event, newValue) =>{
      this.setState({
        tab: newValue,
      })
    }
    return (
      <div
        style={{display: this.props.hidden === false ? 'grid' : 'none'}}
      >
        <div className="App-header">
          <InitiativeBar             
            value={tab}
            onChange={setValue}/>
        </div>
        <div className="Initiative">
          <Groups 
            hidden={tab!=='groups'}
            groups={this.state.groups}
          />
        </div>
      </div>
    );
  }
}
  
  export default Initiative;