import * as React from 'react';
import Die from '../Die/Die';

interface DiceState {
  diceCollection: dCol[],
  modifierTotal: number,
  history: History[],
}

interface dCol {
  val: number,
  numDice: number,
  customDie?: boolean
}

interface History {
  results: number,
  rollStr: string,
}

export interface diceProps {
  hidden: boolean,
}


class Dice extends React.Component<diceProps> {
  state: DiceState;
  constructor(props: diceProps) {
    super(props);
    this.state = {
      diceCollection: [
        {
          val: 4, 
          numDice: 1,
        },
        {
          val: 6, 
          numDice: 1,
        }, 
        {
          val: 8, 
          numDice: 1,
        },
        {
          val: 10, 
          numDice: 1,
        },
        {
          val: 12, 
          numDice: 1,
        },
        {
          val: 20, 
          numDice: 1,
        },
        {
          val: 0,
          numDice: 1,
          customDie: true
        },
      ],
      modifierTotal: 0,
      history: []
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDieCount = this.handleDieCount.bind(this);
    this.resetDice = this.resetDice.bind(this);
    this.clearHistory = this.clearHistory.bind(this);
  }

  handleChange(event: any) {
    this.setState({
      modifierTotal: parseInt(event.target.value, 10),
    });
  }

  handleClick(value: number){
    const index = this.state.diceCollection.findIndex((e) => e.val === value);
    const diceCount = this.state.diceCollection[index].numDice;
    const randVal =  (): number =>{
      let retVal = 0;
      for(let i = 0; i < diceCount; i++){
        const newVal = value != 0 ? Math.floor(Math.random() * value) + 1 : 0;
        retVal += newVal;
      }
      return retVal;
    }
    const retVal: number = randVal() + this.state.modifierTotal;
    const rollStr = (): string => {
      if(this.state.modifierTotal === 0){
        return diceCount + 'D' + value;
      } else if(this.state.modifierTotal > 0){
        return diceCount + 'D' + value + ' + ' + this.state.modifierTotal;
      } else if(this.state.modifierTotal < 0){
        return diceCount + 'D' + value + ' - ' + Math.abs(this.state.modifierTotal);
      }
      return 'BAD ROLL';
    };
    this.setState({
      history: this.state.history.concat([{
        results: retVal,
        rollStr: rollStr()
      }])
    });
  }

  handleDieCount(value: number, index: number){
    let items = [...this.state.diceCollection];
    let item = {...items[index]};
    item.numDice = value + item.numDice === 0 ? 1 : value + item.numDice;
    items[index] = item;
    this.setState({diceCollection: items});
  }

  resetDice(){
    const items = [...this.state.diceCollection];
    items.forEach(element => {
      element.numDice = 1
    });
    this.setState({diceCollection: items});
  }

  clearHistory(){
    this.setState({
      history: []
    })
  }

  render() {
    const history = this.state.history;
    const current = history[history.length -1];
    const rollList = history.map((roll, index) => {
      return(
        <p key={index}>{roll.rollStr} : {roll.results}</p>
      );
    });
    return (
      <div
        className="Dice"
        style={{display: this.props.hidden === false ? 'grid' : 'none'}}
      >
        <div className='DieSelector'>
          <button
            className='DieButton'
            onClick={this.resetDice}>
              Reset All Dice
          </button>
          {
            [...this.state.diceCollection].map((e, i) =>
              <Die
                key={i}
                onChange={this.handleDieCount}
                onClick={this.handleClick}
                index={i}
                diceCount={e.numDice}
                value={e.val}
              />
            )
          }
          <div className='Modifiers'>
            <span>Modifier: </span>
            <input 
              id="modifier"
              type="number" 
              onChange={this.handleChange}
              value={this.state.modifierTotal}
              />
          </div>
        </div>
        <div className='RollHistory'>
          <button
            className='HistoryButton'
            onClick={this.clearHistory}>
              Reset History
          </button>
          {rollList}
        </div>
        <div className='Results'>
          {current && 
          <p><span>{current.rollStr} : {current.results}</span></p>
          }
        </div>
      </div>
    );
  }
}
  
  export default Dice;