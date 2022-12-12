import React from 'react';
import renderer from 'react-test-renderer';

import { render, screen } from '@testing-library/react';
import App from './app';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/АЛГОСОШ/i);
  expect(linkElement).toBeInTheDocument();
});
