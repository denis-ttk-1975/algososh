import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

it('компонент Button без пропсов', () => {
  const element = renderer.create(<Button />).toJSON();
  expect(element).toMatchSnapshot();
});

it('компонент Button c пропсом text', () => {
  const element = renderer.create(<Button text='Several words' />).toJSON();
  expect(element).toMatchSnapshot();
});

it('компонент Button c пропсом disabled', () => {
  const element = renderer.create(<Button disabled={true} />).toJSON();
  expect(element).toMatchSnapshot();
});

it('компонент Button c пропсом isLoader', () => {
  const element = renderer.create(<Button isLoader={true} />).toJSON();
  expect(element).toMatchSnapshot();
});

it('Нажатие на кнопку вызывает корректный коллбэк', () => {
  window.alert = jest.fn();

  // Рендерим компонент
  render(<Button text='Callback ignition test' onClick={() => alert('Button pressed')} />);

  // Находим элемент ссылки
  const button = screen.getByText('Callback ignition test');

  // Имитируем нажатие на ссылку
  fireEvent.click(button);

  // Проверяем, что alert сработал с правильным текстом предупреждения
  expect(window.alert).toHaveBeenCalledWith('Button pressed');
});
