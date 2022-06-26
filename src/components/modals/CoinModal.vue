<template>
  <div class="text-center">
    <v-dialog v-model="status" width="700" @click:outside="hidden">
      <v-card>
        <v-card-title class="">
          Search Coins
        </v-card-title>
        <coin-table :coins="getCoins" :clear="clear"/>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import CoinTable from '@/components/common/CoinTable.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'CoinModal',
  components: { CoinTable },
  computed: {
    ...mapGetters(['getCoins', 'getStorageStatus']),
  },
  data() {
    return {
      status: false,
      clear: false,
    };
  },
  methods: {
    open() {
      this.status = true;
      this.clear = true;
    },
    hidden() {
      this.clear = false;
    },
  },
};
</script>
<style lang="">

</style>
