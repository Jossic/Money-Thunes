import { fireEvent, getAllByRole, getByRole, render, screen, act } from '@testing-library/react';
import { getMonthlyTransaction } from '../../../actions/AccountActions';
import AddEntry from '../../../components/Entry-Components/AddEntry';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import ListEntry from '../../../components/Entry-Components/ListEntry';
jest.mock('axios', () => ({
  ...jest.requireActual('axios'),
  get: jest.fn()
}));

it.skip('Wainting for another api call test method', () => {
  describe('Tests for add entry', () => {
    // const server = setupServer(
    //   rest.get(
    //     `https://dev.user.beswarm.net/api/user/v1/bank/transaction/0dd334ed-a515-4a79-b95d-116d8be76065/2022/5`,
    //     (req, res, ctx) => {
    //       return res(
    //         ctx.status(200),
    //         ctx.json({
    //           datas: [
    //             {
    //               uidtransaction: '2022.5.1d7f036a-e7b2-46ea-a7f4-707e5a987a4a',
    //               uidaccount: '0dd334ed-a515-4a79-b95d-116d8be76065',
    //               description: 'sgdeh',
    //               amount: 2110,
    //               date: '2022-05-23T00:00:00Z',
    //               family: {
    //                 uidreferential: 'string',
    //                 uid: 'string',
    //                 codelang: 'st',
    //                 description: 'string',
    //                 thumbnail: 'string'
    //               },
    //               hasdocument: true
    //             },
    //             {
    //               uidtransaction: '2022.5.1d7f036a-e7b2-46ea-a7f4-757e5a987a4a',
    //               uidaccount: '0dd334ed-a515-4a79-b95d-116d8be76065',
    //               description: 'Salaire',
    //               amount: 2110,
    //               date: '2022-05-24T00:00:00Z',
    //               family: {
    //                 uidreferential: 'string',
    //                 uid: 'string',
    //                 codelang: 'st',
    //                 description: 'string',
    //                 thumbnail: 'string'
    //               },
    //               hasdocument: true
    //             }
    //           ],
    //           status: 200,
    //           error: {
    //             errorCode: 0,
    //             description: '',
    //             descriptionLang: {
    //               EN: ''
    //             },
    //             function: null
    //           }
    //         })
    //       );
    //     }
    //   )
    // );
    const server = jest.fn(() =>
      // tenté cette version là
      Promise.resolve({
        json: () =>
          Promise.resolve({
            datas: [
              {
                uidtransaction: '2022.5.1d7f036a-e7b2-46ea-a7f4-707e5a987a4a',
                uidaccount: '0dd334ed-a515-4a79-b95d-116d8be76065',
                description: 'sgdeh',
                amount: 2110,
                date: '2022-05-23T00:00:00Z',
                family: {
                  uidreferential: 'string',
                  uid: 'string',
                  codelang: 'st',
                  description: 'string',
                  thumbnail: 'string'
                },
                hasdocument: true
              },
              {
                uidtransaction: '2022.5.1d7f036a-e7b2-46ea-a7f4-757e5a987a4a',
                uidaccount: '0dd334ed-a515-4a79-b95d-116d8be76065',
                description: 'Salaire',
                amount: 2110,
                date: '2022-05-24T00:00:00Z',
                family: {
                  uidreferential: 'string',
                  uid: 'string',
                  codelang: 'st',
                  description: 'string',
                  thumbnail: 'string'
                },
                hasdocument: true
              }
            ]
          })
      })
    );
    // beforeEach(() => server.resetHandlers());
    // beforeAll(() => server.listen());
    // afterAll(() => server.close());
    it('should load at least one transaction', async () => {
      const transactions = await getMonthlyTransaction('0dd334ed-a515-4a79-b95d-116d8be76065', 12);
      act(() => render(<AddEntry />));
      // const welcomeElement = screen.getByText(/Welcome to money-thunes/i);
      expect(transactions.datas[1]).toEqual({
        uidtransaction: '2022.5.1d7f036a-e7b2-46ea-a7f4-757e5a987a4a',
        uidaccount: '0dd334ed-a515-4a79-b95d-116d8be76065',
        description: 'Salaire',
        amount: 2110,
        date: '2022-05-24T00:00:00Z',
        family: {
          uidreferential: 'string',
          uid: 'string',
          codelang: 'st',
          description: 'string',
          thumbnail: 'string'
        },
        hasdocument: true
      });
    });

    it('should load 2 transactions', async () => {
      const transactions = await getMonthlyTransaction('0dd334ed-a515-4a79-b95d-116d8be76065', 12);
      expect(transactions.datas.length).toBe(2);
    });

    it('should show at least one tr', async () => {
      render(
        <ListEntry
          accountData={[
            {
              uidtransaction: '2022.5.1d7f036a-e7b2-46ea-a7f4-757e5a987a4a',
              uidaccount: '0dd334ed-a515-4a79-b95d-116d8be76065',
              description: 'Salaire',
              amount: 2110,
              date: '2022-05-24T00:00:00Z',
              family: {
                uidreferential: 'string',
                uid: 'string',
                codelang: 'st',
                description: 'string',
                thumbnail: 'string'
              },
              hasdocument: true
            },
            {
              uidtransaction: '2022.5.1d7f036a-e7b2-46ea-a7f4-707e5a987a4a',
              uidaccount: '0dd334ed-a515-4a79-b95d-116d8be76065',
              description: 'sgdeh',
              amount: 2110,
              date: '2022-05-23T00:00:00Z',
              family: {
                uidreferential: 'string',
                uid: 'string',
                codelang: 'st',
                description: 'string',
                thumbnail: 'string'
              },
              hasdocument: true
            }
          ]}
        />
      );

      const transactions = screen.getAllByRole('cell');
      expect(transactions.length).toBe(6);
    });
  });
});
