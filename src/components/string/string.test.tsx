import { screen, fireEvent, getByTestId, render, waitFor } from '@testing-library/react';
import { StringComponent, twoElementsOfArrayReversion } from './string';
import { BrowserRouter as Router } from 'react-router-dom';
import { ElementStates } from '../../types/element-states';

const testArray = [
  { element: 'A', type: ElementStates.Default },
  { element: 'B', type: ElementStates.Default },
  { element: 'C', type: ElementStates.Default },
  { element: 'D', type: ElementStates.Default },
];

const firstResultArray = [
  {
    element: 'A',
    type: 'changing',
  },
  {
    element: 'B',
    type: 'default',
  },
  {
    element: 'C',
    type: 'default',
  },
  {
    element: 'D',
    type: 'changing',
  },
];

const secondResultArray = [
  {
    element: 'D',
    type: 'modified',
  },
  {
    element: 'B',
    type: 'changing',
  },
  {
    element: 'C',
    type: 'changing',
  },
  {
    element: 'A',
    type: 'modified',
  },
];

jest.setTimeout(10000);
jest.useFakeTimers();
it('тест внесения строки в инпут', () => {
  render(
    <Router>
      <StringComponent />
    </Router>
  );
  const button = screen.getByTestId('button');
  // Находим инпут и устанавливаем пустым
  const inputValue: HTMLInputElement = screen.getByTestId('word');
  inputValue.textContent = '';
  // устанавливаем значение строки для разворота строки
  fireEvent.change(inputValue, { target: { value: '123456' } });
  expect(inputValue.value).toBe('123456');
  fireEvent.click(button);
});

it('возврат крайних элементов с признаком changing', function () {
  expect(twoElementsOfArrayReversion(testArray, 0, testArray.length - 1)).toEqual(firstResultArray);
});

it('разворот крайних элементов и возврат второго и предпоследнего элемента с признаком changing', function () {
  expect(twoElementsOfArrayReversion(testArray, 1, testArray.length - 2)).toEqual(secondResultArray);
});
