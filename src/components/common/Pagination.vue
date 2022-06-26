<template>
    <div>
        <div class="text-center">
            <v-container>
            <v-row justify="center">
                <v-col cols="8">
                    <v-container class="max-width">
                        <v-pagination
                        v-model="currentPage"
                        class="my-4"
                        :length="totalPage"
                        @input="setPage(currentPage)"
                        ></v-pagination>
                    </v-container>
                </v-col>
            </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
export default {
  name: 'PaginationComponent',
  data() {
    return {
      currentPage: 1,
    };
  },
  props: {
    count: Number,
    perPage: Number,
  },
  computed: {
    totalPage() {
      return Math.ceil(this.count / this.perPage);
    },
  },
  methods: {
    setPage(page) {
      this.$emit('setCurrentPage', page);
    },
  },
};
</script>
