<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { handleLocalStorage } from '@/helpers';
import { mapMutations } from 'vuex';

export default {
  name: 'App',
  methods: {
    ...mapMutations(['setStorageStatus']),
  },
  created() {
    if (handleLocalStorage.getItem('coins')) {
      this.setStorageStatus(true);
    }
  },
};
</script>
