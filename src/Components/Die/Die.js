import * as React from 'react';

export default function Die(props) {
  const handleClick = () => {
    props.onClick(props.value)
  };
  return (
      <button
      onClick={() => handleClick(props.value)}>
        D{props.value}
      </button>
  );
}