import React, { useEffect, useState } from 'react';
import AccountContainer from '../components/Layout/LateralMenu';
import { withSnackbar } from '../components/HOC/Snackbar';
import LateralMenu from '../components/Layout/LateralMenu/LateralMenu';
import { useLocation } from 'react-router-dom';
import { accountLinks } from '../utils/lateralLinks';
import ModalSold from '../components/UX/Modal/ModalSold';
import Compte from '../components/Account-Components/Compte';
import AddCompte from '../components/Account-Components/AddCompte';
import SettingCompte from '../components/Account-Components/SettingCompte';
import ImportData from '../components/Account-Components/ImportData';

function AccountScreen() {
  const [page, setPage] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/account/list' || location.pathname === '/account') {
      setPage('compte');
    } else if (location.pathname === '/account/add') {
      setPage('add');
    } else if (location.pathname === '/account/solds') {
      setPage('solds');
    }
  });

  const renderPage = (page) => {
    if (page === 'compte') {
      return <Compte />;
    } else if (page === 'add') {
      return <AddCompte />;
    } else if (page === 'solds') {
      return <ModalSold />;
    }
  };
  return (
    <AccountContainer>
      <LateralMenu page={page} links={accountLinks} />
      {renderPage(page)}
    </AccountContainer>
  );
}

// export default withSnackbar(AccountScreen);
export default AccountScreen;
