import HomeScreen from '../../screens/HomeScreen';
import { render, screen, act, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';

describe('home page', () => {
  it('should display home page', () => {
    act(() => {
      render(
        <Router location={'/'} navigator={history}>
          <HomeScreen></HomeScreen>
        </Router>
      );
    });
    const titleSection = screen.getAllByText('Synthèse des comptes');
    // act(() => {
    //   setPage('resumes')})
    expect(titleSection.length).toEqual(2);
  });
  // path categories
  it('should display categories components', () => {
    render(
      <Router location={'/categories'} navigator={history}>
        <HomeScreen></HomeScreen>
      </Router>
    );
    const h3Title = screen.getByTestId('title waiting');
    waitFor(() => expect(h3Title).toBeInTheDocument());
  });
  // path shorcuts
  it('should display categories components', () => {
    render(
      <Router location={'/shortcuts'} navigator={history}>
        <HomeScreen></HomeScreen>
      </Router>
    );
    const h3Title = screen.getByTestId('title waiting shortcuts');
    waitFor(() => expect(h3Title).toBeInTheDocument());
  });
});
