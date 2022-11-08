import { createEvent, fireEvent, getByRole, render, screen, act } from '@testing-library/react';
import AffichageCount from '../../../../components/Account-Components/affichageCount/AffichageCount';
import { getAccountSolde } from '../../../../actions/AccountActions';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import React from 'react';
import { useState } from 'react';
import { Router, useLocation, Link } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import axios from 'axios';
import { oneAccountData } from '../../../../tests_utils/accountData';

describe('Test for rending affichage count component', () => {
  const history = createMemoryHistory();

  beforeEach(() => {
    render(
      <Router location={history.location} navigator={history}>
        <AffichageCount compte={oneAccountData}></AffichageCount>
      </Router>
    );
  });

  it('Should have a li', () => {
    const li = screen.getByTestId('account-li');
    expect(li).toBeInTheDocument();
  });

  it('should have h3 titles', () => {
    const h3Titles = screen.getAllByTestId('category-title');
    expect(h3Titles.length).toBe(4);
  });

  it('should have a text in a h3', () => {
    //c'est Amandine qui l'a dicté ^^
    const textH3 = screen.getByText(/Dernière Action/i);
    expect(textH3).toBeInTheDocument();
  });

  it('should have good text in choosen h3', () => {
    const h3Titles = screen.getAllByTestId('category-title');
    const h3Description = screen.getByText(/Dernière Action/i, { exact: false });
    expect(h3Titles[2]).toBe(h3Description);
  });

  it('should render the good link path', () => {
    const Link = screen.getByTestId('Account-Link');
    expect(Link).toBeInTheDocument();
    expect(Link).toHaveAttribute('href', '/account/0dd334ed-a515-4a79-b95d-116d8xy69701');
  });

  it('should have a good account data bank', () => {
    const h3Titles = screen.getAllByTestId('category-title');
    // expect(h3Titles[0]).toHaveTextContent('BNP');
    expect(h3Titles[0]).toHaveTextContent(oneAccountData.bank);
  });

  it('should have a good bank description data', () => {
    const bankdescription = screen.getByTestId('compte-description');
    expect(bankdescription).toBeInTheDocument();
    expect(bankdescription).toHaveTextContent(oneAccountData.description);
  });
});

// after we have to test interaction with good datas value : sold, amount etc...
// so maybe to mock getAccountSolde function
