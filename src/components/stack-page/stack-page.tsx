import React, { useState, ChangeEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { Button } from '../ui/button/button';

import styles from './stack-page.module.css';
import './stack-page.css';

export const StackPage: React.FC = () => {
  const [word, setWord] = useState('1234');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };
  const stackFromTask = Array.from(word);

  return (
    <SolutionLayout title='Стек'>
      <div className={`${styles.stackContentArea}`}>
        <div className={`${styles.inputArea}`}>
          <Input isLimitText={true} type={'number'} max={4} extraClass={'input-style'} onChange={handleChange} />
          <Button text={'Добавить'} extraClass={''} />
          <Button text={'Удалить'} extraClass={''} />

          <Button text={'Очистить'} extraClass={'margin-left-68'} />
        </div>
        <div className={`${styles.circleArea}`}>
          {stackFromTask.map((elem, key, array) => {
            return (
              <div className={`${styles.countedCircle}`}>
                <p>{key !== array.length - 1 ? ' ' : 'top'}</p>
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
