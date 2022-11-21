import React, { useState, ChangeEvent, MouseEvent, useRef } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { Button } from '../ui/button/button';

import { delay, sleep } from './../../utils/sleep';

import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from './../../constants/delays';

import styles from './fibonacci.module.css';
// import './fibonacci.css';

export const FibonacciPage: React.FC = () => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [amount, setAmount] = useState(0);
  const [isRowRendering, setRowRendering] = useState(false);

  const [fibonacciRow, setFibonacciRow] = useState<number[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('amount: ', amount);
    setAmount(+event.target.value);
  };

  const generateNextArrayFibonacciElement = (digit: number) => {
    console.log('digit: ', digit);
    console.log('fibonacciRow: ', [...fibonacciRow]);

    let newElement: number;
    console.log('fibonacciRow.length: ', fibonacciRow.length);
    if (fibonacciRow.length < 2) {
      newElement = 1;
    } else {
      newElement = fibonacciRow[fibonacciRow.length - 1] + fibonacciRow[fibonacciRow.length - 2];
    }
    console.log('newElement: ', newElement);

    if (digit === 1 || fibonacciRow.length === digit) {
      setFibonacciRow((prevRow) => [...prevRow, newElement]);

      return;
    } else {
      timerRef.current = setTimeout(() => {
        setFibonacciRow((prevRow) => [...prevRow, newElement]);

        console.log('fibonacciRow2: ', [...fibonacciRow]);

        generateNextArrayFibonacciElement(digit);
      }, DELAY_IN_MS);
    }
  };

  const generateFibonacciRow = (quantity: number): void => {
    let result: number[] = [];
    for (let index = 0; index <= quantity; index++) {
      if (index === 0 || index === 1) {
        delay(DELAY_IN_MS).then(() => setFibonacciRow((prevRow) => [...prevRow, 1]));
      } else {
        console.log('result[-1]: ', result[result.length - 1]);
        console.log('result[-2]: ', result[result.length - 2]);
        delay(DELAY_IN_MS).then(() => setFibonacciRow((prevRow) => [...prevRow, prevRow[prevRow.length - 1] + prevRow[prevRow.length - 2]]));
      }
      console.log('fibonacciRow1: ', [...fibonacciRow]);
    }
  };
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setRowRendering(true);

    console.log('fibonacciRow: ', [...fibonacciRow]);

    generateFibonacciRow(amount);

    setRowRendering(false);
  };

  return (
    <SolutionLayout title='Последовательность Фибоначчи'>
      <div className={`${styles.fibonacciContentArea}`}>
        <div className={`${styles.inputArea}`}>
          <Input isLimitText={true} type={'number'} min={1} max={19} extraClass={'input-style'} onChange={handleChange} />
          <Button text={'Рассчитать'} extraClass={'button-style'} onClick={handleClick} isLoader={isRowRendering} />
        </div>
        <div className={`${styles.circleArea}`}>
          {fibonacciRow.map((elem, key) => {
            return (
              <div className={`${styles.countedCircle}`} key={key}>
                <p>{fibonacciRow.length}</p>
                <Circle letter={elem.toString()} />
                <p>{key}</p>
              </div>
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
