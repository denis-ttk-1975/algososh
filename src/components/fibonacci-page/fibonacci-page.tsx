import React, { useState, ChangeEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { Button } from '../ui/button/button';

import styles from './fibonacci.module.css';
// import './fibonacci.css';

export const FibonacciPage: React.FC = () => {
  const [word, setWord] = useState('112345678998');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };
  const fibonacciRow = Array.from(word);

  return (
    <SolutionLayout title='Последовательность Фибоначчи'>
      <div className={`${styles.fibonacciContentArea}`}>
        <div className={`${styles.inputArea}`}>
          <Input isLimitText={true} type={'number'} max={19} extraClass={'input-style'} onChange={handleChange} />
          <Button text={'Рассчитать'} extraClass={'button-style'} />
        </div>
        <div className={`${styles.circleArea}`}>
          {fibonacciRow.map((elem, key) => {
            return (
              <div className={`${styles.countedCircle}`}>
                <Circle letter={elem} />
                <p>{key}</p>
              </div>
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
