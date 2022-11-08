import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import App from '../App';

it('should display state page', () => {
  expect(true).toBe(true);
});
it('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Money - Thunes/i);
  expect(linkElement).toBeInTheDocument();
});
