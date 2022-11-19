import React, { useState, ChangeEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { Button } from '../ui/button/button';

import styles from './list-page.module.css';
// import './list-page.css';

export const ListPage: React.FC = () => {
  const [word, setWord] = useState('hello');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };
  const arrayFromString = Array.from(word);

  return (
    <SolutionLayout title='Связный список'>
      <div className={`${styles.stringContentArea}`}>
        <div className={`${styles.inputArea}`}>
          <Input isLimitText={true} maxLength={11} extraClass={'string'} onChange={handleChange} />
          <Button text={'Развернуть'} extraClass={'button-style'} />
        </div>
        <div className={`${styles.circleArea}`}>
          {arrayFromString.map((elem) => {
            return <Circle letter={elem} />;
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
