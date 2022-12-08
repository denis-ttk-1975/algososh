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
