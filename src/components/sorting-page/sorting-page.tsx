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

let selectionMark = 0;
let comparingElements = [0, 1];

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

  const [sortingArray, setSortingArray] = useState<{ data: number; type: ElementStates }[]>([]);

  useEffect(() => {
    if (!!direction) {
      if (method === 'selection') {
        if (direction === 'Ascending') {
          timerRef.current = setTimeout(() => {
            // debugger;

            if (sortingArray[selectionMark].data > sortingArray[comparingElements[1]].data) {
              selectionMark = comparingElements[1];
              console.log('selectionMark.current: ', selectionMark);
              console.log('увеличил!!!');
            }
            if (comparingElements[1] < sortingArray.length - 1) {
              let temporalArray = [];
              temporalArray = sortingArray.map((elem, key) => {
                if (key === comparingElements[1]) {
                  return { data: elem.data, type: ElementStates.Default };
                } else if (key === comparingElements[1] + 1) {
                  return { data: elem.data, type: ElementStates.Changing };
                } else return elem;
              });
              comparingElements[1] = comparingElements[1] + 1;

              setSortingArray(temporalArray);
            }
            if (comparingElements[1] === sortingArray.length - 1) {
              const elemA = sortingArray[comparingElements[0]].data;
              const elemB = sortingArray[selectionMark].data;
              let temporalArray = [];

              temporalArray = sortingArray.map((elem, key) => {
                if (key === comparingElements[0]) {
                  return { data: elemB, type: ElementStates.Modified };
                } else if (key === selectionMark) {
                  return { data: elemA, type: ElementStates.Default };
                } else if (key > comparingElements[0] + 2) {
                  return { data: elem.data, type: ElementStates.Default };
                } else if (key === comparingElements[0] + 1 || key === comparingElements[0] + 2) {
                  return { data: elem.data, type: ElementStates.Changing };
                } else return elem;
              });
              setSortingArray(temporalArray);

              comparingElements[0] = comparingElements[0] + 1;
              comparingElements[1] = comparingElements[0] + 1;
              selectionMark = comparingElements[0];
              if (comparingElements[0] === sortingArray.length - 1) {
                setDirection(null);
              }
              // setDirection(null);
            }
          }, SHORT_DELAY_IN_MS);
        } else {
          timerRef.current = setTimeout(() => {}, SHORT_DELAY_IN_MS);
        }
      } else {
        timerRef.current = setTimeout(() => {}, SHORT_DELAY_IN_MS);
      }
    } else {
      setDirection(null);
    }
    console.log('selectionMark: ', selectionMark);
    console.log('comparingElements: ', [...comparingElements]);
    console.log('sortingArray: ', [...sortingArray]);

    console.log('direction: ', direction);
  }, [sortingArray, direction]);

  const handleChangeMethod = (event: ChangeEvent<HTMLInputElement>) => {
    setMethod(event.target.value as 'selection' | 'bubble');
  };

  const handleStartSortingAscending = (event: MouseEvent<HTMLButtonElement>) => {
    setDirection('Ascending');
    markFirstComparingElements();
    // timerRef.current = setTimeout(() => {
    //   setDirection(null);
    // }, 15000);
  };

  const handleStartSortingDescending = (event: MouseEvent<HTMLButtonElement>) => {
    setDirection('Descending');
    markFirstComparingElements();
    timerRef.current = setTimeout(() => {
      // setDirection(null);
    }, 2000);
  };

  const handleGenerateNewArray = (event: MouseEvent<HTMLButtonElement>) => {
    setSortingArray(generateNewArray());
    selectionMark = 0;
    setMethod('selection');
    setDirection(null);
  };

  const generateNewArray = () => {
    let result = [];
    for (let i = 0, j = 3 + Math.floor(Math.random() * 15); i < j; i++) {
      result.push({ data: Math.floor(Math.random() * 101), type: ElementStates.Default });
    }
    return result;
  };

  const markFirstComparingElements = () => {
    comparingElements = [0, 1];
    console.log('comparingElements first: ', [...comparingElements]);
    const elem1 = { data: sortingArray[0].data, type: ElementStates.Changing };
    const elem2 = { data: sortingArray[1].data, type: ElementStates.Changing };
    setSortingArray([elem1, elem2, ...[...sortingArray].splice(2)]);
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
            onClick={handleStartSortingAscending}
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
