import React, { useState, ChangeEvent, MouseEvent, useRef, useEffect } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { Button } from '../ui/button/button';

import { useForm } from './../../hooks/useForm';

import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from './../../constants/delays';

import styles from './fibonacci.module.css';

export const FibonacciPage: React.FC = () => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>();

  const { values, handleChange, setValues } = useForm({ amount: null });

  // clear timer Timeout when unmounted to prevent memory leak

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // const [amount, setAmount] = useState<number | null>(null);
  const [isRowRendering, setRowRendering] = useState(false);
  const [fibonacciRow, setFibonacciRow] = useState<number[]>([]);

  useEffect(() => {
    if (values.amount) {
      if (fibonacciRow.length <= values.amount && isRowRendering) {
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
    }
  }, [fibonacciRow.length, isRowRendering]);

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setAmount(+event.target.value);
  //   if (amount) {
  //     if (amount > 19) {
  //       alert('Введено значение превысившее 19. Программа изменила значение на 19. Можете выбрать иное значение в пределах от 0 до 19');
  //       setAmount(19);
  //     }
  //   }
  // };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (values.amount) {
      if (values.amount > 19) {
        alert('Введено значение превысившее 19. Можете выбрать иное значение в пределах от 0 до 19');
        setValues({ amount: 0 });
        return;
      }
    }
    setFibonacciRow([]);
    setRowRendering(true);
  };

  return (
    <SolutionLayout title='Последовательность Фибоначчи'>
      <div className={`${styles.fibonacciContentArea}`}>
        <div className={`${styles.inputArea}`}>
          <Input
            value={values.amount ? values.amount : ''}
            name={'amount'}
            isLimitText={true}
            type={'number'}
            min={1}
            max={19}
            extraClass={'input-style'}
            onChange={handleChange}
            data-testid='input'
          />
          <Button text={'Рассчитать'} extraClass={'button-style'} onClick={handleClick} isLoader={isRowRendering} disabled={!values.amount} data-testid='button' />
        </div>
        <div className={`${styles.circleArea}`}>
          {fibonacciRow.map((elem, key) => {
            return (
              <div className={`${styles.countedCircle}`} key={key}>
                <Circle letter={elem.toString()} index={key} />
              </div>
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
