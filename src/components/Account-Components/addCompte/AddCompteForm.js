import React, { useState } from 'react';
import Button from '../../UX/Button';
import { getCookie } from '../../../actions/AuthActions';

const AddCompteForm = ({ name, onSubmitForm }) => {
  const [description, setDescription] = useState('');
  const [bank, setBank] = useState('');
  const token = getCookie('token');
  const data = { bank, description };
  const [invalidateFields, setInvalidateFields] = useState(true);

  function sendCompteData() {
    if (description && bank) {
      setInvalidateFields(false);
    }
    setInvalidateFields(true);
  }

  return (
    <div
      className="w-2/3 mx-auto  p-4 rounded-md bg-slate-200 shadow-xl"
      data-testid="Add-compte-form-container">
      <h2 className="text-xl font-bold">{name}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitForm(token, data);
        }}
        data-testid="addCompteForm">
        <div className="my-4">
          <label data-testid="label" htmlFor="bank">
            Banque :
          </label>
          <input
            className="px-2 bg-inherit border-b-2 border-gray-800 outline-0"
            type="text"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            id="bank"
            data-testid="bank-input"
            required="true"
          />
        </div>
        <div className="mt-4 mb-10">
          <label data-testid="label" htmlFor="description">
            Description :
          </label>
          <input
            type="text"
            className="px-2 bg-inherit border-b-2 border-gray-800 outline-0"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            data-testid="description"
            required="true"
          />
        </div>
        <Button name="ajouter compte" />
      </form>
    </div>
  );
};

export default AddCompteForm;
