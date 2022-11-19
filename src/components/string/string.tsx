import React, { useState, ChangeEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { Button } from '../ui/button/button';

import styles from './string.module.css';
import './string.css';

export const StringComponent: React.FC = () => {
  const [word, setWord] = useState('hello');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };
  const arrayFromString = Array.from(word);

  return (
    <SolutionLayout title='Строка'>
      <div className={`${styles.stringContentArea}`}>
        <div className={`${styles.inputArea}`}>
          <Input isLimitText={true} maxLength={11} extraClass={'input-style'} onChange={handleChange} />
          <Button text={'Развернуть'} extraClass={'button-style'} />
        </div>
        <div className={`${styles.circleArea}`}>
          {arrayFromString.map((elem) => {
            return <Circle letter={elem} />;
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
