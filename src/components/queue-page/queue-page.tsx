import React, { useState, ChangeEvent, useRef, useEffect, MouseEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { Button } from '../ui/button/button';

import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from './../../constants/delays';

import styles from './queue-page.module.css';
// import './queue-page.css';

let queueArray: string[] = [];
let queueHead = 0;
let queueTail = 0;

export const QueuePage: React.FC = () => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // clear timer Timeout when unmounted to prevent memory leak

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const [word, setWord] = useState('');
  const [queueForRender, setQueueForRender] = useState<string[]>([' ', ' ', ' ', ' ', ' ', ' ', ' ']);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };

  const handleAddClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (queueArray.length < 7) {
      if (word) {
        let bulletArray: string[] = [];

        queueArray = [...queueArray, word];

        if (queueHead && queueHead < 6) {
          queueHead = queueHead;
        } else {
          queueHead = 0;
        }
        queueTail = (queueHead + queueArray.length - 1) % 7;
        console.log('queueTail: ', queueTail);
        console.log('queueHead: ', queueHead);
        console.log('queueArray: ', queueArray);
        for (let i = 0, j = queueArray.length - 1; i <= j; i++) {
          let index;
          if (i + queueHead > 6) {
            index = i + queueHead - 7;
          } else {
            index = i + queueHead;
          }
          bulletArray[index] = !!queueArray[i] ? queueArray[i] : ' ';
        }
        for (let i = 0; i < 7; i++) {
          if (!bulletArray[i]) {
            bulletArray[i] = ' ';
          }
        }
        console.log('bulletArray: ', bulletArray);
        setQueueForRender(() => [...bulletArray]);

        setWord('');
      }
    } else alert('В данном примере очередь ограничена 7 элементами. Пожалуйста, удалите один или несколько элементов, чтобы добавить новый элемент.');
    console.log('queueArray: ', queueArray);
  };

  const handleDeleteClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (queueArray.length <= 1) {
      let bulletArray: string[] = [];
      for (let i = 0; i < 7; i++) {
        if (!bulletArray[i]) {
          bulletArray[i] = ' ';
        }
      }
      setQueueForRender([...bulletArray]);
      queueArray = [];
      queueHead = 0;
      queueTail = 0;
    } else {
      let bulletArray: string[] = [];

      queueArray.shift();
      if (queueHead < 6) {
        queueHead = queueHead + 1;
      } else {
        queueHead = 0;
      }
      queueTail = (queueHead + queueArray.length - 1) % 7;

      for (let i = 0, j = queueArray.length - 1; i <= j; i++) {
        let index;
        if (i + queueHead > 6) {
          index = i + queueHead - 7;
        } else {
          index = i + queueHead;
        }
        bulletArray[index] = queueArray[i];
      }
      for (let i = 0; i < 7; i++) {
        if (!bulletArray[i]) {
          bulletArray[i] = ' ';
        }
      }
      setQueueForRender([...bulletArray]);
    }
    console.log('queueArray: ', queueArray);
    console.log('queueTail: ', queueTail);
    console.log('queueHead: ', queueHead);
  };

  const handlePurgeClick = (event: MouseEvent<HTMLButtonElement>) => {
    console.log('queueArray: ', queueArray);

    let bulletArray: string[] = [];
    for (let i = 0; i < 7; i++) {
      if (!bulletArray[i]) {
        bulletArray[i] = ' ';
      }
    }
    setQueueForRender([...bulletArray]);
    queueArray = [];
    queueHead = 0;
    queueTail = 0;
  };

  return (
    <SolutionLayout title='Очередь'>
      <div className={`${styles.queueContentArea}`}>
        <div className={`${styles.inputArea}`}>
          <Input isLimitText={true} type={'text'} maxLength={4} extraClass={'input-style'} onChange={handleChange} value={word} />
          <Button text={'Добавить'} extraClass={''} onClick={handleAddClick} />
          <Button text={'Удалить'} extraClass={''} onClick={handleDeleteClick} />

          <Button text={'Очистить'} extraClass={'margin-left-68'} onClick={handlePurgeClick} />
        </div>
        <div className={`${styles.circleArea}`}>
          {queueForRender.map((elem, key, array) => {
            return (
              <div className={`${styles.countedCircleWithUnderText}`} key={key}>
                <div className={`${styles.countedCircle}`}>
                  {/* <p>{key === 1 ? 'head' : ' '}</p> */}
                  <Circle letter={String(elem)} head={key === queueHead && queueArray.length ? 'head' : ' '} tail={key === queueTail && queueArray.length ? 'tail' : ' '} index={key} />
                  {/* <p>{key}</p> */}
                </div>
                {/* <p>{key === 5 ? 'tail' : ' '}</p> */}
              </div>
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
