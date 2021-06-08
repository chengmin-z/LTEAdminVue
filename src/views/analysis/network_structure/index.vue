<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="边的最小权值">
        <el-input v-model="form.inputValue" name="inputValue" size="middle" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" size="middle" @click="onSubmit">
          重新生成
        </el-button>
      </el-form-item>
    </el-form>
    <div class="cardContainer">
      <div id="chart" style="height: 75vh; width: 100%;padding: 1px" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { analysis9 } from '@/api/analyze'

export default {
  data() {
    return {
      form: {
        inputValue: 1
      },
      graph: {},
      chart: '',
      loading: false
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    onSubmit() {
      this.paint(this.graph, this.chart, this.form.inputValue)
    },
    initChart() {
      this.chart = echarts.init(document.getElementById('chart'))

      analysis9().then(res => {
        this.graph = JSON.parse(res.detail).msg
        // console.log(JSON.parse(res.detail).msg)
        // console.log(this.graph)
        this.paint(this.graph, this.chart, this.form.inputValue)
      })
    },
    paint(graph, chart, threshold) {
      graph.nodes.forEach(function(node) {
        node.value = '(' + node.x.toFixed(1) + ',' + node.y.toFixed(1) + ')'
      })
      graph.links.forEach(function(link) {
        if (link.cross) {
          link.lineStyle = { color: 'gray' }
        }
        if (link.value < threshold) {
          link.lineStyle = { width: 0 }
        } else {
          link.lineStyle = { }
        }
      })
      const option = {
        title: { text: '网络干扰拓扑结构图（模块度: ' + graph.q + '）', left: 'center', textStyle: { fontSize: 22 }},
        tooltip: {},
        legend: {
          top: 'bottom',
          data: graph.categories.map(function(a) {
            return a.name
          })
        },
        scaleLimit: {
          min: 1,
          max: 15
        },
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [{
          type: 'graph',
          legendHoverLink: false,
          layout: 'none',
          roam: true,
          nodeScaleRatio: 0.01,
          autoCurveness: true,
          categories: graph.categories,
          data: graph.nodes,
          links: graph.links,
          lineStyle: {
            color: 'source',
            curveness: 0.1
          },
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              width: 5,
              opacity: 0.8
            },
            label: { show: false }
          }
        }]
      }
      chart.setOption(option)
    }
  }
}
</script>

<style lang="scss">

.cardContainer {
  border: 1px #1f2d3d;
}

</style>
