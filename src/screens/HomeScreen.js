import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { withSnackbar } from '../components/HOC/Snackbar';
import LateralMenu from '../components/Layout/LateralMenu/LateralMenu';
import AccountContainer from '../components/Layout/LateralMenu';
import { homeLinks } from '../utils/lateralLinks';
import HomeResumesContainer from '../components/Home-Components/AffichageHomeAccount/HomeResumesContainer';
import HomeCategories from '../components/Home-Components/Categories/HomeCategories';
import ModalSold from '../components/UX/Modal/ModalSold';

function HomeScreen({ snackbarShowMessage }) {
  const [page, setPage] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '') {
      setPage('resumes');
    } else if (location.pathname === '/categories') {
      setPage('categories');
    } else if (location.pathname === '/shortcuts') {
      setPage('shortcuts');
    }
  });

  const renderPage = (page) => {
    if (page === 'resumes') {
      return <HomeResumesContainer />;
    } else if (page === 'categories') {
      return <HomeCategories />;
    } else if (page === 'shortcuts') {
      return (
        <>
          {/* <h3 className="ml-80 mt-20" data-testid="title waiting shortcuts">
            On joue à Mario Kart pour trouver les meilleurs idées de raccourci
          </h3> */}
          <ModalSold />
        </>
      );
    }
  };
  return (
    <AccountContainer>
      <LateralMenu links={homeLinks} />
      {renderPage(page)}
    </AccountContainer>
  );
}

export default withSnackbar(HomeScreen);
// export default HomeScreen;
