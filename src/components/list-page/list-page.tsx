import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { Button } from '../ui/button/button';
import { ArrowIcon } from './../ui/icons/arrow-icon';
import { ElementStates } from '../../types/element-states';

import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from './../../constants/delays';

import { LinkedList, LinkedListNode } from './linked-list';
import { addFirst, addLast, deleteFirst, deleteLast, addWithIndex, deleteWithIndex } from './utils';

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
          if (renderingStage === stagesToRender.length - 1) {
            if (!!intervalAnimationRef.current) {
              clearInterval(intervalAnimationRef.current);
            }
            setValueForHandle('');
            setIndexForHandle('');
            setStagesToRender([{ stage: list.current.toArray() }]);

            setOperationToRender(null);
            setRenderingStage(0);
            return;
          }
          setRenderingStage(renderingStage + 1);
        }, DELAY_IN_MS);
      }
    }
  }, [operationToRender]);

  // useEffect(() => {
  //   intervalAnimationRef.current = setInterval(() => {
  //     if (renderingStage === stagesToRender.length - 1) {
  //       if (!!intervalAnimationRef.current) {
  //         clearInterval(intervalAnimationRef.current);
  //       }
  //       setValueForHandle('');
  //       setIndexForHandle('');
  //       setStagesToRender([stagesToRender[stagesToRender.length - 1]]);

  //       setOperationToRender(null);
  //       setRenderingStage(0);
  //       return;
  //     }
  //     setRenderingStage(renderingStage + 1);
  //   }, 5000);
  // }, [stagesToRender]);

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValueForHandle(event.target.value);
  };

  const handleChangeIndex = (event: ChangeEvent<HTMLInputElement>) => {
    setIndexForHandle(event.target.value);
  };

  const handleAnimation = () => {};

  return (
    <SolutionLayout title='Связный список'>
      <div className={`${styles.listContentArea}`}>
        <div className={`${styles.verticalInputForm}`}>
          <div className={`${styles.inputArea}`}>
            <Input isLimitText={true} type={'number'} max={9999} extraClass={'input-style'} onChange={handleChangeValue} value={valueToHandle} />
            <Button text={'Добавить в head'} extraClass={'button-style-middle'} disabled={!valueToHandle.length} onClick={() => setOperationToRender('addFirst')} />
            <Button text={'Добавить в tail'} extraClass={'button-style-middle'} disabled={!valueToHandle.length} onClick={() => setOperationToRender('addLast')} />
            <Button text={'Удалить из head'} extraClass={'button-style-middle'} onClick={() => setOperationToRender('deleteFirst')} />
            <Button text={'Удалить из tail'} extraClass={'button-style-middle'} onClick={() => setOperationToRender('deleteLast')} />
          </div>
          <div className={`${styles.inputArea}`}>
            <Input placeholder={'Введите индекс'} isLimitText={false} type={'number'} extraClass={'input-style'} onChange={handleChangeIndex} value={indexToHandle} />
            <Button
              text={'Добавить по индексу'}
              extraClass={'button-style-long'}
              disabled={Number(indexToHandle) > list.current.toArray().length - 1 || Number(indexToHandle) < 0 || !indexToHandle.length || !valueToHandle.length}
              onClick={() => setOperationToRender('addWithIndex')}
            />
            <Button
              text={'Удалить по индексу'}
              extraClass={'button-style-long'}
              disabled={Number(indexToHandle) > list.current.toArray().length - 1 || Number(indexToHandle) < 0 || !indexToHandle.length}
              onClick={() => setOperationToRender('deleteWithIndex')}
            />
          </div>
        </div>
        <div className={`${styles.circleArea}`}>
          {stagesToRender[renderingStage].stage.map((elem, key, array) => {
            return (
              <div className={`${styles.countedCircleWithUnderText}`} key={key}>
                <div className={`${styles.countedCircle}`}>
                  <Circle letter={String(elem._value)} head={key === 0 ? 'head' : ' '} tail={key === array.length - 1 ? 'tail' : ' '} index={key} state={ElementStates.Default} />
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
