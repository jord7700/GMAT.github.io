import * as React from 'react';

export default function Die(props) {
  const handleClick = () => {
    props.onClick(props.value)
  };
  return (
    <div>
      <input
        id="numDice"
        type="number"
        max='99'
        min='1'
      />
      <button
      onClick={() => handleClick(props.value)}>
        D{props.value}
      </button>
    </div>
  );
}