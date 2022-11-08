import React, { useEffect, useState } from 'react';
import { Navigate, useParams, useSearchParams, useLocation, useMatch } from 'react-router-dom';
import { getAccountById, updateAccountAmount } from '../actions/AccountActions';
import { withSnackbar } from '../components/HOC/Snackbar';
import AddAnEntry from '../components/Entry-Components/AddEntry';
import ListEntry from '../components/Entry-Components/ListEntry';
import LateralMenu from '../components/Layout/LateralMenu/LateralMenu';
import AccountContainer from '../components/Layout/LateralMenu';
import { entryScreenLinks } from '../utils/lateralLinks';
import { getCookie } from '../actions/AuthActions';
import Loader from '../components/Layout/Loader/Loader';
import { getMonthlyTransaction } from '../actions/AccountActions';
import { getMonth } from '../utils/dateParser';
import { getYear } from '../utils/dateParser';
import { getAccountSolde } from '../actions/AccountActions';
import { ChangeDateSold } from '../components/Account-Components/changeDateSold/ChangeDateSold';
import Title from '../components/UX/Title';
import { convertMonth } from '../utils/dateParser';

function WritingScreen({ snackbarShowMessage }) {
  const token = getCookie('token');
  const [loading, setLoading] = useState(false);
  const [accountData, setAccountData] = useState([]);
  const { id } = useParams();

  const [accountTransactions, setAccountTransactions] = useState([]);
  const [isThereATransaction, setIsThereATransaction] = useState(false);
  const [accountSold, setAccountSold] = useState('');
  const [month, setMonth] = useState(getMonth() + 1);
  const [year, setYear] = useState(getYear());
  // const [year, setYear] = useState('');
  // const [changedYear, setChangedYear] = useState('');

  // const getAccountData = async () => {
  //   setLoading(true);
  //   const result = await getAccountById(token, id);
  //   console.log(`result =>`, result);
  //   if (result.status === 200) {
  //     setAccountData(result.datas);
  //     setLoading(false);
  //   } else {
  //     console.log('new error : ', result.error);
  //     setLoading(false);
  //   }
  // };
  // const getAccountData = () => {
  //   setLoading(true);
  //   getAccountById(token, id)
  //     .then((result) => {
  //       console.log(`result =>`, result);
  //       if (result.status === 200) {
  //         setAccountData(result.datas);
  //         setLoading(false);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('new error : ', error);
  //       setLoading(false);
  //     });
  // };

  const getMonthlyAccountSold = () => {
    getAccountSolde(token, id, year, month).then((account) => setAccountSold(account.datas.amount));
  };

  useEffect(() => {
    setLoading(true);
    getAccountById(token, id)
      .then((result) => {
        console.log(`result =>`, result);
        if (result.status === 200) {
          setAccountData(result.datas);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log('new error : ', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // getAccountData;
    console.log('first le year', year);
    console.log('deux le month', month);
    getAccountSolde(token, id, year, month).then((account) => setAccountSold(account.datas.amount));
    getMonthlyTransaction(id, token, year, month).then((result) => {
      if (result.status === 200) {
        setIsThereATransaction(true);
        setAccountTransactions(result.datas);
      } else {
        setIsThereATransaction(false);
      }
    });
  }, [isThereATransaction, accountSold, year, month]);

  const updateSold = async (previousSold, lastTransaction) => {
    let newSold = previousSold + lastTransaction;
    const data = {
      uidaccount: id,
      year,
      month,
      amount: newSold
    };
    const result = await updateAccountAmount(token, data);
    if (result.status === 200) {
      getMonthlyAccountSold();
      snackbarShowMessage('solde mis à jour', 'success');
    } else {
      snackbarShowMessage(result.error.description.message);
    }
    console.log('sold :', previousSold);
    console.log('last trans :', lastTransaction);
    console.log('new sold :', newSold);
  };

  return (
    <AccountContainer>
      <LateralMenu links={entryScreenLinks} />
      {loading ? (
        <div className="w-full pl-[2%] pr-[2%] xl:pl-[5%] xl:pr-[5%] max-w-[1600px] sm:ml-auto sm:mr-auto">
          <Loader />
        </div>
      ) : (
        accountData && (
          <div className="w-full pl-[2%] pr-[2%] xl:pl-[5%] xl:pr-[5%] max-w-[1600px] sm:ml-auto sm:mr-auto">
            <div className="mt-2 mb-2">
              <Title
                className="mt-4"
                title={`Transactions du compte : ${accountData.bank}`}
                size={'large'}
                color={'#1374cd'}></Title>
            </div>
            <div className="flex justify-evenly items-center h-12 ">
              <Title title={month && `${convertMonth(month)} ${year}`} color={'black'}></Title>
              <Title
                fontWeight={'bolder'}
                title={`Solde : ${accountSold} €`}
                color={'black'}></Title>
            </div>
            <Title title={'Transactions'} size={'medium'} color={'black'}></Title>
            {/* Données du compte : {JSON.stringify(accountData)} */}
            <AddAnEntry
              accountTransactions={accountTransactions}
              setAccountTransactions={setAccountTransactions}
              loading={loading}
              setLoading={setLoading}
              urlId={id}
              snackbarShowMessage={snackbarShowMessage}
              updateSold={updateSold}
              accountSold={accountSold}
              month={month}
              year={year}
            />
            <ChangeDateSold
              accountData={accountData}
              accountSold={accountSold}
              setMonth={setMonth}
              month={month}
              year={year}
              setYear={setYear}
              loading={loading}
              setLoading={setLoading}
            />
            <ListEntry
              accountTransactions={accountTransactions}
              isThereATransaction={isThereATransaction}
              accountId={id}
              accountSold={accountSold}
              setAccountSold={setAccountSold}
              year={year}
              month={month}
              snackbarShowMessage={snackbarShowMessage}
              // getMonthlyAccountSold={getMonthlyAccountSold}
              // getAccountData={getAccountData}
            />
          </div>
        )
      )}
    </AccountContainer>
  );
}

export default withSnackbar(WritingScreen);
