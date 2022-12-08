import React from 'react';
import renderer from 'react-test-renderer';

import { render, screen } from '@testing-library/react';
import App from './app';

test('renders learn react link', () => {
  // render(<App />);
  // const linkElement = screen.getByText(/АЛГОСОШ/i);
  // expect(linkElement).toBeInTheDocument();
});

describe('первый тест', () => {
  test('My first test', () => {
    expect(Math.max(1, 5, 10)).toBe(10);
  });
});

test('My another one first test', () => {
  expect(Math.max(1, 5, 10)).toBe(10);
});

it('компонент div', () => {
  const element = renderer.create(<div> hhh</div>).toJSON();
  expect(element).toMatchSnapshot();
});

// test('My second test', () => {
//   expect(Math.max(1, 5, 10)).toBe(5);
// });
