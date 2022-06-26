/* eslint-disable import/named */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable array-callback-return */

export const handleLocalStorage = {
  addItem: (wrapper, key, value) => {
    const item = handleLocalStorage.getItem(wrapper);

    if (!item) {
      localStorage.setItem(wrapper, JSON.stringify({ [key]: value }));
    } else {
      const currentItem = handleLocalStorage.getItem(wrapper);

      currentItem[key] = value || null;
      localStorage.setItem(wrapper, JSON.stringify(currentItem));
    }
  },
  getItem: (wrapper) => {
    const item = localStorage.getItem(wrapper);
    if (item) {
      return JSON.parse(localStorage.getItem(wrapper));
    }
    return null;
  },
  removeItem: (wrapper, key) => {
    const removedList = JSON.parse(localStorage.getItem(wrapper));
    delete removedList[key];
    if (Object.keys(removedList).length === 0) {
      localStorage.removeItem(wrapper);
    } else {
      localStorage.setItem(wrapper, JSON.stringify(removedList));
    }
  },
};
