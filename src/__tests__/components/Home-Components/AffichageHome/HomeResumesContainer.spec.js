import { render, screen, act, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import HomeResumesContainer from '../../../../components/Home-Components/AffichageHomeAccount/HomeResumesContainer';
import datasMocked from '../../../../tests_utils/homeData';

describe('HomeResumesContainer', () => {
  it('should display accounts resume page', () => {
    render(<HomeResumesContainer accountsData={datasMocked}></HomeResumesContainer>);
    const accountsResumesContainer = screen.getByTestId('resumes container');
    expect(accountsResumesContainer).toBeInTheDocument();
  });
  // à voir marche pas celui-là
  it('should have many accounts', () => {
    render(<HomeResumesContainer accountsData={datasMocked}></HomeResumesContainer>);
    const accountsResumes = screen.getAllByTestId('accountResume');
    waitFor(() => expect(accountsResumes.length).toEqual(3));
  });
});
