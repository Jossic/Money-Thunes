import React, { useState } from 'react';
import Button from '../UX/Button';
import { useForm, FormProvider } from 'react-hook-form';
import CustomInput from '../UX/Input/CustomInput';
import { getCookie } from '../../actions/AuthActions';
import { addEntry, getMonthlyTransaction } from '../../actions/AccountActions';
import { data } from 'autoprefixer';
import Loader from '../Layout/Loader/Loader';
import { getMonth, getYear } from '../../utils/dateParser';

function AddAnEntry({
  accountTransactions,
  updateSold,
  setAccountTransactions,
  urlId,
  loading,
  setLoading,
  snackbarShowMessage,
  accountSold,
  month,
  year
}) {
  const [form, setForm] = useState(false);
  const token = getCookie('token');
  const methods = useForm({
    defaultValues: { date: '', label: '', amount: '' }
  });

  const {
    handleSubmit,
    formState: { errors, isDirty, isValid, control },
    register,
    reset
  } = methods;

  function updateTransactions() {
    getMonthlyTransaction(urlId, token, year, month).then((result) => {
      if (result.status === 200) {
        updateSold(accountSold, result.datas[result.datas.length - 1].amount);
        setAccountTransactions(result.datas);
        console.log('apres update transaction state', accountTransactions);
        console.log(
          'apres update transaction juste res',
          result.datas[result.datas.length - 1].amount
        );
      } else {
        console.log(result.error);
      }
    });
  }
  const onSubmit = (data) => {
    if (data.category === 'expense') {
      data = {
        ...data,
        amount: data.amount - data.amount * 2,
        family: {
          codelang: 'fr',
          description: 'expense'
        }
      };
    }
    data = {
      ...data,
      family: {
        codelang: 'fr',
        description: 'income'
      }
    };
    console.log('data transformé ? =>', data);
    setLoading(true);
    addEntry(data, urlId, token)
      .then((response) => {
        if (response.status === 200) {
          console.log('data transformé ? =>', data);
          updateTransactions();
          snackbarShowMessage('Transaction ajoutée', 'success');
          reset();
        }
      })
      .catch((error) => snackbarShowMessage("erreur lors de l'ajout de la transaction"));
    setLoading(false);
  };

  function toggleForm(e) {
    e.preventDefault();
    setForm(!form);
  }

  return loading ? (
    <Loader />
  ) : (
    <div className="mt-5 mb-2 ">
      <Button
        data-testid="add-entry-toggle-button"
        name={!form ? 'Ajouter' : 'Fermer'}
        onClick={toggleForm}
        type="reset"
        form="transaction-form"
      />
      {form && (
        <div className="bg-gray-300 mt-3 h-24 ">
          <>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} id="transaction-form" className="h-full">
                <table className="w-full h-full flex flex-col justify-between">
                  <thead className="w-full h-[35%] flex flex-col justify-center">
                    <tr className="flex justify-between">
                      <th className="w-2/12">Date</th>
                      <th className="w-3/12">Libellé</th>
                      <th className="w-2/12">Catégorie</th>
                      <th className="w-2/12">Montant</th>
                      <th className="w-2/12">Action</th>
                    </tr>
                  </thead>
                  <tbody className="w-full h-[65%] ">
                    <tr className="flex w-full h-full justify-between">
                      <td className="w-2/12 flex flex-col justify-between items-center">
                        <CustomInput
                          type="date"
                          name="date"
                          data-testid="add-entry-input"
                          rules={{ required: 'La date est obligatoire' }}
                          control={control}
                          className="w-[90%]"
                        />
                      </td>
                      <td className="w-3/12 w-h flex flex-col justify-between items-center">
                        <CustomInput
                          type="text"
                          name="label"
                          data-testid="add-entry-input"
                          rules={{ required: 'Le libellé est obligatoire' }}
                          control={control}
                          className="w-[90%]"
                        />
                      </td>
                      <td className="w-2/12 flex flex-col justify-between items-center">
                        <select type="select" name="category" {...register('category')}>
                          <option value="expense">Dépense</option>
                          <option value="income">Recette</option>
                        </select>
                      </td>
                      <td className="w-2/12 flex flex-col justify-between items-center">
                        <CustomInput
                          type="number"
                          name="amount"
                          data-testid="add-entry-input"
                          control={control}
                          rules={{ required: 'Le montant est obligatoire' }}
                          className="w-[90%]"
                        />
                      </td>
                      <td className="w-2/12 flex flex-col justify-between items-center">
                        <Button
                          data-testid="add-entry-button"
                          name="Ajouter"
                          type="submit"
                          className="entryAddButton lg:w-28 xl:w-32 mb-2 w-[90%]"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </FormProvider>
          </>
        </div>
      )}
    </div>
  );
}

export default AddAnEntry;
