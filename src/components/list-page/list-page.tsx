import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { Button } from '../ui/button/button';
import { ArrowIcon } from './../ui/icons/arrow-icon';

import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from './../../constants/delays';

import { LinkedList, LinkedListNode } from './linked-list';
import { addFirst, addLast, deleteFirst, deleteLast, addWithIndex, deleteWithIndex, calculateElementState, calculateElementHead, calculateElementTail } from './utils';

import styles from './list-page.module.css';
import './list-page.css';

const listForFirstRender = ['3', '8', '19', '75', '7', '03', '2007'];

export type TStages = {
  stage: LinkedListNode<string>[];
  index?: number;
  value?: string;
  operation?: string;
};

export const ListPage: React.FC = () => {
  const list = useRef(new LinkedList(listForFirstRender));
  const intervalAnimationRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // clear timer Interval when unmounted to prevent memory leak

  useEffect(() => {
    return () => {
      if (intervalAnimationRef.current) {
        clearInterval(intervalAnimationRef.current);
      }
    };
  }, []);

  const [valueToHandle, setValueForHandle] = useState('');
  const [indexToHandle, setIndexForHandle] = useState('');

  const [stagesToRender, setStagesToRender] = useState<TStages[]>([{ stage: list.current.toArray() }]);

  const [renderingStage, setRenderingStage] = useState(0);

  const [operationToRender, setOperationToRender] = useState<'addFirst' | 'addLast' | 'deleteFirst' | 'deleteLast' | 'addWithIndex' | 'deleteWithIndex' | null>(null);

  useEffect(() => {
    if (!operationToRender) {
      setOperationToRender(null);
    } else {
      let temporalArray: TStages[] = [];

      switch (operationToRender) {
        case 'addFirst':
          temporalArray = addFirst(valueToHandle, list.current);
          break;
        case 'addLast':
          temporalArray = addLast(valueToHandle, list.current);
          break;
        case 'deleteFirst':
          temporalArray = deleteFirst(list.current);
          break;
        case 'deleteLast':
          temporalArray = deleteLast(list.current);
          break;
        case 'addWithIndex':
          temporalArray = addWithIndex(Number(indexToHandle), valueToHandle, list.current);
          break;
        case 'deleteWithIndex':
          temporalArray = deleteWithIndex(Number(indexToHandle), list.current);
          break;
      }

      if (temporalArray.length > 1) {
        setStagesToRender(temporalArray);
        setRenderingStage(0);
        intervalAnimationRef.current = setInterval(() => {
          setRenderingStage((renderingStage) => {
            if (renderingStage === stagesToRender.length - 1) {
              if (!!intervalAnimationRef.current) {
                clearInterval(intervalAnimationRef.current);
              }
              setValueForHandle('');
              setIndexForHandle('');
              setStagesToRender([{ stage: list.current.toArray() }]);

              setOperationToRender(null);

              return 0;
            }
            return renderingStage + 1;
          });
        }, DELAY_IN_MS);
      }
    }
  }, [operationToRender]);

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValueForHandle(event.target.value);
  };

  const handleChangeIndex = (event: ChangeEvent<HTMLInputElement>) => {
    setIndexForHandle(event.target.value);
  };

  return (
    <SolutionLayout title='Связный список'>
      <div className={`${styles.listContentArea}`}>
        <div className={`${styles.verticalInputForm}`}>
          <div className={`${styles.inputArea}`}>
            <Input value={valueToHandle} isLimitText={true} type={'text'} maxLength={4} extraClass={'input-style'} onChange={handleChangeValue} data-testid='value-input' />
            <Button
              text={'Добавить в head'}
              extraClass={'button-style-middle'}
              disabled={!valueToHandle.length || (operationToRender !== 'addFirst' && !!operationToRender)}
              onClick={() => setOperationToRender('addFirst')}
              isLoader={operationToRender === 'addFirst'}
              data-testid='addFirst'
            />
            <Button
              text={'Добавить в tail'}
              extraClass={'button-style-middle'}
              disabled={!valueToHandle.length || (operationToRender !== 'addLast' && !!operationToRender)}
              onClick={() => setOperationToRender('addLast')}
              isLoader={operationToRender === 'addLast'}
              data-testid='addLast'
            />
            <Button
              text={'Удалить из head'}
              extraClass={'button-style-middle'}
              disabled={operationToRender !== 'deleteFirst' && !!operationToRender}
              onClick={() => setOperationToRender('deleteFirst')}
              isLoader={operationToRender === 'deleteFirst'}
              data-testid='deleteFirst'
            />
            <Button
              text={'Удалить из tail'}
              extraClass={'button-style-middle'}
              disabled={operationToRender !== 'deleteLast' && !!operationToRender}
              onClick={() => setOperationToRender('deleteLast')}
              isLoader={operationToRender === 'deleteLast'}
              data-testid='deleteLast'
            />
          </div>
          <div className={`${styles.inputArea}`}>
            <Input value={indexToHandle} placeholder={'Введите индекс'} isLimitText={false} type={'number'} extraClass={'input-style'} onChange={handleChangeIndex} data-testid='index-input' />
            <Button
              text={'Добавить по индексу'}
              extraClass={'button-style-long'}
              disabled={
                Number(indexToHandle) > list.current.toArray().length - 1 ||
                Number(indexToHandle) < 0 ||
                !indexToHandle.length ||
                !valueToHandle.length ||
                (operationToRender !== 'addWithIndex' && !!operationToRender)
              }
              onClick={() => setOperationToRender('addWithIndex')}
              isLoader={operationToRender === 'addWithIndex'}
              data-testid='addWithIndex'
            />
            <Button
              text={'Удалить по индексу'}
              extraClass={'button-style-long'}
              disabled={
                Number(indexToHandle) > list.current.toArray().length - 1 || Number(indexToHandle) < 0 || !indexToHandle.length || (operationToRender !== 'deleteWithIndex' && !!operationToRender)
              }
              onClick={() => setOperationToRender('deleteWithIndex')}
              isLoader={operationToRender === 'deleteWithIndex'}
              data-testid='deleteWithIndex'
            />
          </div>
        </div>
        <div className={`${styles.circleArea}`}>
          {stagesToRender[renderingStage].stage.map((elem, key, array) => {
            return (
              <div className={`${styles.countedCircleWithUnderText}`} key={key}>
                <div className={`${styles.countedCircle}`}>
                  <Circle
                    letter={String(elem._value)}
                    head={calculateElementHead(key, stagesToRender[renderingStage])}
                    tail={calculateElementTail(key, stagesToRender[renderingStage])}
                    index={key}
                    state={calculateElementState(key, stagesToRender[renderingStage])}
                  />
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
