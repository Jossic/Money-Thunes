import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getMonthlyTransaction } from '../../actions/AccountActions';
import { getCookie } from '../../actions/AuthActions';
import DisplayEntry from '../Account-Components/DisplayEntry';
import { withSnackbar } from '../HOC/Snackbar';
import { getMonth, orderByDate } from '../../utils/dateParser';
import { getYear } from '../../utils/dateParser';

function ListEntry({
  accountTransactions,
  isThereATransaction,
  accountId,
  accountSold,
  setAccountSold,
  year,
  month,
  snackbarShowMessage,
  getMonthlyAccountSold,
  getAccountData
}) {
  const token = getCookie('token');
  const transactionsByDate = orderByDate(accountTransactions);

  return (
    <div className="w-full mt-[2%]">
      <table className="w-full">
        <thead>
          <tr className="flex justify-between">
            <th className="w-[30%]">Date</th>
            <th className="w-[30%]">Libellé</th>
            <th className="w-[30%]">Montant</th>
            <th className="w-4 h-4 xl:w-5 xl:h-5"></th>
          </tr>
        </thead>

        {isThereATransaction === false ? (
          <p>Aucune transaction pour le mois en cours</p>
        ) : (
          <tbody className="flex justify-around flex-col">
            {transactionsByDate.map((entry) => (
              <DisplayEntry
                key={entry.uidtransaction}
                entry={entry}
                id={entry.uidtransaction}
                accountId={accountId}
                token={token}
                accountSold={accountSold}
                setAccountSold={setAccountSold}
                year={year}
                month={month}
                snackbarShowMessage={snackbarShowMessage}
                getMonthlyAccountSold={getMonthlyAccountSold}
                getAccountData={getAccountData}></DisplayEntry>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default withSnackbar(ListEntry);
