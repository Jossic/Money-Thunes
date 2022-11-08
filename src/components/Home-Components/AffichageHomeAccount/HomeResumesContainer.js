import React, { useState, useEffect, useContext } from 'react';
import HomeResumeAccount from './HomeResumeAccounts';
import Title from '../../UX/Title';
import { datasMocked } from '../../../MockJson/mockAccounts';
import { getCookie } from '../../../actions/AuthActions';
import { getAllAccounts } from '../../../actions/AccountActions';
import { Context } from '../../../context/AccountContext';

function HomeResumesContainer() {
  const { state, getAccount } = useContext(Context);
  const { isLoaded, infos } = state;

  useEffect(() => {
    // replace after with fetch Api callback result
    const token = getCookie('token');
    getAccount(token);
  }, []);

  return (
    <div className="flex flex-col w-screen pt-3 lg:h-screen lg:items-center lg:overflow-scroll">
      <Title size={'medium'} title={'Synthèse des comptes'} color={'black'}></Title>
      {isLoaded ? (
        <div
          className="flex flex-col mt-12 items-center w-full lg:flex-row lg:items-start "
          data-testid="resumes container">
          {infos.map((account) => {
            return (
              <HomeResumeAccount
                key={`${account.uidaccount}-${account.bank}`}
                account={account}
                transactions={account.transactions}
              />
            );
          })}
        </div>
      ) : (
        <div className="h-full flex justify-center items-center animate-pulse ">
          <h2 className="text-3xl font-bold" data-testid="charging title">
            Chargement ...
          </h2>
        </div>
      )}
    </div>
  );
}

export default HomeResumesContainer;
