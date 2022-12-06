import { LinkedList } from './linked-list';
import { TStages } from './list-page';

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

  const elementToDelete = list.deleteLast()?._value;

  list.append('');

  bulletArray.push({ index: 0, value: elementToDelete, stage: list.toArray(), operation: 'delete' });

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

  bulletArray.push({
    stage: list.toArray(),
  });

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
