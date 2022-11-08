import React from 'react';
import { deleteTransaction, updateAccountAmount } from '../../actions/AccountActions';
import { getCookie } from '../../actions/AuthActions';
import Button from '../UX/Button';

function DisplayEntry({ ...props }) {
  const { amount, description, date, uidtransaction, getAccountData } = props.entry;
  const dateParserToSTring = (date) =>
    new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  console.log('id transac', props.entry.uidtransaction);

  async function deleteThisTransaction() {
    const token = getCookie('token');
    if (window.confirm('vous allez supprimer la transaction, êtes vous sûr ?')) {
      let newSold = props.accountSold - amount;
      const data = {
        uidaccount: props.accountId,
        year: props.year,
        month: props.month,
        amount: newSold
      };
      console.log('year ', props.year);
      console.log('mois ', props.month);
      console.log('data ', data);
      console.log('token ', token);
      const awaitDelete = await deleteTransaction(
        token,
        props.accountId,
        props.entry.uidtransaction
      );
      awaitDelete.status === 200
        ? await updateAccountAmount(token, data)
            .then(
              props.setAccountSold(newSold),
              props.snackbarShowMessage('transaction supprimée avec succès', 'success'),
              getAccountData
            )
            .catch((error) => {
              props.snackbarShowMessage('une erreur est survenue lors de la suppression');
            })
        : props.snackbarShowMessage('erreurlors de la suppression');
      // console.log('solde calculé ', newSold);
    }
    // else {
    //   console.log('ah cool négatif chef + ', uidtransaction);
    // }
    // console.log('id ligne', uidtransaction);
    // alert('transac est ' + uidtransaction);
  }

  return (
    <tr className="flex justify-between border-b-2 w-full text-center">
      <td className="w-[30%]">{dateParserToSTring(date)}</td>
      <td className="w-[30%]">{description}</td>
      <td className="w-[30%]">{amount}</td>
      <Button
        onClick={() => deleteThisTransaction()}
        className="w-4 h-4 xl:w-5 xl:h-5 border border-1 flex justify-center items-center self-center text-slate-400 bg-slate-50 hover:bg-red-400 hover:text-white"
        name={'x'}></Button>
    </tr>
  );
}

export default DisplayEntry;

/**  entry,
  accountId,
  accountSold,
  setAccountSold,
  year,
  month,
  snackbarShowMessage */
