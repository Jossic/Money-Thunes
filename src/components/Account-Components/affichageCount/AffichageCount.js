import React, { useEffect, useState } from 'react';
import { getAccountSolde } from '../../../actions/AccountActions';
import { getCookie } from '../../../actions/AuthActions';
import { Link } from 'react-router-dom';
import { getMonthlyTransaction } from '../../../actions/AccountActions';
import { getMonth, getYear } from '../../../utils/dateParser';
import NoTransaction from '../../Home-Components/NoTransction';

function AffichageCount({ compte }) {
  const [sold, setSold] = useState('');
  const [isAccountLoaded, setLoaded] = useState(false);
  const [lastTransaction, setLastTransaction] = useState({});
  const [lastTransactionAmout, setLastTransactionAmount] = useState('');
  const token = getCookie('token');
  const id = compte.uidaccount;

  useEffect(() => {
    getAccountSolde(token, id)
      .then((res) => {
        if (res.status === 200) {
          setSold(res.datas.amount);
          setLoaded(true);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const month = getMonth() + 1;
    const year = getYear();
    getMonthlyTransaction(id, token, year, month)
      .then((transactions) => {
        // console.log('transactions', transactions);
        const transactionsByDate = transactions.datas.sort(
          (previous, next) => Date.parse(next.date) - Date.parse(previous.date)
        );
        console.log('la der', transactionsByDate);
        setLastTransaction(transactionsByDate[0]);
        console.log('transaction der', lastTransaction);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Link
      data-testid="Account-Link"
      to={{
        pathname: `/account/${compte.uidaccount}`
      }}
      state={{
        compteData: compte,
        soldData: sold
      }}>
      <li
        className="mdlg:h-32 my-5 mdlg:grid mdlg:grid-cols-[1fr_1fr_2.5fr_1fr] gap-2 rounded-md bg-[#d9d9d9] content-center p-2 hover:shadow-xl "
        data-testid="account-li">
        <div className="flex flex-col justify-between">
          <h3 data-testid="category-title">{compte.bank}</h3>
          <p data-testid="compte-description">{compte.description}</p>
        </div>
        <div className="flex flex-col ">
          <h3 data-testid="category-title" className="mb-3">
            Solde du mois en cours
          </h3>
          <p data-testid="sold-amount">{isAccountLoaded ? sold + '€' : 'En chargement'}</p>
        </div>
        <div className="flex flex-col justify-between ">
          <h3 data-testid="category-title" className="mb-3">
            Dernière Action
          </h3>
          <>
            <div className="flex justify-center">
              {lastTransaction && (
                <>
                  <p className="text-left mr-4 ">{lastTransaction.description}</p>
                  <p>{lastTransaction.amount}</p>{' '}
                </>
              )}
            </div>
          </>
        </div>
        <div className="flex flex-col ">
          <h3 data-testid="category-title" className="mb-3">
            Etat Compte
          </h3>
        </div>
      </li>
    </Link>
  );
}

export default AffichageCount;
