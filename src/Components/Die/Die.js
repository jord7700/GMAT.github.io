import * as React from 'react';
import {Button} from '@material-ui/core';


export default function Die(props) {
  const changeDieCount = (value) => {
    props.onChange(value, props.index);
  }
  const handleClick = () => {
    props.onClick(props.value)
  };
  return (
    <div className='Die'>
      <Button 
        variant="outlined" 
        className='DieAdd' 
        onClick={() => changeDieCount(1)}
        key='0'>
          <span className="material-icons">add</span>
      </Button>
      <Button 
        variant="outlined" 
        className='DieSub' 
        onClick={() => changeDieCount(-1)}
        key='1'>
        <span className="material-icons">remove</span>
      </Button>
      <button
      className='DieButton'
      onClick={() => handleClick()}>
        {props.diceCount}D{props.value}
      </button>
    </div>
  );
}