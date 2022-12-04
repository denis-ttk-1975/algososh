import React, { useState, ChangeEvent, useRef, useEffect, MouseEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { Button } from '../ui/button/button';

import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from './../../constants/delays';

import styles from './stack-page.module.css';
import './stack-page.css';

let stackFromTask: number[] = [];

export const StackPage: React.FC = () => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // clear timer Timeout when unmounted to prevent memory leak

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const [word, setWord] = useState<number | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWord(+event.target.value);
  };

  const handleAddClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (word) {
      stackFromTask.push(word);
    }
  };

  const handleDeleteClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (stackFromTask.length) {
      stackFromTask.pop();
    }
  };

  const handlePurgeClick = (event: MouseEvent<HTMLButtonElement>) => {
    stackFromTask = [];
  };

  return (
    <SolutionLayout title='Стек'>
      <div className={`${styles.stackContentArea}`}>
        <div className={`${styles.inputArea}`}>
          <Input isLimitText={true} type={'number'} max={9999} extraClass={'input-style'} onChange={handleChange} />
          <Button text={'Добавить'} extraClass={''} onClick={handleAddClick} />
          <Button text={'Удалить'} extraClass={''} onClick={handleDeleteClick} />

          <Button text={'Очистить'} extraClass={'margin-left-68'} onClick={handlePurgeClick} />
        </div>
        <div className={`${styles.circleArea}`}>
          {stackFromTask.map((elem, key, array) => {
            return (
              <div className={`${styles.countedCircle}`} key={key}>
                <p>{key !== array.length - 1 ? ' ' : 'top'}</p>
                <Circle letter={String(elem)} />
                <p>{key}</p>
              </div>
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
