import React, { useState, ChangeEvent, MouseEvent, useRef, useEffect } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { Button } from '../ui/button/button';
import { ElementStates } from '../../types/element-states';

import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from './../../constants/delays';

import styles from './string.module.css';
// import './string.css';

let arrayFromString: { element: string; type: ElementStates }[] = [];

export const twoElementsOfArrayReversion = (startArray: { element: string; type: ElementStates }[], firstElem: number, lastElem: number) => {
  if (!firstElem) {
    startArray[firstElem] = { ...startArray[firstElem], type: ElementStates.Changing };
    startArray[lastElem] = { ...startArray[lastElem], type: ElementStates.Changing };
  } else {
    startArray[firstElem] = { ...startArray[firstElem], type: ElementStates.Changing };
    startArray[lastElem] = { ...startArray[lastElem], type: ElementStates.Changing };
    let temporalValue = startArray[firstElem - 1].element;
    startArray[firstElem - 1] = { element: startArray[lastElem + 1].element, type: ElementStates.Modified };
    startArray[lastElem + 1] = { element: temporalValue, type: ElementStates.Modified };
  }

  return startArray;
};

export const StringComponent: React.FC = () => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isTurningRef = useRef<boolean>(false);

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };

  const arrayReversion = (arrayArg: typeof arrayFromString, firstIndex: number, secondIndex: number) => {
    arrayArg = twoElementsOfArrayReversion(arrayArg, firstIndex, secondIndex);

    setTurningArray(() => [...arrayArg]);

    secondIndex = secondIndex - 1;
    firstIndex = firstIndex + 1;

    if (secondIndex + 1 >= firstIndex) {
      timerRef.current = setTimeout(() => {
        arrayReversion(arrayArg, firstIndex, secondIndex);
      }, DELAY_IN_MS);
    } else {
      timerRef.current = setTimeout(() => {
        arrayArg = arrayArg.map((elem) => {
          return { ...elem, type: ElementStates.Modified };
        });
        setTurningArray(() => [...arrayArg]);
        isTurningRef.current = false;
      }, DELAY_IN_MS);
    }
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    isTurningRef.current = true;

    let mockArray = Array.from(word);
    let start = 0;
    let end = mockArray.length - 1;
    arrayFromString = mockArray.map((elem) => {
      return { element: elem, type: ElementStates.Default };
    });
    setTurningArray(() => [...arrayFromString]);
    timerRef.current = setTimeout(() => {
      arrayReversion([...arrayFromString], start, end);
    }, DELAY_IN_MS);
  };

  return (
    <SolutionLayout title='Строка'>
      <div className={`${styles.stringContentArea}`}>
        <div className={`${styles.inputArea}`}>
          <Input value={word} isLimitText={true} maxLength={11} extraClass={'input-style'} onChange={handleChange} data-testid='word' />
          <Button text={'Развернуть'} extraClass={'button-style'} onClick={handleClick} isLoader={isTurningRef.current} data-testid='button' disabled={!word} />
        </div>
        <div className={`${styles.circleArea}`} data-testid='result'>
          {!!turningArray.length
            ? turningArray.map((elem, index) => {
                return <Circle letter={elem.element} key={index} state={elem.type} data-testid='circle' />;
              })
            : null}
        </div>
      </div>
    </SolutionLayout>
  );
};
