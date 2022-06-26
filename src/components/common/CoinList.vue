<template lang="">
    <div>
        <div v-if="!storage">
            You don't have any saved coins
        </div>
        <div v-else class="d-flex align-content-center flex-wrap justify-center flex-column">
            <div class="d-flex align-content-center flex-wrap justify-center">
                <div v-for="coin in slicedCoins" v-bind:key="coin.symbol">
                    <coin-item :coin="coin" :show-avg-price="true" />
                </div>
            </div>
            <Pagination
              v-if='getSavedCoins.length > 4'
              :currentPage='currentPage'
              :count='getSavedCoins.length'
              :perPage='coinPerPage'
              @setCurrentPage='setCurrentPage' />
          </div>
    </div>
</template>
<script>
import CoinItem from '@/components/common/CoinItem.vue';
import Pagination from '@/components/common/Pagination.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'CoinList',
  components: { CoinItem, Pagination },
  props: {
    storage: {
      type: Boolean,
    },
  },
  data() {
    return {
      coinPerPage: 4,
      currentPage: 1,
    };
  },
  computed: {
    ...mapGetters(['getSavedCoins']),
    pageStart() {
      return (this.currentPage - 1) * this.coinPerPage;
    },
    slicedCoins() {
      if (this.getSavedCoins.length > 4) return this.getSavedCoins.slice(this.pageStart, this.pageStart + this.coinPerPage);
      return this.getSavedCoins;
    },
  },
  methods: {
    setCurrentPage(val) {
      this.currentPage = val;
    },
  },
};
</script>
<style lang="">

</style>
