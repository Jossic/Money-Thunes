/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState, useContext } from 'react';
import { getAllAccounts } from '../../../actions/AccountActions';
import { getCookie } from '../../../actions/AuthActions';
import { useForm } from 'react-hook-form';
import SpanAlert from '../Alert/SpanAlert';
import { updateAccountAmount } from '../../../actions/AccountActions';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../../context/AccountContext';
import Loader from '../../Layout/Loader/Loader';
import { withSnackbar } from '../../HOC/Snackbar';

const ModalSold = ({ snackbarShowMessage }) => {
  const [showModalSold, setShowModalSold] = useState(false);
  const token = getCookie('token');
  const [accountToAddSold, setAccountToAddSold] = useState('');
  // const { state, getAccount } = useContext(Context);
  // const { isLoaded, infos } = state;
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const awaitToHome = async () => {
    const message = await snackbarShowMessage('mise à jour du compte réussie', 'success', 3500);
    navigate('/');
  };
  const awaitFunction = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 3500);
    });
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  function cancel() {
    navigate('/');
  }

  const onSubmit = (data) => {
    updateAccountAmount(token, { ...data }).then((resp) => {
      if (resp.status === 200) {
        setTimeout(() => navigate('/'), 3500);
        snackbarShowMessage('mise à jour du compte réussie', 'success', 3500);
      }
    });
    console.log('datas', data);
    console.log('uidaccout', accountToAddSold.uidaccount);
  };

  const getAccounts = async (token) => {
    setIsLoading(true);
    const datas = await getAllAccounts(token);
    if (datas.status === 200) {
      console.log('yes', datas);
      setAccounts(datas.datas);
      console.log('accounts', accounts);
    }
    setIsLoading(false);
  };
  //
  useEffect(() => {
    const token = getCookie('token');
    setIsLoading(true);
    getAccounts(token);
    setIsLoading(false);
  }, []);

  return (
    <div className="flex justify-center w-full ">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-12 max-w-[450px]">
          {/* <h2 className="mb-8 text-xl text-secondary italic">
            Pour pouvoir calculer le solde d'un compte, il est nécessaire d'indiquer un montant pour
            le mois en question
          </h2> */}
          <div className="border-0 rounded-lg shadow-lg  flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl ">Ajout d'operation</h3>
              <button className="bg-gray-400 rounded-full text-black w-6 " onClick={() => cancel()}>
                <span className="text-sm">X</span>
              </button>
            </div>
            <div className="relative p-6 flex-auto">
              <form
                id="formAmount"
                onSubmit={handleSubmit(onSubmit)}
                className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                <label className="block text-black text-sm font-bold mb-1">Compte</label>
                <select
                  type="select"
                  className="shadow appearance-none border rounded w-full py-2 px-1 text-black text-center bg-white"
                  {...register('uidaccount', {
                    required: 'La sélection du compte est obligatoire'
                  })}>
                  <option className="color-black" value="">
                    Veuillez sélectionner un compte ⬇️
                  </option>
                  {accounts &&
                    accounts.map((account) => {
                      return (
                        <option value={account.uidaccount} key={account.uidaccount}>
                          {account.bank}
                        </option>
                      );
                    })}
                </select>
                {errors.uidaccount && <SpanAlert message={errors.uidaccount.message} />}
                <label className="block text-black text-sm font-bold mb-1 mt-2" id="amount">
                  Montant
                </label>
                <input
                  {...register('amount', {
                    required: 'Veuillez indiquer un montant'
                  })}
                  className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                  type="number"
                  name="amount"
                  rules={{ required: 'Le montant est obligatoire' }}
                  htmlFor="amount"
                />
                {errors.amount && <SpanAlert message={errors.amount.message} />}
                <label className="block text-black text-sm font-bold mb-1 mt-2" id="month">
                  Mois du solde du compte
                </label>

                <input
                  {...register('month', {
                    required: 'Un mois avec deux chiffres doit être indiqué !',
                    maxLength: {
                      value: 2,
                      message: 'Un mois avec deux chiffres seulement doit être indiqué '
                    },
                    minLength: {
                      value: 2,
                      message: 'Un mois avec deux chiffres seulement doit être indiqué '
                    },
                    max: {
                      value: 12,
                      message: 'La valeur du mois ne peut pas dépasser 12'
                    },
                    min: {
                      value: 1,
                      message: 'La valeur du mois ne peut pas être inférieure à 1'
                    }
                  })}
                  className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                  type="number"
                  htmlFor="month"
                  placeholder="MM ex: 05 pour mai"
                  name="month"
                />
                {errors.month && <SpanAlert message={errors.month?.message} />}
                <label id="year" className="block text-black text-sm font-bold mb-1 mt-2">
                  Année du solde du compte
                </label>
                <input
                  {...register('year', {
                    required: 'Une année avec 4 chiffres doit être indiquée !',
                    maxLength: {
                      value: 4,
                      message: 'Une année avec 4 chiffres doit être indiquée, vous en avez trop !'
                    },
                    minLength: {
                      value: 4,
                      message: 'Une année avec 4 chiffres doit être indiquée'
                    },
                    min: {
                      value: 2020,
                      message: 'La date ne peut pas être inférieure à 2020'
                    }
                  })}
                  className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                  type="number"
                  htmlFor="year"
                  placeholder="AAAA ex: 2015"
                  name="year"
                />
                {errors.year && <SpanAlert message={errors.year.message} />}
              </form>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                type="reset"
                form="formAmount">
                Effacer
              </button>

              <button
                className="text-white bg-secondary active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="submit"
                form="formAmount">
                Valider
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withSnackbar(ModalSold);
