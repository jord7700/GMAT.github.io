import * as React from 'react';
import Die from '../Die/Die';
import { Button } from '@material-ui/core';
import { Dispatch, SetStateAction, useState } from 'react';

// interface DiceState {
//   diceCollection: dCol[],
//   modifierTotal: number,
//   history: History[],
// }

interface dCol {
  val: number,
  numDice: number,
  customDie?: boolean
}

interface History {
  results: number,
  rollStr: string,
}

export interface diceProps {
  hidden: boolean,
}

function randVal(value: number, diceCount: number) {
  let retVal = 0;
  for(let i = 0; i < diceCount; i++){
    const newVal = value != 0 ? Math.floor(Math.random() * value) + 1 : 0;
    retVal += newVal;
  }
  return retVal;
}

export default function Dice(props: diceProps) {
  
  const [history, setHistory]: [History[], Dispatch<SetStateAction<History[]>>] = useState<History[]>([]);
  
  const [modifierTotal, setModifier] = useState<number>(0);
  
  const [diceCollection, setDiceCollection]: [dCol[], Dispatch<SetStateAction<dCol[]>>] = useState<dCol[]>(
    [
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
        val: 10, 
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
      {
        val: 0,
        numDice: 1,
        customDie: true
      },
    ]
  );
  
  const current = history[history.length -1];

  const handleClick = (value: number, customMod: number | undefined = undefined, customCount: number | undefined = undefined) => {
    const index = diceCollection.findIndex((e) => e.val === value);
    const diceCount = customCount ? customCount : diceCollection[index].numDice;
    const mod = customMod ? customMod : modifierTotal;
    const retVal: number = randVal(value, diceCount) + mod;
    const rollStr = (): string => {
      if(mod === 0){
        return diceCount + 'D' + value;
      } else if(mod > 0){
        return diceCount + 'D' + value + ' + ' + mod;
      } else if(mod < 0){
        return diceCount + 'D' + value + ' - ' + Math.abs(mod);
      }
      return 'BAD ROLL';
    };
    setHistory(history => [...history,  {
      results: retVal,
      rollStr: rollStr()
    }]);
  }

  const handleDieCount = (value: number, index: number) => {
    const items = [...diceCollection];
    const item = {...items[index]};
    item.numDice = value + item.numDice === 0 ? 1 : value + item.numDice;
    items[index] = item;
    setDiceCollection(items);
  }

  const customDieChange = (value: number) => {
    const betterNum = Number(value);
    const allDice = [...diceCollection];
    (allDice.at(-1) as dCol).val = betterNum;
    setDiceCollection(allDice);
  }

  const handleChange = (event: any) => {
    console.log(parseInt(event.target.value, 10));
    setModifier(parseInt(event.target.value, 10));
    console.log(modifierTotal);
  };

  const historyRoll =(roll: History) => {
    const rollStr = roll.rollStr;
    let strArr = rollStr.split('D');
    const diceCount = strArr[0];
    strArr = strArr[1].split('+');
    const value = strArr[0];
    const mod = strArr[1] ? parseInt(strArr[1]) : 0;
    handleClick(
      parseInt(value), 
      mod, 
      parseInt(diceCount));
  }

  const clearHistory = () => {
    setHistory([]);
  }

  const resetDice = () => {
    const items = [...diceCollection];
    items.forEach(element => {
      element.numDice = 1
    });
    setDiceCollection(items);
  }

  const rollList = history.map((roll, index) => {
    return(
      <Button 
        key={index}
        onClick={() => {
          historyRoll(roll);
        }}
      >
        <p>{roll.rollStr} : {roll.results}</p>
      </Button>
    );
  });
  return (
    <div
      className="Dice"
      style={{display: props.hidden === false ? 'grid' : 'none'}}
    >
      <div className='DieSelector'>
        <button
          className='DieButton'
          onClick={resetDice}>
            Reset All Dice
        </button>
        {
          [...diceCollection].map((e, i) =>
            <Die
              key={i}
              onChange={handleDieCount}
              onClick={handleClick}
              onCustomDieChange={customDieChange}
              index={i}
              diceCount={e.numDice}
              customDie={e.customDie}
              value={e.val}
            />
          )
        }
        <div className='Modifiers'>
          <span>Modifier: </span>
          <input
            id="modifier"
            type="number"
            onChange={handleChange}
            value={modifierTotal}
            />
        </div>
      </div>
      <div className='RollHistory'>
        <button
          className='HistoryButton'
          onClick={clearHistory}>
            Reset History
        </button>
        {rollList}
      </div>
      <div className='Results'>
        {current && 
        <p><span>{current.rollStr} : {current.results}</span></p>
        }
      </div>
    </div>
  );
}