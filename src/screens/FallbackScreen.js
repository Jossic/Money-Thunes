import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// import { BrowserRouter as navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { authenticate, getCookie, getTokenInfos, isAuth, setCookie } from '../actions/AuthActions';
import { withSnackbar } from '../components/HOC/Snackbar';
import Container from '../components/Layout/Container';
import Loader from '../components/Layout/Loader/Loader';

function FallbackScreen({ snackbarShowMessage }) {
  let navigate = useNavigate();
  const search = useLocation().search;
  const [values, setValues] = useState({
    state: new URLSearchParams(search).get('state'),
    code: new URLSearchParams(search).get('code'),
    swarm: new URLSearchParams(search).get('swarm'),
    serviceurl: new URLSearchParams(search).get('serviceurl')
  });

  useEffect(() => {
    getTokenInfos(values).then((result) => {
      result.status === 200
        ? (setCookie(
            'token',
            result.data.datas.usertoken.id_token,
            result.data.datas.usertoken.expires_in
          ),
          snackbarShowMessage('Bienvenue', 'success', 4500),
          navigate('/'))
        : (setTimeout(() => navigate('/'), 2000),
          snackbarShowMessage(result.error.description.message),
          navigate('/signin'));
    });
  }, []);

  return (
    <Container>
      <Loader />
    </Container>
  );
  // return loading ? <Loader /> : <div>{JSON.stringify(values)}</div>;
}

export default withSnackbar(FallbackScreen);
