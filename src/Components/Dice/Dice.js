import * as React from 'react';

class Dice extends React.Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     tab: 'one',
    //   }
    // }
  
    render() {
    //   const tab = this.state.tab;
    //   const setValue = (event, newValue) =>{
    //     this.setState({
    //       tab: newValue,
    //     })
    //   }
      return (
        <div 
            className="Dice"
            hidden={this.props.hidden}>
            <p>in dice</p>
        </div>
      );
    }
  }
  
  export default Dice;