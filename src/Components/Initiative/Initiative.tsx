import * as React from 'react';
import InitiativeBar from './InitiativeBar/InitiativeBar';
import Groups from './Groups/Groups';
import Tracker from './Tracker/Tracker';
import { diceProps } from '../Dice/Dice';
import Party from './Party/Party';
import { Unit } from 'src/Utils/types';

interface InitiativeState {
  tab: string,
  units: Unit[],
}

class Initiative extends React.Component<diceProps> {
  state: InitiativeState;
  constructor(props: diceProps) {
    super(props);
    this.state = {
      tab: 'groups',
      units:[{
        id: '0',
        name: '',
        health: 0,
        bonus: 0,
        track: false,
        initiative: 0,
        player: false,
      },
      {
        id: '1',
        name: 'Jogn Man',
        health: 0,
        bonus: 0,
        track: true,
        initiative: 0,
        player: true,
      }],
    };
    this.handleUnitChange = this.handleUnitChange.bind(this);
  }

  handleUnitChange(value: any) {
    this.setState({
      units:value
    })
  }


  render() {
    const tab = (this.state as any).tab;
    const setValue = (_: any, newValue: any) =>{
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
            units={this.state.units}
            onGroupChange={this.handleUnitChange}
          />
          <Party
            hidden={tab!=='party'}
            units={this.state.units}
            onPartyChange={this.handleUnitChange}
          />
          <Tracker
            hidden={tab!=='tracker'}
            units={this.state.units}
            onUnitChange={this.handleUnitChange}
          />
        </div>
      </div>
    );
  }
}

export default Initiative;