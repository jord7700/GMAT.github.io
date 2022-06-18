import * as React from 'react';
import InitiativeBar from './InitiativeBar/InitiativeBar';
import Groups from './Groups/Groups';
import Tracker from './Tracker/Tracker';
import Party from './Party/Party';

class Initiative extends React.Component {
  constructor(props) {
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

  handleGroupChange(value) {
    this.setState({
      groups:value
    })
  }

  handlePartyChange(value) {
    this.setState({
      party:value
    })
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
            onGroupChange={this.handleGroupChange}
          />
          <Tracker
            hidden={tab!=='tracker'}
            groups={this.state.groups}
            party={this.state.party}
            onGroupChange={this.handleGroupChange}
          />
          <Party
            hidden={tab!=='party'}
            party={this.state.party}
            onPartyChange={this.handlePartyChange}
          />
        </div>
      </div>
    );
  }
}
  
  export default Initiative;