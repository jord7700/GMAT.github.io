import * as React from 'react';
import { TextField } from '@material-ui/core';

export default function InitBox({ initVal, onUpdateInit }) {  
  // derive initial state from props
  const [initiative, setInitiative] = React.useState(initVal);

  function handleChange(event) {
    setInitiative(event.target.value);
    onUpdateInit(event);
  }

  return (
    <TextField 
        name="initiative" 
        value={initiative} 
        onChange={handleChange} 
        className="ShortTextField" 
        inputProps={{min: 0, style: { textAlign: 'center' }}}
        type="Number"
    />
  );
}