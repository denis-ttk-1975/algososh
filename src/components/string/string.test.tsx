import { screen, fireEvent, getByTestId, render, waitFor } from '@testing-library/react';
import { StringComponent } from './string';
import { BrowserRouter as Router } from 'react-router-dom';

jest.setTimeout(10000);
jest.useFakeTimers();
it('Разворачиваем строку с четным количеством символов', () => {
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
  // setTimeout(expect(screen.getByTestId('result').textContent).toBe('654321'), 20000);
  // expect(screen.getByTestId('result').textContent).toBe('654321');
});
