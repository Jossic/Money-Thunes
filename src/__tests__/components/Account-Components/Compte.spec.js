import {
  createEvent,
  fireEvent,
  getByRole,
  render,
  screen,
  waitFor,
  act
} from '@testing-library/react';
import React from 'react';
import Compte from '../../../components/Account-Components/Compte';
import AffichageCount from '../../../components/Account-Components/affichageCount/AffichageCount';
import { Provider, getAccount } from '../../../context/AccountContext';
import { accountsData } from '../../../tests_utils/accountData';
import { createMemoryHistory } from 'history';
import { Router, useLocation, Link } from 'react-router-dom';
import { getAllAccounts } from '../../../actions/AccountActions';
import axios from 'axios';
import { renderHook } from '@testing-library/react-hooks';

// jest.mock('axios', () => ({
//   ...jest.requireActual('axios'),
//   get: jest.fn()
// }));

// const mockGet = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve(accountsData)
//   })
// );
const initialStateNotLoaded = {
  isLoaded: false,
  infos: {}
};
const initialStateAfterLoaded = {
  isLoaded: true,
  infos: [
    {
      uidtransaction: '2022.5.1d7f036a-e7b2-46ea-a7f4-757e5a987a4a',
      uidaccount: '0dd334ed-a515-4a79-b95d-116d8be76065',
      description: 'Salaire',
      bank: 'LCL',
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
      uidaccount: '0dd334ed-a515-4a79-b95d-116d8xy69701',
      description: 'compte perso',
      bank: 'BNP',
      amount: 799,
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
  ]
};

const baseUrl = 'https://dev.user.beswarm.net/api/user/v1/bank';

describe('test if loading status is showned if there is not the data', () => {
  const history = createMemoryHistory();
  const token = '12341';

  it('should show loading', () => {
    render(
      <Provider value={{ state: initialStateNotLoaded }}>
        <Router location={history.location} navigator={history}>
          <Compte></Compte>
        </Router>
      </Provider>
    );

    const chargingTitle = screen.getByTestId('charging title');
    expect(chargingTitle).toBeInTheDocument();
    expect(chargingTitle).toHaveTextContent('Chargement ...');
  });

  // it('expect to have call api', async () => {
  //   // jest.fn(axios.get('https://dev.user.beswarm.net/api/user/v1/bank/account'));

  //   // render(
  //   //   <Context.Provider value={{ state: initialState }}>
  //   //     <Router location={history.location} navigator={history}>
  //   //       <Compte></Compte>
  //   //     </Router>
  //   //   </Context.Provider>
  //   // );
  //   // const { result } = renderHook(() => getAllAccounts());

  //   act(() => {
  //     result.current.getAllAccounts(getAccount(token));
  //   });
  //   // expect(axios.get).toHaveBeenCalledWith(`${baseUrl}//account`, {
  //   //   headers: {
  //   //     authorization: `Bearer ${token}`
  //   //   }
  //   // });
  //   expect(axios.get).toHaveBeenCalled();
  // });
});

describe(' test interaction when there is a response with data', () => {
  const history = createMemoryHistory();
  jest.mock('axios', () => ({
    ...jest.requireActual('axios'),
    get: jest.fn()
  }));

  const mockGet = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(accountsData)
    })
  );
  jest.fn(axios.get('https://dev.user.beswarm.net/api/user/v1/bank/account'));
  it('expect to have account container to show accounts', async () => {
    act(() => {
      render(
        <Provider value={{ state: initialStateAfterLoaded }}>
          <Router location={history.location} navigator={history}>
            <Compte></Compte>
          </Router>
        </Provider>
      );
    });

    waitFor(() => {
      const accountContainer = screen.getAllByTestId('account-container');
      expect(accountContainer).toBeInTheDocument();
    });
  });
});

it.skip('wainting help to debug problem with context function mock', () => {
  describe('test if account component provider is rendered', () => {
    const history = createMemoryHistory();

    // jest.fn().mockImplementation(async () =>
    //   Promise.resolve({
    //     json: () =>
    //       Promise.resolve({
    //         uidtransaction: '2022.5.1d7f036a-e7b2-46ea-a7f4-757e5a987a4a',
    //         uidaccount: '0dd334ed-a515-4a79-b95d-116d8be76065',
    //         description: 'Salaire',
    //         bank: 'LCL',
    //         amount: 2110,
    //         date: '2022-05-24T00:00:00Z',
    //         family: {
    //           uidreferential: 'string',
    //           uid: 'string',
    //           codelang: 'st',
    //           description: 'string',
    //           thumbnail: 'string'
    //         },
    //         hasdocument: true
    //       })
    //   })
    // );

    // first is not loaded
    it('should have loading information because data are not yet downloaded', () => {
      const initialState = {
        isLoaded: false,
        infos: {}
      };
      const account = jest.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              value: accountsData
            })
        })
      );
      act(() => {
        // jest.fn(axios.get('https://dev.user.beswarm.net/api/user/v1/bank/account'));
        render(
          <Context.Provider value={{ state: initialState }} getAccount={getAllAccounts}>
            <Router location={history.location} navigator={history}>
              <Compte getAccount={getAllAccounts}></Compte>
            </Router>
          </Context.Provider>
        );
      });

      const charginTitle = screen.getByTestId('charging title');
      expect(charginTitle).toBeInTheDocument();
    });

    // beforeEach(() => {
    //   const state = {
    //     infos: accountsData,
    //     isLoaded: true
    //   };
    //   act(() => {
    //     render(
    //       <Context.Provider value={{ state: state }}>
    //         <Router location={history.location} navigator={history}>
    //           <Compte token={'pozepozeopoio,in,151'} />
    //         </Router>
    //       </Context.Provider>
    //     );
    //   });
    // });
    // it('should have compte', () => {
    //   const chargingTitle = screen.getByTestId('charging title');
    //   expect(chargingTitle).toBeInTheDocument();
    // });
  });
});

// describe('Test for account component', () => {
//   // const TestContext = React.useContext(Context);
//   // const AffichageCountContextRender = (compte) => {
//   //   return render(<TestContext>{compte}</TestContext>); //bloque ici avec le provider
//   // };
//   const ProviderInfos = {
//     infos: accountsData,
//     isLoaded: true
//   };
//   const AffichageCountContextRender = (compte) => {
//     return render(<Context.Provider value={ProviderInfos}>{compte}</Context.Provider>); //bloque ici avec le provider
//   };
//   beforeEach(() => {
//     AffichageCountContextRender(<Compte />);
//   });

//   it('Should show h1 title', () => {
//     const accountListTitle = screen.getByText(/Liste des comptes/i);
//     expect(accountListTitle).toBeInTheDocument();
//   });

//   it('Should have a h1', async () => {
//     const h1Title = screen.getByTestId('H1');
//     expect(h1Title).toBeInTheDocument();
//   });

//   it('Should have ul container of all accounts', () => {
//     const ulContainer = screen.getByTestId('account-container');
//     expect(ulContainer).toBeInTheDocument();
//   });
// });

// describe('Test for interaction component', () => {
//   render(
//     <Compte
//       data={[
//         {
//           uidtransaction: '2022.5.1d7f036a-e7b2-46ea-a7f4-707e5a987a4a',
//           uidaccount: '0dd334ed-a515-4a79-b95d-116d8be76065',
//           description: 'LCL',
//           amount: 1999,
//           date: '2022-05-23T00:00:00Z',
//           family: {
//             uidreferential: 'string',
//             uid: 'string',
//             codelang: 'st',
//             description: 'string',
//             thumbnail: 'string'
//           },
//           hasdocument: true
//         },
//         {
//           uidtransaction: '2022.5.1d7f036a-e7b2-46ea-a7f4-757e5a987a4a',
//           uidaccount: '0dd334ed-a515-4a79-b95d-116d8be76065',
//           description: 'BNP',
//           amount: 200,
//           date: '2022-05-24T00:00:00Z',
//           family: {
//             uidreferential: 'string',
//             uid: 'string',
//             codelang: 'st',
//             description: 'string',
//             thumbnail: 'string'
//           },
//           hasdocument: true
//         }
//       ]}>
//       <AffichageCount />
//     </Compte>
//   );

//   it('Should show any li in ul container', () => {
//     const ul = screen.getByTestId('account-container');
//     expect(ul).toBeInTheDocument();
//     // const li = screen.getAllByTestId('account-li');
//     // expect(li).toBeInTheDocument();
//   });
// });
