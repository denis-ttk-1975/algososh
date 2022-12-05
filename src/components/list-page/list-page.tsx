import React, { useState, ChangeEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { Button } from '../ui/button/button';
import { ArrowIcon } from './../ui/icons/arrow-icon';
import { ElementStates } from '../../types/element-states';

import styles from './list-page.module.css';
import './list-page.css';

export const ListPage: React.FC = () => {
  const [word, setWord] = useState('12345');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };
  const listFromTask = Array.from(word);

  return (
    <SolutionLayout title='Связный список'>
      <div className={`${styles.listContentArea}`}>
        <div className={`${styles.verticalInputForm}`}>
          <div className={`${styles.inputArea}`}>
            <Input isLimitText={true} type={'number'} max={4} extraClass={'input-style'} onChange={handleChange} />
            <Button text={'Добавить в head'} extraClass={'button-style-middle'} />
            <Button text={'Добавить в tail'} extraClass={'button-style-middle'} />
            <Button text={'Удалить из head'} extraClass={'button-style-middle'} />
            <Button text={'Удалить из tail'} extraClass={'button-style-middle'} />
          </div>
          <div className={`${styles.inputArea}`}>
            <Input placeholder={'Введите индекс'} isLimitText={false} type={'number'} extraClass={'input-style'} onChange={handleChange} />
            <Button text={'Добавить по индексу'} extraClass={'button-style-long'} />
            <Button text={'Удалить по индексу'} extraClass={'button-style-long'} />
          </div>
        </div>
        <div className={`${styles.circleArea}`}>
          {listFromTask.map((elem, key, array) => {
            return (
              <div className={`${styles.countedCircleWithUnderText}`} key={key}>
                <div className={`${styles.countedCircle}`}>
                  <Circle letter={String(elem)} head={key === 0 ? 'head' : ' '} tail={key === array.length - 1 ? 'tail' : ' '} index={key} state={ElementStates.Default} />
                  {key < array.length - 1 ? <ArrowIcon /> : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
