import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders Button component', () => {
  render(<Button text="Click Me" />);
  expect(screen.getByText(/Click Me/)).toBeInTheDocument();
});
