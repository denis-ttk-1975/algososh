import React, { useState, ChangeEvent, MouseEvent, useRef, useEffect, SyntheticEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Column } from '../ui/column/column';
import { Button } from '../ui/button/button';
import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';

import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from './../../constants/delays';

import styles from './sorting-page.module.css';
import './sorting-page.css';

let result: Array<{ data: number; type: ElementStates }[]> = [];

let mockArray: number[] = [];

let pointerToArrayElementToShow = 0;

export const SortingPage: React.FC = () => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // clear timer Timeout when unmounted to prevent memory leak

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const [method, setMethod] = useState<'selection' | 'bubble'>('selection');
  const [direction, setDirection] = useState<'Ascending' | 'Descending' | null>(null);

  const [pointer, setPointer] = useState(0);
  const [sortingArray, setSortingArray] = useState<{ data: number; type: ElementStates }[]>([]);

  useEffect(() => {
    if (!!direction) {
      if (method === 'selection') {
        if (direction === 'Ascending') {
          timerRef.current = setTimeout(() => {
            if (pointerToArrayElementToShow < result.length - 1) {
              setSortingArray(result[pointerToArrayElementToShow + 1]);
              pointerToArrayElementToShow = pointerToArrayElementToShow + 1;
            } else {
              result = [result[0]];
              pointerToArrayElementToShow = 0;
              setDirection(null);
            }
          }, SHORT_DELAY_IN_MS);
        } else {
          timerRef.current = setTimeout(() => {
            if (pointerToArrayElementToShow < result.length - 1) {
              setSortingArray(result[pointerToArrayElementToShow + 1]);
              pointerToArrayElementToShow = pointerToArrayElementToShow + 1;
            } else {
              result = [result[0]];
              pointerToArrayElementToShow = 0;
              setDirection(null);
            }
          }, SHORT_DELAY_IN_MS);
        }
      } else {
        timerRef.current = setTimeout(() => {}, SHORT_DELAY_IN_MS);
      }
    } else {
      setDirection(null);
    }
  }, [sortingArray, direction]);

  const handleChangeMethod = (event: ChangeEvent<HTMLInputElement>) => {
    setMethod(event.target.value as 'selection' | 'bubble');
  };

  const handleStartSortingAscending = (event: MouseEvent<HTMLButtonElement>) => {
    let pointerA = 0;
    // wholeAmount = arrayToSort.length;
    let wholeAmount = mockArray.length;
    console.log('wholeAmount: ', wholeAmount);

    let tempArray = [...mockArray];
    console.log('tempArray: ', tempArray);

    result[1] = tempArray.map((elem, key) => {
      return { data: elem, type: key < 2 ? ElementStates.Changing : ElementStates.Default };
    });
    while (pointerA < wholeAmount - 1) {
      console.log('tempArray: ', [...tempArray]);

      let pointerMin = pointerA;

      for (let i = pointerA + 1; i <= wholeAmount - 1; i++) {
        if (tempArray[i] < tempArray[pointerMin]) {
          pointerMin = i;
        }
        if (i < wholeAmount - 1) {
          result.push(
            tempArray.map((elem, key) => {
              let color;
              if (key < pointerA) {
                color = ElementStates.Modified;
              } else if (key === pointerA || key === i + 1) {
                color = ElementStates.Changing;
              } else {
                color = ElementStates.Default;
              }
              return { data: elem, type: color };
            })
          );
        }
      }
      if (pointerMin !== pointerA) {
        [tempArray[pointerMin], tempArray[pointerA]] = [tempArray[pointerA], tempArray[pointerMin]];
      }
      pointerA++;
      pointerA !== wholeAmount - 1
        ? result.push(
            tempArray.map((elem, key) => {
              let color;
              if (key < pointerA) {
                color = ElementStates.Modified;
              } else if (key === pointerA || key === pointerA + 1) {
                color = ElementStates.Changing;
              } else {
                color = ElementStates.Default;
              }
              return { data: elem, type: color };
            })
          )
        : result.push(
            tempArray.map((elem, key) => {
              return { data: elem, type: ElementStates.Modified };
            })
          );
    }

    setDirection('Ascending');
  };

  const handleStartSortingDescending = (event: MouseEvent<HTMLButtonElement>) => {
    let pointerA = 0;
    // wholeAmount = arrayToSort.length;
    let wholeAmount = mockArray.length;

    let tempArray = [...mockArray];

    result[1] = tempArray.map((elem, key) => {
      return { data: elem, type: key < 2 ? ElementStates.Changing : ElementStates.Default };
    });

    while (pointerA < wholeAmount - 1) {
      console.log('tempArray: ', [...tempArray]);

      let pointerMax = pointerA;

      for (let i = pointerA + 1; i <= wholeAmount - 1; i++) {
        if (tempArray[i] > tempArray[pointerMax]) {
          pointerMax = i;
        }
        if (i < wholeAmount - 1) {
          result.push(
            tempArray.map((elem, key) => {
              let color;
              if (key < pointerA) {
                color = ElementStates.Modified;
              } else if (key === pointerA || key === i + 1) {
                color = ElementStates.Changing;
              } else {
                color = ElementStates.Default;
              }
              return { data: elem, type: color };
            })
          );
        }

        console.log('result333: ', result);
        // debugger;
      }
      if (pointerMax !== pointerA) {
        [tempArray[pointerMax], tempArray[pointerA]] = [tempArray[pointerA], tempArray[pointerMax]];
      }
      pointerA++;
      pointerA !== wholeAmount - 1
        ? result.push(
            tempArray.map((elem, key) => {
              let color;
              if (key < pointerA) {
                color = ElementStates.Modified;
              } else if (key === pointerA || key === pointerA + 1) {
                color = ElementStates.Changing;
              } else {
                color = ElementStates.Default;
              }
              return { data: elem, type: color };
            })
          )
        : result.push(
            tempArray.map((elem, key) => {
              return { data: elem, type: ElementStates.Modified };
            })
          );
    }
    // debugger;
    console.log(result);
    setDirection('Descending');
  };

  const handleGenerateNewArray = (event: MouseEvent<HTMLButtonElement>) => {
    setSortingArray(generateNewArray());
    // selectionMark = 0;
    setMethod('selection');
    setDirection(null);
  };

  const generateNewArray = () => {
    pointerToArrayElementToShow = 0;
    mockArray = [];
    result = [];
    for (let i = 0, j = 3 + Math.floor(Math.random() * 15); i < j; i++) {
      mockArray.push(Math.floor(Math.random() * 101));
    }

    result[0] = mockArray.map((elem) => {
      return { data: elem, type: ElementStates.Default };
    });
    console.log('mockArray: ', [...mockArray]);
    console.log('result: ', [...result]);
    return result[0];
  };

  return (
    <SolutionLayout title='Сортировка массива'>
      <div className={`${styles.sortingContentArea}`}>
        <div className={`${styles.inputArea}`}>
          <RadioInput label={'Выбор'} extraClass={'margin-right-40'} checked={method === 'selection'} name='method' value='selection' onChange={handleChangeMethod} disabled={!!direction} />
          <RadioInput label={'Пузырек'} extraClass={'margin-right-52'} checked={method === 'bubble'} name='method' value='bubble' onChange={handleChangeMethod} disabled={!!direction} />

          <Button
            sorting={Direction.Ascending}
            text={'По возрастанию'}
            onClick={handleStartSortingAscending}
            extraClass={''}
            isLoader={direction === 'Ascending'}
            disabled={direction === 'Descending' || !sortingArray.length}
            name='Ascending'
          />
          <Button
            sorting={Direction.Descending}
            text={'По убыванию'}
            onClick={handleStartSortingDescending}
            extraClass={''}
            isLoader={direction === 'Descending'}
            disabled={direction === 'Ascending' || !sortingArray.length}
            name='Descending'
          />
          <Button text={'Новый массив'} extraClass={'margin-left-68'} onClick={handleGenerateNewArray} disabled={!!direction} />
        </div>
        <div className={`${styles.columnArea}`}>
          {sortingArray.map((elem, key) => {
            return <Column index={elem.data} key={key} state={elem.type} />;
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
