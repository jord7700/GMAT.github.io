import * as React from 'react';
import InitiativeBar from './InitiativeBar/InitiativeBar';
import Groups from './Groups/Groups';
import Tracker from './Tracker/Tracker';
import { diceProps } from '../Dice/Dice';
import Party from './Party/Party';

interface InitiativeState {
  tab: string,
  groups: Groups[],
  party: Party[],
}

interface Groups {
  name: string,
  count: number,
  health: number,
  bonus: number,
  track: boolean,
}

interface Party {
  name: string,
  health: number,
  bonus: number,
  track: boolean,
}

class Initiative extends React.Component<diceProps> {
  state: InitiativeState;
  constructor(props: diceProps) {
    super(props);
    this.state = {
      tab: 'groups',
      groups:[{
        name: '',
        count: 0,
        health: 0,
        bonus: 0,
        track: true
      }],
      party:[{
        name: '',
        health: 0,
        bonus: 0,
        track: true
      }]
    };
    this.handleGroupChange = this.handleGroupChange.bind(this);
    this.handlePartyChange = this.handlePartyChange.bind(this);
  }

  handleGroupChange(value: any) {
    this.setState({
      groups:value
    })
  }

  handlePartyChange(value: any) {
    this.setState({
      party:value
    })
  }

  render() {
    const tab = (this.state as any).tab;
    const setValue = (event: any, newValue: any) =>{
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
            groups={(this.state as any).groups}
            onGroupChange={this.handleGroupChange}
          />
          <Party
            hidden={tab!=='party'}
            party={(this.state as any).party}
            onPartyChange={this.handlePartyChange}
          />
          <Tracker
            hidden={tab!=='tracker'}
            groups={(this.state as any).groups}
            party={(this.state as any).party}
          />
        </div>
      </div>
    );
  }
}
  
  export default Initiative;