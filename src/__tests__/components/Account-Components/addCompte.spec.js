import AddCompte from '../../../components/Account-Components/AddCompte';
import { render, screen, act, fireEvent, userEvent } from '@testing-library/react';
import { Context } from '../../../context/AccountContext';
import { AddCompteForm } from '../../../components/Account-Components/addCompte/AddCompteForm';
import { useState } from 'react';

describe('add compte component composition', () => {
  beforeEach(() => {
    act(() => {
      render(
        <Context.Provider value={{}}>
          <AddCompte></AddCompte>
        </Context.Provider>
      );
    });
  });

  // control title component on the screen
  it('should have the good component title', () => {
    const addCompteTitle = screen.getByTestId('add-compte-title');
    expect(addCompteTitle).toBeInTheDocument();
  });

  it('should have the good text title', () => {
    const addCompteTitle = screen.getByTestId('add-compte-title');
    expect(addCompteTitle).toHaveTextContent('Add Compte');
  });
  // control if form is in the document
  it('should have the form component', () => {
    const addCompteFormContainer = screen.getByTestId('Add-compte-form-container');
    expect(addCompteFormContainer).toBeInTheDocument();
  });
  it('should have labels', () => {
    const labels = screen.getAllByTestId('label');
    expect(labels.length).toBe(2);
  });
  it('should show the good label', () => {
    const labels = screen.getAllByTestId('label');
    expect(labels[1]).toHaveTextContent('Description');
  });
  it('should have send form button', () => {
    const formButton = screen.getByRole('button');
    expect(formButton).toBeInTheDocument();
    expect(formButton).toHaveTextContent('ajouter compte');
  });
});

// after : test input modification and fire events
describe('Add compte interactions', () => {
  beforeEach(() => {
    act(() => {
      render(
        <Context.Provider value={{}}>
          <AddCompte></AddCompte>
        </Context.Provider>
      );
    });
  });

  it('should add a bank into the input', () => {
    const bankInput = screen.getByTestId('bank-input');
    expect(bankInput).toBeInTheDocument();
    fireEvent.change(bankInput, { target: { value: 'LCL' } });
    expect(bankInput.value).toBe('LCL');
  });
  it('should add a description into the input value', () => {
    const descriptionInput = screen.getByTestId('description');
    expect(descriptionInput).toBeInTheDocument();
    fireEvent.change(descriptionInput, { target: { value: 'Banque perso' } });
    expect(descriptionInput.value).toBe('Banque perso');
  });

  // get the form
  it('should have a form', () => {
    const form = screen.getByTestId('addCompteForm');
    expect(form).toBeInTheDocument();
  });
  //   // thrid add bank and description and then click on the send button
  // to do later because there is an interaction with onSubmitForm
  // it('should send the good value to data', () => {
  //   const form = screen.getByTestId('addCompteForm');
  //   const formButton = screen.getByRole('button');
  //   const bankInput = screen.getByTestId('bank-input');
  //   const descriptionInput = screen.getByTestId('description');
  //   act(() => {
  //     fireEvent.change(descriptionInput, { target: { value: 'Banque perso' } });
  //     fireEvent.change(bankInput, { target: { value: 'LCL' } });
  //     fireEvent.click(formButton);
  //   });
  //   expect(form.datas).toHaveTextContent('Banque perso');
  // });
});
