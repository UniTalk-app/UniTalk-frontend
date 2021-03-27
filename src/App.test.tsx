import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('example, bumb test', () => {
  render(<App />);
  expect(1).toEqual(1);
});
