import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-test-renderer';
import AddEntry from '../../../components/Entry-Components/AddEntry';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { addEntry } from '../../../actions/AccountActions';
import axios from 'axios';
import { accountsData } from '../../../tests_utils/accountData';
import { useForm, FormProvider } from 'react-hook-form';

jest.mock('axios', () => ({
  ...jest.requireActual('axios'),
  post: jest.fn()
}));
const fakeToken = 'uuopo212145e2e656fef6v888';

// here with mock functions
it.skip('just problem with setAccountData to end', () => {
  describe('Tests for add entry with mock', () => {
    beforeEach(() => {
      render(
        <AddEntry accountData={accountsData[0]}>
          <FormProvider token={fakeToken} />
        </AddEntry>
      );
      addEntryToggleButton = screen.getByTestId('add-entry-toggle-button');
      fireEvent.click(addEntryToggleButton);
      [dateInput, labelInput, categoryInput, recurrentInput, amountInput] =
        screen.getAllByTestId('add-entry-input');
      fireEvent.change(dateInput, { target: { value: '2022-05-24' } });
      fireEvent.change(labelInput, { target: { value: 'Salaire' } });
      fireEvent.change(categoryInput, { target: { value: 'Recette' } });
      fireEvent.change(amountInput, { target: { value: '3000' } });
    });
    let addEntryToggleButton, dateInput, labelInput, categoryInput, recurrentInput, amountInput;
    const accountInfos = {
      uidaccount: '0dd334ed-a515-4a79-b95d-116d8be76065',
      description: 'Salaire',
      amount: '3000',
      date: '24/05/2022'
    };

    it('should send the data', async () => {
      await act(() => {
        fireEvent.click(screen.getByTestId('add-entry-button'));
      });
      const body = {
        uidaccount: accountInfos.uidaccount,
        description: labelInput.value,
        amount: amountInput.value,
        date: dateInput.value,
        family: {
          uidreferential: 'string',
          uid: 'string',
          codelang: 'st',
          description: 'string',
          thumbnail: 'string'
        },
        document: {
          content: 'string',
          type: 'string'
        }
      };
      expect(axios.post).toHaveBeenCalledWith(
        'https://dev.user.beswarm.net/api/user/v1/bank/transaction',
        expect.objectContaining({
          description: labelInput.value,
          amount: amountInput.value,
          date: dateInput.value
        }),
        {
          headers: { 'content-type': 'application/json', authorization: `Bearer undefined` }
        }
      );
    });
  });
});

// it.skip('Waiting another method for testing api call', () => {
const baseUrl = 'https://dev.user.beswarm.net/api/user/v1/bank';
describe('Tests for add entry', () => {
  it('should display Add entry toggle button', () => {
    render(<AddEntry />);
    const addEntryToggleButton = screen.getByTestId('add-entry-toggle-button');
    expect(addEntryToggleButton).toBeInTheDocument();
  });
  it('should display form when click on toggle button', async () => {
    render(<AddEntry />);
    const addEntryToggleButton = screen.getByTestId('add-entry-toggle-button');
    expect(screen.queryByTestId('add-entry-button')).not.toBeInTheDocument();
    act(() => {
      fireEvent.click(addEntryToggleButton);
    });
    const addEntryButton = screen.getByTestId('add-entry-button');
    expect(addEntryButton).toBeInTheDocument();
  });
  it('should display all input', async () => {
    render(<AddEntry />);
    const addEntryToggleButton = screen.getByTestId('add-entry-toggle-button');
    act(() => {
      fireEvent.click(addEntryToggleButton);
    });
    const inputs = screen.getAllByTestId('add-entry-input');
    expect(inputs.length).toBe(5);
  });
});
describe('Tests for interaction', () => {
  let addEntryToggleButton, dateInput, labelInput, categoryInput, recurrentInput, amountInput;
  // beforeEach(() => {
  //   render(<AddEntry />);
  // });
  beforeAll(() => {
    render(<AddEntry />);
    addEntryToggleButton = screen.getByTestId('add-entry-toggle-button');
    fireEvent.click(addEntryToggleButton);
    [dateInput, labelInput, categoryInput, recurrentInput, amountInput] =
      screen.getAllByTestId('add-entry-input');
  });
  const fillForm = () => {
    fireEvent.change(dateInput, { target: { value: '2022-05-24' } });
    fireEvent.change(labelInput, { target: { value: 'Salaire' } });
    fireEvent.change(categoryInput, { target: { value: 'Recette' } });
    fireEvent.change(amountInput, { target: { value: '3000' } });
  };
  it('should trigger error when required fields are empty', async () => {
    await act(() => {
      const addEntryButton = screen.getByTestId('add-entry-button');
      fireEvent.click(addEntryButton);
    });
    const errorFields = screen.getAllByTestId(/-error$/i);
    expect(errorFields[0].getAttribute('data-testid')).toBe('date-error');
    expect(errorFields[1].getAttribute('data-testid')).toBe('label-error');
    expect(errorFields[2].getAttribute('data-testid')).toBe('amount-error');
  });
  it('should check if fields are correctly setup', async () => {
    fillForm();
    expect(dateInput.value).toBe('2022-05-24');
    expect(labelInput.value).toBe('Salaire');
    expect(categoryInput.value).toBe('Recette');
    expect(amountInput.value).toBe('3000');
  });
  // it('should sends data when clicking on add entry button', async () => {
  //   const accountInfos = {
  //     uidaccount: '0dd334ed-a515-4a79-b95d-116d8be76065',
  //     description: 'Salaire',
  //     amount: '3000',
  //     date: '24/05/2022'
  //   };
  //   const requestBody = await addEntry(accountInfos, '0dd334ed-a515-4a79-b95d-116d8be76065', 12);
  //   expect(requestBody.datas).toEqual('sdondfgn184f-d1f6nn4-gh7hj78l7l8');
  // });
});
// async function waitFor(timeInMs) {
//   await new Promise((resolve) => setTimeout(resolve, timeInMs));
// }
// });
