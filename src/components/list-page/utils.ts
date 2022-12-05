import { LinkedList } from './linked-list';
import { TStages } from './list-page';

export function addFirst(value: string, list: LinkedList<string>): TStages[] {
  const bulletArray: TStages[] = [];

  bulletArray.push({ index: 0, value: value, stage: list.toArray() });

  list.prepend(value);

  bulletArray.push({
    index: 0,
    stage: list.toArray(),
  });

  bulletArray.push({
    stage: list.toArray(),
  });

  return bulletArray;
}

export function addLast(value: string, list: LinkedList<string>): TStages[] {
  const bulletArray: TStages[] = [];

  const lastIndex = list.toArray().length - 1;

  bulletArray.push({ index: lastIndex, value: value, stage: list.toArray() });

  list.append(value);

  bulletArray.push({
    index: lastIndex,
    stage: list.toArray(),
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

  bulletArray.push({ index: 0, value: elementToDelete, stage: list.toArray() });

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

  bulletArray.push({ index: 0, value: elementToDelete, stage: list.toArray() });

  list.deleteLast();

  bulletArray.push({
    stage: list.toArray(),
  });

  return bulletArray;
}

export function addWithIndex(value: string, list: LinkedList<string>): TStages[] {
  const bulletArray: TStages[] = [];

  bulletArray.push({ index: 0, value: value, stage: list.toArray() });

  list.prepend(value);

  bulletArray.push({
    index: 0,
    stage: list.toArray(),
  });

  bulletArray.push({
    stage: list.toArray(),
  });

  return bulletArray;
}

export function deleteWithIndex(value: string, list: LinkedList<string>): TStages[] {
  const bulletArray: TStages[] = [];

  bulletArray.push({ index: 0, value: value, stage: list.toArray() });

  list.prepend(value);

  bulletArray.push({
    index: 0,
    stage: list.toArray(),
  });

  bulletArray.push({
    stage: list.toArray(),
  });

  return bulletArray;
}
