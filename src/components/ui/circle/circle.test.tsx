import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

it('компонент Circle без пропсов', () => {
  const element = renderer.create(<Circle />).toJSON();
  expect(element).toMatchSnapshot();
});

it('компонент Circle c пропсом letter', () => {
  const element = renderer.create(<Circle letter={'3'} />).toJSON();
  expect(element).toMatchSnapshot();
});

it('компонент Circle c пропсом head', () => {
  const element = renderer.create(<Circle head={'head'} />).toJSON();
  expect(element).toMatchSnapshot();
});

it('компонент Circle c пропсом tail', () => {
  const element = renderer.create(<Circle tail={'tail'} />).toJSON();
  expect(element).toMatchSnapshot();
});

it('компонент Circle c пропсом head с компонентом', () => {
  const element = renderer.create(<Circle head={<Circle />} />).toJSON();
  expect(element).toMatchSnapshot();
});

it('компонент Circle c пропсом tail с компонентом', () => {
  const element = renderer.create(<Circle tail={<Circle />} />).toJSON();
  expect(element).toMatchSnapshot();
});

it('компонент Circle c пропсом isSmall', () => {
  const element = renderer.create(<Circle isSmall={true} />).toJSON();
  expect(element).toMatchSnapshot();
});

it('компонент Circle c пропсом index', () => {
  const element = renderer.create(<Circle index={5} />).toJSON();
  expect(element).toMatchSnapshot();
});

it('компонент Circle в состоянии default', () => {
  const element = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
  expect(element).toMatchSnapshot();
});

it('компонент Circle в состоянии changing', () => {
  const element = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
  expect(element).toMatchSnapshot();
});

it('компонент Circle в состоянии modified', () => {
  const element = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
  expect(element).toMatchSnapshot();
});
