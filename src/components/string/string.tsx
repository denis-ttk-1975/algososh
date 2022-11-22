import React, { useState, ChangeEvent, MouseEvent, useRef, useEffect } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { Button } from '../ui/button/button';
import { ElementStates } from '../../types/element-states';

import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from './../../constants/delays';

import styles from './string.module.css';
import './string.css';

let arrayFromString: { element: string; type: ElementStates }[] = [];

export const StringComponent: React.FC = () => {
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
  const [turningArray, setTurningArray] = useState(arrayFromString);
  const [isStringTurning, setStringTurning] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };

  const changeTwoElements = (arrayArg: typeof arrayFromString, firstIndex: number, secondIndex: number) => {
    if (!firstIndex) {
      arrayArg[firstIndex] = { ...arrayArg[firstIndex], type: ElementStates.Changing };
      arrayArg[secondIndex] = { ...arrayArg[secondIndex], type: ElementStates.Changing };
    } else {
      arrayArg[firstIndex] = { ...arrayArg[firstIndex], type: ElementStates.Changing };
      arrayArg[secondIndex] = { ...arrayArg[secondIndex], type: ElementStates.Changing };
      let temporalValue = arrayArg[firstIndex - 1].element;
      arrayArg[firstIndex - 1] = { element: arrayArg[secondIndex + 1].element, type: ElementStates.Modified };
      arrayArg[secondIndex + 1] = { element: temporalValue, type: ElementStates.Modified };
    }
    setTurningArray(() => [...arrayArg]);

    secondIndex = secondIndex - 1;
    firstIndex = firstIndex + 1;

    if (secondIndex + 1 >= firstIndex) {
      timerRef.current = setTimeout(() => {
        changeTwoElements(arrayArg, firstIndex, secondIndex);
      }, DELAY_IN_MS);
    } else {
      timerRef.current = setTimeout(() => {
        arrayArg = arrayArg.map((elem) => {
          return { ...elem, type: ElementStates.Modified };
        });
        setTurningArray(() => [...arrayArg]);
      }, DELAY_IN_MS);
    }
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setStringTurning(true);
    let mockArray = Array.from(word);
    let start = 0;
    let end = mockArray.length - 1;
    arrayFromString = mockArray.map((elem) => {
      return { element: elem, type: ElementStates.Default };
    });
    setTurningArray(() => [...arrayFromString]);
    changeTwoElements([...arrayFromString], start, end);
    setStringTurning(false);
  };

  return (
    <SolutionLayout title='Строка'>
      <div className={`${styles.stringContentArea}`}>
        <div className={`${styles.inputArea}`}>
          <Input isLimitText={true} maxLength={11} extraClass={'input-style'} onChange={handleChange} />
          <Button text={'Развернуть'} extraClass={'button-style'} onClick={handleClick} isLoader={isStringTurning} />
        </div>
        <div className={`${styles.circleArea}`}>
          {!!turningArray.length
            ? turningArray.map((elem, index) => {
                return <Circle letter={elem.element} key={index} state={elem.type} />;
              })
            : null}
        </div>
      </div>
    </SolutionLayout>
  );
};
