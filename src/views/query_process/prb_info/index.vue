<template>
  <div class="dashboard-container">
    <div class="cardContainer">
      <div id="chart" style="height: 75vh; width: 100%;padding: 1px" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {
      result: '{\\"msg\\": [{\\"time\\": \\"07/17/2020 00:00:00\\", \\"RRC\\\u5efa\\\u7acb\\\u6210\\\u529f\\\u7387qf\\": \\"0.995\\"}, {\\"time\\": \\"07/18/2020 00:00:00\\", \\"RRC\\\u5efa\\\u7acb\\\u6210\\\u529f\\\u7387qf\\": \\"0.987\\"}, {\\"time\\": \\"07/19/2020 00:00:00\\", \\"RRC\\\u5efa\\\u7acb\\\u6210\\\u529f\\\u7387qf\\": \\"0.985\\"}]}',
      chart: null,
      graph: null
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('chart'))
      // const result = JSON.parse(this.result)
      // const graph = JSON.parse(result.msg)
      // this.graph = graph
      this.paint(this.graph, this.chart)
    },
    paint(graph, chart) {
      const option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }]
      }
      chart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 25px;
    line-height: 40px;
  }
}
.cardContainer {
  border: 1px #1f2d3d;
}
</style>
