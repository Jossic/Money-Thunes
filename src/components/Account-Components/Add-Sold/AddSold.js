import React, { useState, useEffect } from 'react';
import { getAllAccounts } from '../../../actions/AccountActions';
import ModalSold from '../../UX/Modal/ModalSold';
import { getCookie } from '../../../actions/AuthActions';

function AddSold() {
  const [accounts, setAccounts] = useState([]);
  const [isloaded, setLoaded] = useState(false);

  useEffect(() => {
    const token = getCookie('token');
    getAllAccounts(token)
      .then((res) => {
        if (res.status === 200) {
          setAccounts(res.datas);
          setLoaded(true);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return <div>ModalSold</div>;
}
