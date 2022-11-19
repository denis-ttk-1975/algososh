import React, { useState, ChangeEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { Button } from '../ui/button/button';

import styles from './queue-page.module.css';
// import './queue-page.css';

export const QueuePage: React.FC = () => {
  const [word, setWord] = useState('253    ');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };
  const queueFromTask = Array.from(word);

  return (
    <SolutionLayout title='Очередь'>
      <div className={`${styles.queueContentArea}`}>
        <div className={`${styles.inputArea}`}>
          <Input isLimitText={true} type={'number'} max={4} extraClass={'input-style'} onChange={handleChange} />
          <Button text={'Добавить'} extraClass={''} />
          <Button text={'Удалить'} extraClass={''} />

          <Button text={'Очистить'} extraClass={'margin-left-68'} />
        </div>
        <div className={`${styles.circleArea}`}>
          {queueFromTask.map((elem, key, array) => {
            return (
              <div className={`${styles.countedCircleWithUnderText}`}>
                <div className={`${styles.countedCircle}`}>
                  <p>{key === 1 ? 'head' : ' '}</p>
                  <Circle letter={elem} />
                  <p>{key}</p>
                </div>
                <p>{key === 5 ? 'tail' : ' '}</p>
              </div>
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
