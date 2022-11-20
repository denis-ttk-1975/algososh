import React, { useState, ChangeEvent, MouseEventHandler, MouseEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { Button } from '../ui/button/button';

import styles from './string.module.css';
import './string.css';

let arrayFromString: string[] = [];

export const StringComponent: React.FC = () => {
  const [word, setWord] = useState('');
  const [isStringTurning, setStringTurning] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setStringTurning(!isStringTurning);
    arrayFromString = Array.from(word);
    console.log('arrayFromString1: ', arrayFromString);
    setStringTurning(!isStringTurning);
  };
  console.log('arrayFromString2: ', arrayFromString);

  return (
    <SolutionLayout title='Строка'>
      <div className={`${styles.stringContentArea}`}>
        <div className={`${styles.inputArea}`}>
          <Input isLimitText={true} maxLength={11} extraClass={'input-style'} onChange={handleChange} />
          <Button text={'Развернуть'} extraClass={'button-style'} onClick={handleClick} />
        </div>
        <div className={`${styles.circleArea}`}>
          <div></div>
          {arrayFromString.map((elem, index) => {
            return <Circle letter={elem} key={index} />;
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
