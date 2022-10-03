export const setLocalStorage = (name, items) => {
  localStorage.setItem(name, JSON.stringify(items));
};
export const getLocalStorage = (name) => {
  const data = localStorage.getItem(name);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
    return data;
  } else {
    return false;
  }
};
export const removeLocalStorage = (name) => {
  localStorage.removeItem(name);
};
