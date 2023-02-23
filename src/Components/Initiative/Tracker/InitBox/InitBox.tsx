import * as React from 'react';
import { TextField } from '@material-ui/core';
import { CallbackFunctionAny, ReactInputEvent } from 'src/Utils/types';

interface InitProps {
  initVal: string,
  onUpdate: CallbackFunctionAny,
  name: string,
}

export default function InitBox({ initVal, onUpdate, name }: InitProps) {  
  // derive initial state from props
  const [initiative, setInitiative] = React.useState(initVal);

  function handleChange(event: ReactInputEvent) {
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
