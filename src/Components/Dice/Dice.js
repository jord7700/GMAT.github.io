import * as React from 'react';
import Die from '../Die/Die';

class Dice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diceCollection: [
        {
          val: 4, 
          numDice: 0,
        },
        {
          val: 6, 
          numDice: 0,
        }, 
        {
          val: 8, 
          numDice: 0,
        },
        {
          val: 12, 
          numDice: 0,
        },
        {
          val: 20, 
          numDice: 0,
        },
      ],
      modifierTotal: 0,
      results: 0,
      rollStr: 'firstRoll'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      modifierTotal: parseInt(event.target.value, 10),
    });
  }

  handleClick(value, numDice){
    console.log(numDice);
    // eslint-disable-next-line
    const randVal = Math.floor(Math.random() * (parseInt(value))) + 1;
    const retVal = randVal + this.state.modifierTotal;
    const rollStr = () =>{
      if(this.state.modifierTotal === 0){
        return 'D' + value;
      } else if(this.state.modifierTotal > 0){
        return 'D' + value + ' + ' + this.state.modifierTotal;
      } else if(this.state.modifierTotal < 0){
        return 'D' + value + ' - ' + Math.abs(this.state.modifierTotal);
      }
    };
    this.setState({
      results: retVal,
      rollStr: rollStr()
    });
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
                <Die key={i} onClick={this.handleClick} value={e.val}>d{e.val}</Die>
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