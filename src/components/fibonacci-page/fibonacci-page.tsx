import React, { useState, ChangeEvent, MouseEvent, useRef } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { Button } from '../ui/button/button';

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
    if (fibonacciRow.length < 2) {
      newElement = 1;
    } else {
      newElement = fibonacciRow[fibonacciRow.length - 1] + fibonacciRow[fibonacciRow.length - 2];
    }
    console.log('newElement: ', newElement);
    // timerRef.current = setTimeout(() => {
    setFibonacciRow((prevRow) => [...prevRow, newElement]);

    if (digit === 1 || fibonacciRow.length === digit) {
      return;
    } else {
      timerRef.current = setTimeout(() => {
        generateNextArrayFibonacciElement(digit);
      }, DELAY_IN_MS);
    }

    // }, DELAY_IN_MS);
  };

  const generateFibonacciRow = (quantity: number): void => {
    let result: number[] = [];
    for (let index = 0; index <= quantity; index++) {
      // timerRef.current = setTimeout(() => {
      //   if (index === 0 || index === 1) {
      //     // result.push(1);
      //     setFibonacciRow((prevRow) => [...prevRow, 1]);
      //   } else {
      //     console.log('result[-1]: ', result[result.length - 1]);
      //     console.log('result[-2]: ', result[result.length - 2]);
      //     setFibonacciRow((prevRow) => [...prevRow, prevRow[prevRow.length - 1] + prevRow[prevRow.length - 2]]);
      //     // result.push(result[result.length - 1] + result[result.length - 2]);
      //   }
      //   // console.log('result: ', result);
      //   // setFibonacciRow(() => [...result]);
      // }, DELAY_IN_MS);
      // if (index === 0 || index === 1) {
      //   timerRef.current = setTimeout(() => {
      //     setFibonacciRow((prevRow) => [...prevRow, 1]);
      //   }, DELAY_IN_MS);
      // } else {
      //   timerRef.current = setTimeout(() => {
      //     setFibonacciRow((prevRow) => [...prevRow, prevRow[prevRow.length - 1] + prevRow[prevRow.length - 2]]);
      //   }, DELAY_IN_MS);
      // }
    }
  };
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setRowRendering(true);

    // while (fibonacciRow.length <= amount) {
    console.log('fibonacciRow: ', [...fibonacciRow]);
    // timerRef.current = setTimeout(() => {
    generateNextArrayFibonacciElement(amount);
    // }, DELAY_IN_MS);
    // }
    // generateFibonacciRow(amount);

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
                <p>{fibonacciRow}</p>
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
