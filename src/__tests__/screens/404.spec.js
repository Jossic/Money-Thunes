import Error404 from '../../screens/404';
import { render, screen } from '@testing-library/react';

describe('404 page', () => {
  it('should display 404 error', () => {
    render(<Error404 />);
    const linkElement = screen.getByText(/404 error/i);
    expect(linkElement).toBeInTheDocument();
  });
});
