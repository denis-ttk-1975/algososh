import React, { useState, ChangeEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { Button } from '../ui/button/button';

import styles from './queue-page.module.css';
// import './queue-page.css';

export const QueuePage: React.FC = () => {
  const [word, setWord] = useState('hello');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };
  const arrayFromString = Array.from(word);

  return (
    <SolutionLayout title='Очередь'>
      <div className={`${styles.stringContentArea}`}>
        <div className={`${styles.inputArea}`}>
          <Input isLimitText={true} maxLength={11} extraClass={'string'} onChange={handleChange} />
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
