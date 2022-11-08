import React, { useContext } from 'react';
import AddCompteForm from './addCompte/AddCompteForm';
import { Context } from '../../context/AccountContext';

function AddCompte(props) {
  const { createAccountCtx } = useContext(Context);

  return (
    <div className="h-screen w-full flex flex-col items-center ">
      <div className="w-full mt-24 ">
        <AddCompteForm name="Ajouter un compte" onSubmitForm={createAccountCtx} />
      </div>
    </div>
  );
}

export default AddCompte;
