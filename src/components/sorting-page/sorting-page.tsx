import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Column } from '../ui/column/column';
import { Button } from '../ui/button/button';
import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';

import styles from './sorting-page.module.css';
import './sorting-page.css';

export const SortingPage: React.FC = () => {
  const [method, setMethod] = useState<'selection' | 'bubble'>('selection');
  const [sortingArray, setSortingArray] = useState<number[]>([]);

  const handleChangeMethod = (event: ChangeEvent<HTMLInputElement>) => {
    setMethod(event.target.value as 'selection' | 'bubble');
  };

  const handleGenerateNewArray = (event: MouseEvent<HTMLButtonElement>) => {
    setSortingArray(generateNewArray());
  };

  const generateNewArray = (): number[] => {
    let result: number[] = [];
    for (let i = 0, j = 3 + Math.floor(Math.random() * 15); i < j; i++) {
      result.push(Math.floor(Math.random() * 101));
    }
    return result;
  };

  return (
    <SolutionLayout title='Сортировка массива'>
      <div className={`${styles.sortingContentArea}`}>
        <div className={`${styles.inputArea}`}>
          <RadioInput label={'Выбор'} extraClass={'margin-right-40'} checked={method === 'selection'} name='method' value='selection' onChange={handleChangeMethod} />
          <RadioInput label={'Пузырек'} extraClass={'margin-right-52'} checked={method === 'bubble'} name='method' value='bubble' onChange={handleChangeMethod} />

          <Button sorting={Direction.Ascending} text={'По возрастанию'} extraClass={''} />
          <Button sorting={Direction.Descending} text={'По убыванию'} extraClass={''} />
          <Button text={'Новый массив'} extraClass={'margin-left-68'} onClick={handleGenerateNewArray} />
        </div>
        <div className={`${styles.columnArea}`}>
          {sortingArray.map((elem, key) => {
            return <Column index={elem} key={key} />;
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
