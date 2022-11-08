import React, { useState, useEffect } from 'react';
import Title from '../../UX/Title/index';
import Transaction from '../Transaction';
import sun from '../../../asset/sun.gif';
import orage from '../../../asset/orage.gif';
import { getMonthlyTransaction, getAccountSolde } from '../../../actions/AccountActions';
import { getCookie } from '../../../actions/AuthActions';
import { shortDate } from '../../../utils/dateParser';
import NoTransaction from '../NoTransction';

function HomeResumeAccount({ account }) {
  const [amount, setAmount] = useState('');
  // const amount = account.amount;
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const token = getCookie('token');

    getAccountSolde(token, account.uidaccount).then((res) => {
      if (res.status === 200) {
        setAmount(res.datas.amount);
      } else {
        setAmount('à déclarer');
      }
    });
    getMonthlyTransaction(account.uidaccount, token).then((data) => {
      console.log('datas du compte', data);
      if (data.status === 200) {
        setTransactions(data.datas.slice(0, 6));
      }
    });
    // setTransactions(account.transactions.slice(0, 6));
  }, []);
  // console.log('sur ', transactions);
  function AccountIllustration(amount) {
    if (amount > 0) {
      return (
        <div className="flex w-16 h-12">
          <img className="object-cover" src={sun} alt="Gif soleil" />
        </div>
      );
    }
    return (
      <div className="flex w-16 h-12">
        <img className="object-cover" src={orage} alt="Gif soleil" />
      </div>
    );
  }
  return (
    // <div className="flex flex-col min-w-[30%] max-w-[400px] ml-5 mr-5 overflow-scroll max-h-[100%]">
    <div
      className="flex flex-col min-w-[220px] mb-4 max-h-[100%] md:w-2/3 lg:mb-0 lg:ml-5 lg:mr-4 lg:min-w-[35%] 2xl:min-w-[25%] 2xl:max-w-[30%] "
      data-testid="accountResume">
      <div className="border-2  shadow-lg shadow-gray-300 flex justify-between mb-8 w-full">
        <div className=" w-full ml-3 text-left">
          <Title size={'medium'} color={'blue'} title={account.bank}></Title>
          {amount && amount > 0 ? <p>+{amount} €</p> : <p>{amount} €</p>}
        </div>

        {AccountIllustration(amount)}
      </div>
      {transactions.length > 0 ? (
        transactions.map((transaction) => {
          return (
            <Transaction
              key={`${transaction.description}-${transaction.amount}`}
              name={transaction.description}
              count={transaction.amount}
              date={shortDate(transaction.date)}></Transaction>
          );
        })
      ) : (
        <NoTransaction name={account.bank} />
      )}
    </div>
  );
}

export default HomeResumeAccount;
