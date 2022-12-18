import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { Button } from '../ui/button/button';
import { ArrowIcon } from './../ui/icons/arrow-icon';
import { useForm } from './../../hooks/useForm';

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

  const { values, handleChange, setValues } = useForm({ value: '', index: '' });

  // clear timer Interval when unmounted to prevent memory leak

  useEffect(() => {
    return () => {
      if (intervalAnimationRef.current) {
        clearInterval(intervalAnimationRef.current);
      }
    };
  }, []);

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
          temporalArray = addFirst(values.value, list.current);
          break;
        case 'addLast':
          temporalArray = addLast(values.value, list.current);
          break;
        case 'deleteFirst':
          temporalArray = deleteFirst(list.current);
          break;
        case 'deleteLast':
          temporalArray = deleteLast(list.current);
          break;
        case 'addWithIndex':
          temporalArray = addWithIndex(Number(values.index), values.value, list.current);
          break;
        case 'deleteWithIndex':
          temporalArray = deleteWithIndex(Number(values.index), list.current);
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
              setValues({ value: '', index: '' });
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

  return (
    <SolutionLayout title='Связный список'>
      <div className={`${styles.listContentArea}`}>
        <div className={`${styles.verticalInputForm}`}>
          <div className={`${styles.inputArea}`}>
            <Input value={values.value} name={'value'} isLimitText={true} type={'text'} maxLength={4} extraClass={'input-style'} onChange={handleChange} data-testid='value-input' />
            <Button
              text={'Добавить в head'}
              extraClass={'button-style-middle'}
              disabled={!values.value.length || (operationToRender !== 'addFirst' && !!operationToRender)}
              onClick={() => setOperationToRender('addFirst')}
              isLoader={operationToRender === 'addFirst'}
              data-testid='addFirst'
            />
            <Button
              text={'Добавить в tail'}
              extraClass={'button-style-middle'}
              disabled={!values.value.length || (operationToRender !== 'addLast' && !!operationToRender)}
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
            <Input
              value={values.index}
              name={'index'}
              placeholder={'Введите индекс'}
              isLimitText={false}
              type={'number'}
              extraClass={'input-style'}
              onChange={handleChange}
              data-testid='index-input'
            />
            <Button
              text={'Добавить по индексу'}
              extraClass={'button-style-long'}
              disabled={
                Number(values.index) > list.current.toArray().length - 1 ||
                Number(values.index) < 0 ||
                !values.index.length ||
                !values.value.length ||
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
                Number(values.index) > list.current.toArray().length - 1 || Number(values.index) < 0 || !values.index.length || (operationToRender !== 'deleteWithIndex' && !!operationToRender)
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
