<template>
    <v-app-bar color="indigo">
      <v-container class="d-flex align-content-center">
            <v-toolbar-title class="white--text">Coin Tracking Application</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-row
              align="center"
              justify="end"
            >
              <v-btn class="white--text" text @click="addStockClicked">
                {{ addOrUpdateLabel }}
              </v-btn>
              <v-btn class="white--text" text @click="refreshClicked">
                Refresh
              </v-btn>
            </v-row>
      </v-container>
    </v-app-bar>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NavBar',
  data() {
    return {
      addOrUpdate: '',
    };
  },
  methods: {
    addStockClicked() {
      this.$emit('addOrUpdate');
    },
    refreshClicked() {
      this.$emit('refresh');
    },
  },
  computed: {
    ...mapGetters(['getStorageStatus']),
    addOrUpdateLabel() {
      if (this.getStorageStatus) return 'Add / Update';
      return 'Add Stock';
    },
  },
};
</script>
