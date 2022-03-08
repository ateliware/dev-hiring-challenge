import { render, screen } from '@testing-library/react';
import App from './App';

test('renders repos table', async () => {
  render(<App />);
  const element = screen.getByRole('table');
  expect(element).toBeInTheDocument();
});

