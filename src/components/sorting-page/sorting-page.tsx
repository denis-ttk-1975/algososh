import React, { useState, ChangeEvent, MouseEvent, useRef, useEffect, SyntheticEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Column } from '../ui/column/column';
import { Button } from '../ui/button/button';
import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';
import { useForm } from './../../hooks/useForm';

import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from './../../constants/delays';

import { sortingSelectionAscending, sortingSelectionDescending, sortingBubbleAscending, sortingBubbleDescending } from './utils';

import styles from './sorting-page.module.css';

let result: Array<{ data: number; type: ElementStates }[]> = [];

let mockArray: number[] = [];

let pointerToArrayElementToShow = 0;

export const SortingPage: React.FC = () => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { values, handleChange, setValues } = useForm({ method: 'selection', direction: null });

  // clear timer Timeout when unmounted to prevent memory leak

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const [sortingArray, setSortingArray] = useState<{ data: number; type: ElementStates }[]>([]);

  useEffect(() => {
    setSortingArray(generateNewArray());
    setValues({ method: 'selection', direction: null });
  }, []);

  useEffect(() => {
    if (!!values.direction) {
      timerRef.current = setTimeout(() => {
        if (pointerToArrayElementToShow < result.length - 1) {
          setSortingArray(result[pointerToArrayElementToShow + 1]);
          pointerToArrayElementToShow = pointerToArrayElementToShow + 1;
        } else {
          result = [result[0]];
          pointerToArrayElementToShow = 0;
          setValues({ method: 'selection', direction: null });
        }
      }, SHORT_DELAY_IN_MS);
    } else {
      setValues({ ...values, direction: null });
    }
  }, [sortingArray, values.direction]);

  const handleChangeMethod = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, method: event.target.value });
  };

  const handleStartSortingAscending = (event: MouseEvent<HTMLButtonElement>) => {
    if (values.method === 'selection') {
      result = sortingSelectionAscending(result, mockArray);
    } else {
      result = sortingBubbleAscending(result, mockArray);
    }
    setValues({ ...values, direction: 'Ascending' });
  };

  const handleStartSortingDescending = (event: MouseEvent<HTMLButtonElement>) => {
    if (values.method === 'selection') {
      result = sortingSelectionDescending(result, mockArray);
    } else {
      result = sortingBubbleDescending(result, mockArray);
    }
    setValues({ ...values, direction: 'Descending' });
  };

  const handleGenerateNewArray = (event: MouseEvent<HTMLButtonElement>) => {
    setSortingArray(generateNewArray());
    setValues({ method: 'selection', direction: null });
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

    return result[0];
  };

  return (
    <SolutionLayout title='Сортировка массива'>
      <div className={`${styles.sortingContentArea}`}>
        <div className={`${styles.inputArea}`}>
          <RadioInput
            label={'Выбор'}
            extraClass={'margin-right-40'}
            checked={values.method === 'selection'}
            name={'method'}
            value='selection'
            onChange={handleChangeMethod}
            disabled={!!values.direction}
          />
          <RadioInput
            label={'Пузырек'}
            extraClass={'margin-right-52'}
            checked={values.method === 'bubble'}
            name={'method'}
            value='bubble'
            onChange={handleChangeMethod}
            disabled={!!values.direction}
          />

          <Button
            sorting={Direction.Ascending}
            text={'По возрастанию'}
            onClick={handleStartSortingAscending}
            extraClass={''}
            isLoader={values.direction === 'Ascending'}
            disabled={values.direction === 'Descending' || !sortingArray.length}
            name={'Ascending'}
          />
          <Button
            sorting={Direction.Descending}
            text={'По убыванию'}
            onClick={handleStartSortingDescending}
            extraClass={''}
            isLoader={values.direction === 'Descending'}
            disabled={values.direction === 'Ascending' || !sortingArray.length}
            name={'Descending'}
          />
          <Button text={'Новый массив'} extraClass={'margin-left-68'} onClick={handleGenerateNewArray} disabled={!!values.direction} />
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
