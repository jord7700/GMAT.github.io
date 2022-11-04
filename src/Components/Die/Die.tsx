import * as React from 'react';
import { Button, TextField } from '@material-ui/core';

export default function Die(props: any) {
  const changeDieCount = (value: number) => {
    props.onChange(value, props.index);
  };
  const handleClick = () => {
    props.onClick(props.value)
  };
  const onChange = (event: any) => {
    let value;
    if(event.target.value == ''){
      value = 0;
    } else {
      value = event.target.value;
    }
    props.onCustomDieChange(value);
  }
  return (
    <div className='Die'>
      <Button 
        variant="outlined" 
        className='DieAdd' 
        size="small"
        onClick={() => changeDieCount(1)}
      >
          <span className="material-icons">add</span>
      </Button>
      <Button 
        variant="outlined" 
        className='DieSub' 
        onClick={() => changeDieCount(-1)}
      >
        <span className="material-icons">remove</span>
      </Button>
      <button
      className='DieButton'
      onClick={() => handleClick()}
      >
        <span id='CustomDie'>
          {props.diceCount}D
          {props.customDie ? 
            <TextField 
              value={props.value}
              onChange={onChange}
            />
            : props.value 
          }
        </span>
      </button>
    </div>
  );
}