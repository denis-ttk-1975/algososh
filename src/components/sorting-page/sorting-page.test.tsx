import { sortingSelectionAscending, sortingBubbleAscending, sortingBubbleDescending, sortingSelectionDescending } from './utils';
import { ElementStates } from '../../types/element-states';
import {
  resultBubbleDescendingArrayEvenElements,
  resultSelectionAscendingArrayEvenElements,
  resultBubbleAscendingArrayEvenElements,
  resultSelectionDescendingArrayEvenElement,
  resultSelectionAscendingArrayOneElements,
  resultSelectionDescendingArrayOneElement,
  resultBubbleAscendingArrayOneElements,
  resultBubbleDescendingArrayOneElements,
  resultSelectionAscendingArrayNoneElements,
  resultSelectionDescendingArrayNoneElement,
  resultBubbleAscendingArrayNoneElements,
  resultBubbleDescendingArrayNoneElements,
} from './constants-test';

const renderingArrayEvenElements = [
  [
    { data: 20, type: ElementStates.Default },
    { data: 15, type: ElementStates.Default },
    { data: 10, type: ElementStates.Default },
    { data: 30, type: ElementStates.Default },
  ],
];

const mockArrayEvenElements = [20, 15, 10, 30];

const renderingArrayOneElements = [[{ data: 20, type: ElementStates.Default }]];
const mockArrayOneElements = [20];

const renderingArrayNoneElements = [[]];
const mockArrayNoneElements: number[] = [];

it('should check Selection Ascending sorting many', function () {
  expect(sortingSelectionAscending([...renderingArrayEvenElements], mockArrayEvenElements)).toEqual(resultSelectionAscendingArrayEvenElements);
});

it('should check Selection Descending sorting many', function () {
  expect(sortingSelectionDescending([...renderingArrayEvenElements], mockArrayEvenElements)).toEqual(resultSelectionDescendingArrayEvenElement);
});

it('should check Bubble Ascending sorting many', function () {
  expect(sortingBubbleAscending([...renderingArrayEvenElements], mockArrayEvenElements)).toEqual(resultBubbleAscendingArrayEvenElements);
});

it('should check Bubble Descending sorting many', function () {
  expect(sortingBubbleDescending([...renderingArrayEvenElements], mockArrayEvenElements)).toEqual(resultBubbleDescendingArrayEvenElements);
});

it('should check Selection Ascending sorting one', function () {
  expect(sortingSelectionAscending([...renderingArrayOneElements], mockArrayOneElements)).toEqual(resultSelectionAscendingArrayOneElements);
});

it('should check Selection Descending sorting one', function () {
  expect(sortingSelectionDescending([...renderingArrayOneElements], mockArrayOneElements)).toEqual(resultSelectionDescendingArrayOneElement);
});

it('should check Bubble Ascending sorting one', function () {
  expect(sortingBubbleAscending([...renderingArrayOneElements], mockArrayOneElements)).toEqual(resultBubbleAscendingArrayOneElements);
});

it('should check Bubble Descending sorting one', function () {
  expect(sortingBubbleDescending([...renderingArrayOneElements], mockArrayOneElements)).toEqual(resultBubbleDescendingArrayOneElements);
});

it('should check Selection Ascending sorting None', function () {
  expect(sortingSelectionAscending([...renderingArrayNoneElements], mockArrayNoneElements)).toEqual(resultSelectionAscendingArrayNoneElements);
});

it('should check Selection Descending sorting None', function () {
  expect(sortingSelectionDescending([...renderingArrayNoneElements], mockArrayNoneElements)).toEqual(resultSelectionDescendingArrayNoneElement);
});

it('should check Bubble Ascending sorting None', function () {
  expect(sortingBubbleAscending([...renderingArrayNoneElements], mockArrayNoneElements)).toEqual(resultBubbleAscendingArrayNoneElements);
});

it('should check Bubble Descending sorting None', function () {
  expect(sortingBubbleDescending([...renderingArrayNoneElements], mockArrayNoneElements)).toEqual(resultBubbleDescendingArrayNoneElements);
});
