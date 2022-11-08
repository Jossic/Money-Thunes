import { data } from 'autoprefixer';
import axios from 'axios';

const baseUrl = 'https://dev.user.beswarm.net/api/user/v1/bank';
const date = new Date();
const thisYear = date.getFullYear();
const thisMonth = date.getMonth() + 1;

export const getAllAccounts = async (token) => {
  try {
    const { data } = await axios.get(`${baseUrl}/account`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });

    return data;
  } catch (error) {
    console.log('get Account Error => ', error);
    return { error };
  }
};

export const getAccountSolde = async (token, id, year, month) => {
  // const date = new Date();
  // const year = datas.year ? datas.year : thisYear;
  // const month = datas.month ? datas.month : thisMonth;
  try {
    if (!year && !month) {
      (year = thisYear), (month = thisMonth);
    }
    const { data } = await axios.get(`${baseUrl}/accountsold/${id}/${year}/${month}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    return data;
  } catch (error) {
    console.log('get accountsold Error => ', error);
    return { error };
  }
};

export const getAccountById = async (token, id) => {
  try {
    const { data } = await axios.get(`${baseUrl}/account/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    console.log(`data =>`, data);
    return data;
  } catch (error) {
    console.log(`get Account by id error =>`, error);
    return { error: error.message };
  }
};

export const createAccount = async (token, data) => {
  try {
    const res = await axios.post(`${baseUrl}/account`, data, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
    console.log('data => ', res.data);
    return res;
  } catch (e) {
    console.log('create Account Error => ', e);
  }
};

export const addEntry = async (accountInfos, accountId, token) => {
  const body = {
    uidaccount: accountId,
    description: accountInfos.label,
    amount: accountInfos.amount,
    date: accountInfos.date,
    family: {
      uidreferential: 'string',
      uid: 'string',
      codelang: 'st',
      description: 'string',
      thumbnail: 'string'
    },
    document: {
      content: 'string',
      type: 'string'
    }
  };
  try {
    const { data } = await axios.post(`${baseUrl}/transaction`, body, {
      headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` }
    });
    return data;
  } catch (error) {
    console.log(`add Entry error =>`, error);
    return { error: error.message };
  }
};

export const getMonthlyTransaction = async (accountId, token, year, month) => {
  try {
    if (!year && !month) {
      (year = thisYear), (month = thisMonth);
    }
    const { data } = await axios.get(`${baseUrl}/transaction/${accountId}/${year}/${month}`, {
      headers: { authorization: `Bearer ${token}` }
    });
    // console.log(`data getMonthlyTransaction=>`, data);
    return data;
  } catch (error) {
    console.log(`getMonthlyTransaction error =>`, error);
    return { error };
  }
};

export const updateAccountAmount = async (token, data) => {
  try {
    const resp = await axios.put(`${baseUrl}/accountsold/`, data, {
      headers: { authorization: `Bearer ${token}` }
    });
    console.log('res add account sold => ', resp);
    return resp;
  } catch (error) {
    console.log('updateAccountAmount =>', error);
    new Error(error);
  }
};

export const deleteTransaction = async (token, accountId, transactionId) => {
  try {
    const resp = await axios.delete(`${baseUrl}/transaction/${accountId}/${transactionId}`, {
      headers: { authorization: `Bearer ${token}` }
    });
    return resp;
  } catch (error) {
    return new Error(error);
  }
};
