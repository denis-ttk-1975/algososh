import React, { useState, ChangeEvent, useRef, useEffect, MouseEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { Button } from '../ui/button/button';
import { ElementStates } from '../../types/element-states';

import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from './../../constants/delays';

import { Stack } from './stack-class';

import styles from './stack-page.module.css';
import './stack-page.css';

export const StackPage: React.FC = () => {
  const stackForRender = useRef(new Stack());
  const [word, setWord] = useState<string>('');

  // const [stackForRender, setStackForRender] = useState<string[]>([]);

  const [animation, setAnimation] = useState(false);

  const [button, setButton] = useState<'add' | 'delete' | 'purge' | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setAnimation(false);
      setButton(null);
    }, SHORT_DELAY_IN_MS);
  }, [animation]);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // clear timer Timeout when unmounted to prevent memory leak

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };

  const handleAddClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (stackForRender.current.stack.length < 21) {
      if (word) {
        stackForRender.current.add(word);
        setWord('');
        setAnimation(true);
        setButton('add');
      }
    } else alert('В данном примере стек ограничен 20 элементами. Пожалуйста, удалите один или несколько элементов, чтобы добавить новый элемент.');
  };

  const handleDeleteClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (stackForRender.current.stack.length === 1) {
      stackForRender.current.clear();
      setAnimation(true);
      setButton('delete');
    } else {
      stackForRender.current.delete();
      setAnimation(true);
      setButton('delete');
    }
  };

  const handlePurgeClick = (event: MouseEvent<HTMLButtonElement>) => {
    stackForRender.current.clear();
    setAnimation(true);
    setButton('purge');
  };

  return (
    <SolutionLayout title='Стек'>
      <div className={`${styles.stackContentArea}`}>
        <div className={`${styles.inputArea}`}>
          <Input isLimitText={true} type={'text'} maxLength={4} extraClass={'input-style'} onChange={handleChange} value={word} data-testid='input' />
          <Button text={'Добавить'} extraClass={''} onClick={handleAddClick} name={'add'} value={'add'} disabled={!word} data-testid='add' isLoader={button === 'add'} />
          <Button text={'Удалить'} extraClass={''} onClick={handleDeleteClick} disabled={!stackForRender.current.stack.length} data-testid='delete' isLoader={button === 'delete'} />

          <Button text={'Очистить'} extraClass={'margin-left-68'} onClick={handlePurgeClick} disabled={!stackForRender.current.stack.length} data-testid='purge' isLoader={button === 'purge'} />
        </div>
        <div className={`${styles.circleArea}`}>
          {stackForRender.current.stack.map((elem, key, array) => {
            return (
              <div className={`${styles.countedCircle}`} key={key}>
                <Circle
                  letter={String(elem)}
                  head={key !== array.length - 1 ? ' ' : 'top'}
                  index={key}
                  state={animation && key === array.length - 1 ? ElementStates.Changing : ElementStates.Default}
                />
              </div>
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
