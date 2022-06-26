<template>
  <Pie
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Pie } from 'vue-chartjs/legacy';
import { mapGetters } from 'vuex';

import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  Title,
  Tooltip,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  name: 'PieChart',
  components: {
    Pie,
  },
  props: {
    chartId: {
      type: String,
      default: 'pie-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 100,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  watch: {
    getSavedCoins: {
      handler() {
        this.chartData = this.calculatedChart();
      },
      deep: true,
    },
  },
  created() {
    this.chartData = this.calculatedChart();
  },
  computed: {
    ...mapGetters(['getSavedCoins']),
  },
  methods: {
    calculatedChart() {
      const chart = {
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: [],
          },
        ],
      };
      const labels = this.getSavedCoins.map((coin) => coin.symbol);
      const counts = this.getSavedCoins.map((coin) => coin.savedCount);
      const backgroundColor = this.getSavedCoins.map((coin) => coin.color);

      chart.labels = labels;
      chart.datasets = [];
      chart.datasets.push({ backgroundColor, data: counts });

      return chart;
    },
  },
};
</script>
