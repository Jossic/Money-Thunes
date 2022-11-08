import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie, isAuth } from '../../actions/AuthActions';

export default function UserAuth({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie('token');
    if (!token) {
      return navigate('/signin');
    }
    isAuth(token).then((res) => (!res ? navigate('/signin') : ''));
  }, []);

  return <>{children}</>;
}
