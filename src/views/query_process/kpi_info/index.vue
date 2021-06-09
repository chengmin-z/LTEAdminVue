<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="属性选择">
        <el-select v-model="form.selectedProperty" filterable :loading="selectLoading" size="middle" style="width:320px" placeholder="请选择">
          <el-option v-for="item in selectPropertys" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="小区选择">
        <el-select v-model="form.selectedSector" filterable :loading="selectLoading" size="middle" style="width:320px" placeholder="请选择">
          <el-option v-for="item in selectSectors" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="小区输入">
        <el-input v-model="form.inputSector" />
      </el-form-item>
      <el-form-item label="日期选择">
        <el-date-picker
          v-model="form.dateDuration"
          :picker-options="pickerOptions"
          type="daterange"
          value-format="MM/dd/yyyy 00:00:00"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :clearable="false"
        />
      </el-form-item>
      <el-form-item label="查询方式">
        <el-radio-group v-model="form.mode">
          <el-radio label="列表选择" />
          <el-radio label="文本输入" />
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button :loading="queryLoading" type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="cardContainer">
      <div id="chart" style="height: 52vh; width: 100%;padding: 1px" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {
      chart: null,
      graph: null,
      selectSectors: [],
      selectPropertys: [],
      selectLoading: false,
      currentSectorName: '',
      form: {
        selectedProperty: '',
        selectedSector: '',
        inputSector: '',
        mode: '列表选择',
        dateDuration: ['07/17/2020 00:00:00', '07/19/2020 00:00:00']
      },
      queryLoading: false,
      pickerOptions: {
        disabledDate: time => {
          const day1 = 2 * 24 * 3600 * 1000
          const maxTime = 1594915200000 + day1
          const minTime = 1594915200000
          return time.getTime() > maxTime || time.getTime() < minTime
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
    onSubmit() {
      if (this.form.selectedProperty === '') {
        this.$message.warning('请选择查询属性')
        return
      }
      if (this.form.mode === '列表选择') {
        if (this.form.selectedSector === '') {
          this.$message.warning('请选择查询小区')
          return
        }
      } else {
        if (this.form.selectedSector === '') {
          this.$message.warning('请输入查询小区')
          return
        }
      }
      if (this.form.dateDuration.length === 0) {
        this.$message.warning('请选择时间范围')
        return
      }
      const field = this.form.selectedProperty
      const communityName = this.form.mode === '列表选择' ? this.form.selectedSector : this.form.inputSector
      const startTimeStamp = this.form.dateDuration[0]
      const endTimeStamp = this.form.dateDuration[1]
      const info = { startTimeStamp, endTimeStamp, field, communityName }
      this.currentSectorName = communityName
      console.log(info)
      this.queryLoading = true
      this.$store.dispatch('query_operate/kpiInfoQuery', info).then(res => {
        console.log(res)
        this.queryLoading = false
        const graph = JSON.parse(res.detail)
        console.log(graph)
        if (graph.time.length !== 0) {
          this.graph = graph
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
      const type = 'kpi'
      const payload = { type }
      this.$store.dispatch('query_operate/getKPIPRBInfo', payload).then(res => {
        const detail = JSON.parse(res.detail)
        this.selectPropertys = detail.available_fields
        this.selectSectors = detail.community_name
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
        title: { text: this.form.selectedProperty + '折线图' + '（' + this.currentSectorName + '）', left: 'center', textStyle: { fontSize: 22, color: '#606266' }},
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
