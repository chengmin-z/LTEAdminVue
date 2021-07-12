<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="属性选择">
        <el-select v-model="form.selectedProperty" filterable :loading="selectLoading" size="middle" style="width:320px" placeholder="请选择">
          <el-option v-for="item in selectPropertys" :key="item" :label="'第' + item + '个PRB上检测的干扰噪声平均值'" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="网元选择">
        <el-select v-model="form.selectedNode" filterable :loading="selectLoading" size="middle" style="width:320px" placeholder="请选择">
          <el-option v-for="item in selectNodes" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="网元输入">
        <el-input v-model="form.inputNode" />
      </el-form-item>
      <el-form-item label="时间选择">
        <el-date-picker
          v-model="form.dateDuration"
          type="datetimerange"
          :picker-options="pickerOptions"
          :format="timeFormat[form.timeMode].display_format"
          :value-format="timeFormat[form.timeMode].value_format"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :clearable="false"
        />
      </el-form-item>
      <el-form-item label="时间级别">
        <el-radio-group v-model="form.timeMode" @change="timeModeChange">
          <el-radio label="小时级别" />
          <el-radio label="分钟级别" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="查询方式">
        <el-radio-group v-model="form.mode">
          <el-radio label="列表选择" />
          <el-radio label="文本输入" />
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button :loading="queryLoading" type="primary" @click="onSubmit">查询</el-button>
        <el-button :disabled="downloadUrl.length === 0" type="primary" size="middle" style="margin-left: 15px;">
          <a v-if="downloadUrl.length !== 0" target="_blank" :href="downloadUrl"> 导出查询 </a>
          <a v-else> 导出查询 </a>
        </el-button>
      </el-form-item>
    </el-form>
    <div class="cardContainer">
      <div id="chart" style="height: 45vh; width: 100%;padding: 1px" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
const defaultSettings = require('/src/settings.js')

export default {
  data() {
    return {
      chart: null,
      graph: null,
      selectNodes: [],
      selectPropertys: [],
      selectLoading: false,
      downloadUrl: '',
      currentSectorName: '',
      form: {
        selectedProperty: '',
        selectedNode: '',
        inputNode: '',
        mode: '列表选择',
        timeMode: '小时级别',
        dateDuration: ['07/17/2020 00', '07/19/2020 23']
      },
      minDefaultDuration: ['07/17/2020 18:45:00', '07/19/2020 00:45:00'],
      hourDefaultDuration: ['07/17/2020 00', '07/19/2020 23'],
      queryLoading: false,
      pickerOptions: {
        disabledDate: time => {
          const day1 = 3 * 24 * 3600 * 1000
          const maxTime = 1594915200000 + day1 - 1
          const minTime = 1594915200000
          return time.getTime() > maxTime || time.getTime() < minTime
        }
      },
      timeFormat: {
        '分钟级别': {
          display_format: 'yyyy-MM-dd HH:mm',
          value_format: 'MM/dd/yyyy HH:mm:ss'
        },
        '小时级别': {
          display_format: 'yyyy-MM-dd HH',
          value_format: 'MM/dd/yyyy HH'
        }
      }
    }
  },
  mounted() {
    this.initChart()
  },
  created() {
    this.loadSelectInfo()
  },
  methods: {
    timeModeChange() {
      console.log('change')
      if (this.form.timeMode === '小时级别') {
        this.form.dateDuration = this.hourDefaultDuration
      } else {
        this.form.dateDuration = this.minDefaultDuration
      }
    },
    onSubmit() {
      if (this.form.selectedProperty === '') {
        this.$message.warning('请选择查询属性')
        return
      }
      if (this.form.mode === '列表选择') {
        if (this.form.selectedNode === '') {
          this.$message.warning('请选择查询小区')
          return
        }
      } else {
        if (this.form.selectedNode === '') {
          this.$message.warning('请输入查询小区')
          return
        }
      }
      if (this.form.dateDuration.length === 0) {
        this.$message.warning('请选择时间范围')
        return
      }
      const id = this.form.selectedProperty
      const nodeName = this.form.mode === '列表选择' ? this.form.selectedNode : this.form.inputNode
      const start = this.form.dateDuration[0]
      const end = this.form.dateDuration[1]
      const level = this.form.timeMode
      const info = { start, end, id, nodeName, level }
      this.currentSectorName = nodeName
      console.log(info)
      this.queryLoading = true
      this.$store.dispatch('query_operate/getPrbInfo', info, level).then(res => {
        console.log(res)
        this.queryLoading = false
        const graph = JSON.parse(res.detail)
        console.log(graph)
        if (graph.time.length !== 0) {
          this.graph = graph
          this.downloadUrl = defaultSettings.host + graph.download_url
          this.paint(graph, this.chart)
          this.$message({
            message: '查询成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '没有数据',
            type: 'warning'
          })
        }
      }).catch(error => {
        console.log(error)
        this.queryLoading = false
        this.$message({
          message: '查询失败',
          type: 'error'
        })
      })
    },
    loadSelectInfo() {
      this.selectLoading = true
      const type = 'prb'
      const payload = { type }
      this.$store.dispatch('query_operate/getKPIPRBInfo', payload).then(res => {
        const detail = JSON.parse(res.detail)
        this.selectPropertys = detail.available_fields
        this.selectNodes = detail.community_name
        this.selectLoading = false
        console.log(detail)
      }).catch(error => {
        console.log(error)
        this.selectLoading = false
        this.$message({
          message: '加载数据失败',
          type: 'error'
        })
      })
    },
    initChart() {
      this.chart = echarts.init(document.getElementById('chart'))
    },
    paint(graph, chart) {
      const option = {
        title: { text: '第' + this.form.selectedProperty + '个PRB上检测的干扰噪声平均值（毫瓦分贝）折线图' + '（' + this.currentSectorName + '）', left: 'center', textStyle: { fontSize: 22, color: '#606266' }},
        xAxis: {
          type: 'category',
          data: graph.time
        },
        tooltip: {},
        yAxis: {
          type: 'value',
          scale: true
        },
        series: [{
          data: graph.value,
          type: 'line'
        }]
      }
      chart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.cardContainer {
  border: 1px #1f2d3d;
}
</style>
