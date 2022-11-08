import createDataContext from './createDataContext';
import { createAccount, getAllAccounts } from '../actions/AccountActions';

const initialState = {
  isLoaded: false,
  infos: {}
};

const accountReducer = (state, action) => {
  switch (action.type) {
    case 'GET_ACCOUNT':
      return { ...state, isLoaded: true, infos: action.payload };

    default:
      return state;
  }
};

const getAccount = (dispatch) => async (token) => {
  try {
    await getAllAccounts(token).then((res) => {
      dispatch({ type: 'GET_ACCOUNT', payload: res.datas });
    });
  } catch (error) {
    console.log(error);
  }
};

const createAccountCtx = (dispatch) => async (token, data) => {
  try {
    console.log('data => ', data);
    console.log('token => ', token);
    createAccount(token, data).then((res) => {
      return res;
    });
  } catch (error) {
    console.log(error);
  }
};

export const { Context, Provider } = createDataContext(
  accountReducer,
  { getAccount, createAccountCtx },
  initialState
);
