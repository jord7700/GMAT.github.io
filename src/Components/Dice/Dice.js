import * as React from 'react';
import Die from '../Die/Die';

class Dice extends React.Component {
  constructor(props) {
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
          val: 12, 
          numDice: 1,
        },
        {
          val: 20, 
          numDice: 1,
        },
      ],
      modifierTotal: 0,
      results: 0,
      rollStr: 'firstRoll'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDieCount = this.handleDieCount.bind(this);
  }

  handleChange(event) {
    this.setState({
      modifierTotal: parseInt(event.target.value, 10),
    });
  }

  handleClick(value){
    const index = this.state.diceCollection.findIndex((e) => e.val === value);
    const diceCount = this.state.diceCollection[index].numDice;
    const randVal =  (retVal) =>{
      retVal = 0;
      for(let i = 0; i < diceCount; i++){
        const newVal = Math.floor(Math.random() * (parseInt(value, 10))) + 1;
        console.log(newVal);
        retVal += newVal;
      }
      return retVal;
    }
    const retVal = randVal() + this.state.modifierTotal;
    const rollStr = () =>{
      if(this.state.modifierTotal === 0){
        return diceCount + 'D' + value;
      } else if(this.state.modifierTotal > 0){
        return diceCount + 'D' + value + ' + ' + this.state.modifierTotal;
      } else if(this.state.modifierTotal < 0){
        return diceCount + 'D' + value + ' - ' + Math.abs(this.state.modifierTotal);
      }
    };
    this.setState({
      results: retVal,
      rollStr: rollStr()
    });
  }

  handleDieCount(event, index){
    let items = [...this.state.diceCollection];
    let item = {...items[index]};
    item.numDice = parseInt(event.target.value, 10);
    items[index] = item;
    this.setState({diceCollection: items});
  }

  render() {
    return (
      <div
          className="Dice"
          hidden={this.props.hidden}>
          <p>in dice</p>
          <div className='DieSelector'>
            {
              [...this.state.diceCollection].map((e, i) =>
                <Die
                  key={i}
                  onChange={(e) => this.handleDieCount(e, i)}
                  onClick={this.handleClick}
                  index={i}
                  diceCount={e.numDice}
                  value={e.val}
                />
              )
            }
            <div className='Modifiers'>
              <input 
                id="modifier"
                type="number" 
                onChange={this.handleChange}
                value={this.state.modifierTotal}
                />
            </div>
          </div>
          <div className='Results'>
            <p>{this.state.rollStr}: {this.state.results}</p>
          </div>
      </div>
    );
  }
}
  
  export default Dice;