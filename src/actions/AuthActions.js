import axios from 'axios';
import Cookies from 'js-cookie';
import cookie from 'js-cookie';

const baseUrl = 'https://dev.user.beswarm.net/api/access/v1';

export const getTokenInfos = async (userData) => {
  console.log('userdata', userData);
  const body = {
    code: userData.code,
    client_secret: 'DTC',
    code_challenge: 'DTC',
    swarm: userData.swarm
  };
  try {
    console.log('body', body);
    const data = await axios.post(`${baseUrl}/usertoken`, body, {
      headers: {
        'content-type': 'application/json'
      }
    });
    return data;
  } catch (error) {
    console.log(`LoginUserError =>`, error);
    return { error: error };
  }
};

export const setCookie = (key, value, expires) => {
  if (getCookie('token')) {
    Cookies.remove('token');
  }
  Cookies.set(key, value, {
    expires: Number(expires)
  });
};

export const removeCookie = (key, expires) => {
  cookie.remove(key, {
    expires: Number(expires)
  });
};

export const getCookie = (key) => {
  return cookie.get(key);
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export function authenticate(data) {
  // set cookie for token
  // store user infos in local storage
}

export async function isAuth(token) {
  try {
    const { data } = await axios.get(`https://dev.user.beswarm.net/api/user/v1/profile`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    if (data.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(`isAuth action error =>`, error);
    return false;
  }
}

export const logoutUser = () => {
  if (getCookie('token')) {
    Cookies.remove('token');
  }
};
