import React, { useState, ChangeEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Column } from '../ui/column/column';
import { Button } from '../ui/button/button';
import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';

import styles from './sorting-page.module.css';
import './sorting-page.css';

export const SortingPage: React.FC = () => {
  const [word, setWord] = useState('hello');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };
  const arrayForSorting = [55, 76, 23, 45, 99];

  return (
    <SolutionLayout title='Сортировка массива'>
      <div className={`${styles.sortingContentArea}`}>
        <div className={`${styles.inputArea}`}>
          <RadioInput label={'Выбор'} extraClass={'margin-right-40'} checked name='method' />
          <RadioInput label={'Пузырек'} extraClass={'margin-right-52'} name='method' />

          <Button sorting={Direction.Ascending} text={'По возрастанию'} extraClass={''} />
          <Button sorting={Direction.Descending} text={'По убыванию'} extraClass={''} />
          <Button text={'Новый массив'} extraClass={'margin-left-68'} />
        </div>
        <div className={`${styles.columnArea}`}>
          {arrayForSorting.map((elem) => {
            return <Column index={elem} />;
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
