<template lang="">
    <div>
      <v-card class="mb-6 mr-3 ml-3" outlined max-width="300">
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          {{ coin.symbol }}
        </v-list-item-title>
        <div class="mb-2">
          <span>{{ coin.lastPrice }}</span>
          <span v-if="showAvgPrice"> - {{ coin.lastPrice }}</span>
        </div>
        <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
        <input class="blue pa-3 text-center rounded" type="number" step="1" min="1" v-model.number="count" />
      </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-btn v-if="!coin.isSaved" outlined text block color="teal accent-4" @click="handleAdd">Add</v-btn>
      <v-flex  v-if="coin.isSaved" class="d-flex justify-space-between">
        <v-btn outlined text  color="teal accent-4" @click="handleUpdate">Update</v-btn>
        <v-btn outlined text color="teal accent-4" @click="handleRemove">Remove</v-btn>
      </v-flex>
    </v-card-actions>
  </v-card>
    </div>
</template>
<script>
import { handleLocalStorage } from '@/helpers';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'CoinItem',
  props: {
    coin: {
      type: Object,
    },
    showAvgPrice: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    coin: {
      handler(val) {
        this.count = val.savedCount;
      },
      deep: true,
    },
    count: {
      handler(val) {
        if (val === 0 || val === '') this.count = 1;
      },
      deep: true,
    },
  },
  data: () => ({
    count: 1,
  }),
  created() {
    this.count = this.coin.savedCount;
  },
  computed: {
    ...mapGetters(['getCoins']),
  },
  methods: {
    ...mapMutations(['setSavedCoins', 'setRemovedCoins', 'setStorageStatus']),
    handleAdd() {
      this.coin.isSaved = true;
      this.coin.color = this.randomBgColor();
      this.coin.savedCount = this.count;
      handleLocalStorage.addItem('coins', this.coin.symbol.toString(), this.coin);
      this.setStorageStatus(true);
      this.setSavedCoins(this.coin);
    },
    handleUpdate() {
      this.coin.savedCount = this.count;
      handleLocalStorage.addItem('coins', this.coin.symbol.toString(), this.coin);
      this.setSavedCoins(this.coin);
    },
    handleRemove() {
      this.coin.isSaved = false;
      this.coin.savedCount = 1;
      this.count = 1;
      handleLocalStorage.removeItem('coins', this.coin.symbol);
      this.setSavedCoins(this.coin);
      if (handleLocalStorage.getItem('coins') === null) {
        this.setStorageStatus(false);
      }
    },
    randomBgColor() {
      const x = Math.floor(Math.random() * 256);
      const y = Math.floor(Math.random() * 256);
      const z = Math.floor(Math.random() * 256);
      return `rgb(${x},${y},${z})`;
    },
  },
};
</script>
<style lang="">

</style>
