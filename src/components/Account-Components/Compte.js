import React, { useContext, useEffect } from 'react';
import AffichageCount from './affichageCount/AffichageCount';
import { getCookie } from '../../actions/AuthActions';
import { Context } from '../../context/AccountContext';

function Compte() {
  const { state, getAccount } = useContext(Context);
  const { isLoaded, infos } = state;

  useEffect(() => {
    const token = getCookie('token');
    getAccount(token);
  }, []);

  console.log('state => ', state);

  return (
    <div className="h-screen w-full flex flex-col items-center">
      {isLoaded ? (
        <ul className="my-8 h-[95%] w-2/3 overflow-y-auto" data-testid="account-container">
          {infos &&
            infos.map((account) => <AffichageCount key={account.uidaccount} compte={account} />)}
        </ul>
      ) : (
        <div className="h-full  flex justify-center items-center animate-pulse ">
          <h2 className="text-3xl font-bold" data-testid="charging title">
            Chargement ...
          </h2>
        </div>
      )}
    </div>
  );
}

export default Compte;
