<template>
  <div>
    <div class="search-wrapper">
        <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
        <v-text-field
                v-model="search"
                label="Regular"
                placeholder="Search coins"
                full-width
                class="pr-7 pl-7"
              ></v-text-field>
      </div>
    <div class="wrapper">
        <div class="d-flex flex-wrap justify-space-around">
          <div class="" v-for="coin in filteredList.slice(pageStart, pageStart + coinPerPage)" v-bind:key="coin.symbol">
              <coin-item :coin="coin" />
          </div>
        </div>
        <Pagination
          v-if='filteredList.length > 5'
          :currentPage='currentPage'
          :count='filteredList.length'
          :perPage='coinPerPage'
          @setCurrentPage='setCurrentPage' />
    </div>
  </div>
</template>
<script>
import { handleLocalStorage } from '@/helpers';
import CoinItem from '@/components/common/CoinItem.vue';
import Pagination from '@/components/common/Pagination.vue';

export default {
  name: 'CoinTable',
  components: { CoinItem, Pagination },
  props: {
    coins: {
      type: Array,
      required: true,
    },
    clear: {
      type: Boolean,
    },
  },
  watch: {
    clear: {
      handler() {
        if (this.clear) {
          this.search = '';
        }
      },
      deep: true,
    },
  },
  data() {
    return {
      search: '',
      coinPerPage: 4,
      currentPage: 1,
    };
  },
  computed: {
    filteredList() {
      return this.coins.filter((coin) => coin.symbol.toLowerCase().includes(this.search.toLowerCase()));
    },
    pageStart() {
      return (this.currentPage - 1) * this.coinPerPage;
    },
  },
  methods: {
    isSaved(symbol) {
      const storage = handleLocalStorage.getItem('coins');
      return storage ? storage[storage] : symbol;
    },
    filterCoins(value, search) {
      return value != null
          && search != null
          && typeof value === 'string'
          && value.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1;
    },
    setCurrentPage(val) {
      this.currentPage = val;
    },
  },
};
</script>
