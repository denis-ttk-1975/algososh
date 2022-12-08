import React, { useState, ChangeEvent, useRef, useEffect, MouseEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { Button } from '../ui/button/button';
import { ElementStates } from '../../types/element-states';

import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from './../../constants/delays';

import { Queue } from './queue-class';

import styles from './queue-page.module.css';

export const QueuePage: React.FC = () => {
  const [word, setWord] = useState('');

  const queueForRender = useRef(new Queue());

  const [animation, setAnimation] = useState<'head' | 'tail' | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setAnimation(null);
    }, SHORT_DELAY_IN_MS);
  }, [animation]);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // clear timer Timeout when unmounted to prevent memory leak

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };

  const handleAddClick = (event: MouseEvent<HTMLButtonElement>) => {
    queueForRender.current.add(word);

    setWord('');
    setAnimation('tail');
  };

  const handleDeleteClick = (event: MouseEvent<HTMLButtonElement>) => {
    queueForRender.current.delete();
    setAnimation('head');
  };

  const handlePurgeClick = (event: MouseEvent<HTMLButtonElement>) => {
    queueForRender.current.clear();
    setAnimation('tail');
  };

  return (
    <SolutionLayout title='Очередь'>
      <div className={`${styles.queueContentArea}`}>
        <div className={`${styles.inputArea}`}>
          <Input isLimitText={true} type={'text'} maxLength={4} extraClass={'input-style'} onChange={handleChange} value={word} />
          <Button text={'Добавить'} extraClass={''} onClick={handleAddClick} disabled={!word} />
          <Button text={'Удалить'} extraClass={''} onClick={handleDeleteClick} disabled={queueForRender.current.tail === null} />

          <Button text={'Очистить'} extraClass={'margin-left-68'} onClick={handlePurgeClick} disabled={queueForRender.current.tail === null} />
        </div>
        <div className={`${styles.circleArea}`}>
          {queueForRender.current.stack.map((elem, key, array) => {
            return (
              <div className={`${styles.countedCircleWithUnderText}`} key={key}>
                <div className={`${styles.countedCircle}`}>
                  <Circle
                    letter={String(elem)}
                    head={key === queueForRender.current.head ? 'head' : ' '}
                    tail={key === queueForRender.current.tail ? 'tail' : ' '}
                    index={key}
                    state={
                      (animation === 'head' && key === queueForRender.current.head) || (animation === 'tail' && key === queueForRender.current.tail) ? ElementStates.Changing : ElementStates.Default
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
