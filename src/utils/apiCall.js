import { toast } from 'react-hot-toast';
import { getLocalStorage, removeLocalStorage } from './localStorage';

const BASE_URL = 'http://143.110.190.232/api';

export const fatchData = async (url, initData) => {
  const res = await handleErros(fetch(BASE_URL + url), initData);
  return res;
};

export const fetchData = async (url, initData) => {
  const res = await handleErros(
    fetch(`${url}`, {
      headers: {
        accesstoken: getLocalStorage('token') || undefined,
      },
    }),
    initData,
  );
  return res;
};

export const postData = async (url, body, initData) => {
  const res = await handleErros(
    fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      body,
      headers: {
        accesstoken: getLocalStorage('token') || undefined,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }),
    initData,
  );
  return res;
};

export const postFormData = async (url, body, initData) => {
  const res = await handleErros(
    fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      body,
      headers: {
        accesstoken: getLocalStorage('token') || undefined,
        // 'Content-Type': 'multipart/form-data',
      },
    }),
    initData,
  );
  return res;
};

export const postJsonData = async (url, body, initData) => {
  const res = await handleErros(
    fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      body,
      headers: {
        accesstoken: getLocalStorage('token') || undefined,
        'Content-Type': 'application/json',
      },
    }),
    initData,
  );
  return res;
};

export const deleteData = async (url, body) => {
  const res = await handleErros(
    fetch(`${BASE_URL}${url}`, {
      method: 'DELETE',
      body,
      headers: {
        accesstoken: getLocalStorage('token') || undefined,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }),
  );
  return res;
};

export const putData = async (url, body) => {
  const res = await handleErros(
    fetch(`${BASE_URL}${url}`, {
      method: 'PUT',
      body,
      headers: {
        accesstoken: getLocalStorage('token') || undefined,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }),
  );
  return res;
};

const handleErros = async (apiCall, initData = false) => {
  try {
    const res = await apiCall;
    const data = await res.json();
    if (String(res.status).match(/20[0123]/g)) {
      if (data.success === 0) {
        toast.error(data?.message || 'Error!');
      }
      return data;
    } else {
      if (String(res.status).match(401)) {
        toast.error(data?.message || 'Error!');
        removeLocalStorage('token');
        setTimeout(() => {
          window.location.href = '/login';
        }, 500);
      } else if (typeof data === 'string' || data instanceof String) {
        toast.error(data || 'Error!');
      } else {
        toast.error(data?.message || 'Error!');
      }
      return initData;
    }
  } catch (error) {
    console.log(error);
    // toast.error('Error while proccesing the request!');
    return initData;
  }
};
