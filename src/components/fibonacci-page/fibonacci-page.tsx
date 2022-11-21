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

  React.useEffect(() => {
    if (fibonacciRow.length <= amount && isRowRendering) {
      if (fibonacciRow.length === 0 || fibonacciRow.length === 1) {
        timerRef.current = setTimeout(() => {
          setFibonacciRow((prevRow) => [...prevRow, 1]);
        }, SHORT_DELAY_IN_MS);
      } else {
        timerRef.current = setTimeout(() => {
          setFibonacciRow((prevRow) => [...prevRow, prevRow[prevRow.length - 1] + prevRow[prevRow.length - 2]]);
        }, SHORT_DELAY_IN_MS);
      }
    } else {
      setRowRendering(false);
    }
  }, [fibonacciRow.length, isRowRendering]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(+event.target.value);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setFibonacciRow([]);
    setRowRendering(true);
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
