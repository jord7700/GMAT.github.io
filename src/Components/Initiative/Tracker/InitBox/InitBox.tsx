import * as React from 'react';
import { TextField } from '@material-ui/core';

export default function InitBox({ initVal, onUpdate, name }: any) {  
  // derive initial state from props
  const [initiative, setInitiative] = React.useState(initVal);

  function handleChange(event: any) {
    setInitiative(event.target.value);
    onUpdate(event);
  }

  return (
    <TextField
        name={name}
        value={initiative} 
        onChange={handleChange} 
        className="ShortTextField" 
        inputProps={{min: 0, style: { textAlign: 'center' }}}
        type="Number"
    />
  );
}