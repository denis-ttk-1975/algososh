import React, { useState, ChangeEvent, useRef, useEffect, MouseEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { Button } from '../ui/button/button';

import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from './../../constants/delays';

import styles from './stack-page.module.css';
import './stack-page.css';

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

  const [stackForRender, setStackForRender] = useState<number[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWord(+event.target.value);
  };

  const handleAddClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (word) {
      setStackForRender([...stackForRender, word]);
    }
  };

  const handleDeleteClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (stackForRender.length <= 1) {
      setStackForRender([]);
    } else {
      let arrayWithoutLastElement = [...stackForRender];
      arrayWithoutLastElement.pop();
      setStackForRender(arrayWithoutLastElement);
    }
  };

  const handlePurgeClick = (event: MouseEvent<HTMLButtonElement>) => {
    setStackForRender([]);
  };

  return (
    <SolutionLayout title='Стек'>
      <div className={`${styles.stackContentArea}`}>
        <div className={`${styles.inputArea}`}>
          <Input isLimitText={true} type={'number'} max={9999} extraClass={'input-style'} onChange={handleChange} />
          <Button text={'Добавить'} extraClass={''} onClick={handleAddClick} name={'add'} value={'add'} />
          <Button text={'Удалить'} extraClass={''} onClick={handleDeleteClick} />

          <Button text={'Очистить'} extraClass={'margin-left-68'} onClick={handlePurgeClick} />
        </div>
        <div className={`${styles.circleArea}`}>
          {stackForRender.map((elem, key, array) => {
            return (
              <div className={`${styles.countedCircle}`} key={key}>
                <Circle letter={String(elem)} head={key !== array.length - 1 ? ' ' : 'top'} index={key} />
              </div>
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
