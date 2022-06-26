import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { handleLocalStorage } from '@/helpers';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    coins: [],
    savedCoins: [],
    storageStatus: false,
  },
  getters: {
    getStorageStatus(state) {
      return state.storageStatus;
    },
    getCoins(state) {
      return state.coins;
    },
    getSavedCoins(state) {
      return state.coins.filter((coin) => coin.isSaved);
    },
  },
  mutations: {
    setSavedCoins(state, value) {
      state.coins.map((coin) => coin.symbol === value.symbol);
    },
    setCoins(state, value) {
      state.coins = value;
    },
    setStorageStatus(state, value) {
      state.storageStatus = value;
    },
  },
  actions: {
    async coinsDataAction(context) {
      try {
        const response = await axios.get('https://api2.binance.com/api/v3/ticker/24hr');
        let coins = response.data;
        coins.forEach((coin) => {
          coin.isSaved = false;
          coin.savedCount = 1;
          coin.color = '';
        });
        if (context.getters.getStorageStatus) {
          const storage = handleLocalStorage.getItem('coins');
          // eslint-disable-next-line dot-notation
          coins = coins.map((coin) => ({
            isSaved: storage[coin.symbol] ? storage[coin.symbol].isSaved : false,
            savedCount: storage[coin.symbol] ? storage[coin.symbol].savedCount : 1,
            color: storage[coin.symbol] ? storage[coin.symbol].color : '',
            symbol: coin.symbol,
            lastPrice: coin.lastPrice,
            weightedAvgPrice: coin.weightedAvgPrice,
          }));
        }
        context.commit('setCoins', coins);
      } catch (error) {
        console.log(error);
      }
    },
  },
});
