<template>
  <div class="flex-column d-flex">
    <nav-bar
      @refresh="refreshHandle"
      @addOrUpdate="addOrUpdateHandle"
      class="mb-5"
    />
    <coin-modal ref="coinModal" />
    <v-container>
      <v-row v-if="!loading">
      <v-col lg="8" md="12" sm="12" xs="12">
        <coin-list :storage="getStorageStatus" />
      </v-col>
      <v-col lg="4" md="12" sm="12" xs="12">
          <pie />
      </v-col>
    </v-row>
    </v-container>
    <v-overlay :value="loading" :absolute="absolute">
      <v-progress-circular
        indeterminate
        v-if="loading"
        size="80"
        color="primary"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import CoinList from '@/components/common/CoinList.vue';
import Pie from '@/components/chart/PieChart.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'HomeView',
  components: {
    NavBar,
    CoinList,
    Pie,
    CoinModal: () => import('@/components/modals/CoinModal.vue'),
  },
  async created() {
    await this.coinsDataAction();
    this.loading = false;
  },
  data: () => ({
    modalShow: false,
    loading: true,
    absolute: false,
  }),
  methods: {
    ...mapActions(['coinsDataAction']),
    async refreshHandle() {
      this.loading = true;
      await this.coinsDataAction();
      this.loading = false;
    },
    addOrUpdateHandle() {
      this.$refs.coinModal.open();
    },
  },
  computed: {
    ...mapGetters(['getStorageStatus']),
  },
  mounted() {
    window.setInterval(async () => {
      await this.refreshHandle();
    }, Number(process.env.VUE_APP_UPDATE_TIME));
  },
};
</script>
