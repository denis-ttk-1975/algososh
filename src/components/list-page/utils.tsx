import { LinkedList } from './linked-list';
import { TStages } from './list-page';
import { ElementStates } from '../../types/element-states';
import { Circle } from '../ui/circle/circle';

export function addFirst(value: string, list: LinkedList<string>): TStages[] {
  const bulletArray: TStages[] = [];

  bulletArray.push({ index: 0, value: value, stage: list.toArray(), operation: 'add' });

  list.prepend(value);

  bulletArray.push({
    index: 0,
    stage: list.toArray(),
    operation: 'add',
  });

  bulletArray.push({
    index: 0,
    stage: list.toArray(),
  });

  return bulletArray;
}

export function addLast(value: string, list: LinkedList<string>): TStages[] {
  const bulletArray: TStages[] = [];

  const lastIndex = list.toArray().length - 1;

  bulletArray.push({ index: lastIndex, value: value, stage: list.toArray(), operation: 'add' });

  list.append(value);

  bulletArray.push({
    index: lastIndex,
    stage: list.toArray(),
    operation: 'add',
  });

  bulletArray.push({
    index: lastIndex,
    stage: list.toArray(),
  });

  return bulletArray;
}

export function deleteFirst(list: LinkedList<string>): TStages[] {
  const bulletArray: TStages[] = [];

  const elementToDelete = list.deleteFirst()?._value;

  list.prepend('');

  bulletArray.push({ index: 0, value: elementToDelete, stage: list.toArray(), operation: 'delete' });

  list.deleteFirst();

  bulletArray.push({
    stage: list.toArray(),
  });

  return bulletArray;
}

export function deleteLast(list: LinkedList<string>): TStages[] {
  const bulletArray: TStages[] = [];

  const lastIndex = list.toArray().length - 1;

  const elementToDelete = list.deleteLast()?._value;

  list.append('');

  bulletArray.push({ index: lastIndex, value: elementToDelete, stage: list.toArray(), operation: 'delete' });

  list.deleteLast();

  bulletArray.push({
    stage: list.toArray(),
  });

  return bulletArray;
}

export function addWithIndex(index: number, value: string, list: LinkedList<string>): TStages[] {
  const bulletArray: TStages[] = [];

  bulletArray.push({ index: index, value: value, stage: list.toArray(), operation: 'add' });

  list.addIndex(index, value);

  bulletArray.push({
    index: index,
    stage: list.toArray(),
    operation: 'add',
  });

  bulletArray.push({ index: index, stage: list.toArray() });

  return bulletArray;
}

export function deleteWithIndex(index: number, list: LinkedList<string>): TStages[] {
  const bulletArray: TStages[] = [];

  const elementToDelete = list.deleteIndex(index)?._value;

  list.addIndex(index, ' ');

  bulletArray.push({ index: index, value: elementToDelete, stage: list.toArray(), operation: 'delete' });

  list.deleteIndex(index);

  bulletArray.push({
    stage: list.toArray(),
  });

  return bulletArray;
}

export function calculateElementState(index: number, stage: TStages) {
  if (!stage.operation || !stage.index) {
    return ElementStates.Default;
  }
  if (index < stage.index && !!stage.value) {
    return ElementStates.Changing;
  }
  if (index === stage.index && !stage.value) {
    return ElementStates.Modified;
  }
  return ElementStates.Default;
}

export function calculateElementHead(index: number, stage: TStages) {
  if (stage.operation === 'add' && stage.value && index === stage.index) {
    return <Circle letter={stage.value} state={ElementStates.Changing} isSmall={true} />;
  }
  if (!index) {
    return 'head';
  }

  return '';
}
export function calculateElementTail(index: number, stage: TStages) {
  if (stage.operation === 'delete' && stage.value && index === stage.index) {
    return <Circle letter={stage.value} state={ElementStates.Changing} isSmall={true} />;
  }
  if (index === stage.stage.length - 1) {
    return 'tail';
  }

  return '';
}
