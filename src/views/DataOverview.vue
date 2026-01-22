<template>
  <div class="data-overview">
    <!-- 顶部导航栏 -->
    <header class="top-nav">
      <div class="nav-tabs">
        <router-link to="/data-overview" class="tab" :class="{ active: $route.path === '/data-overview' }">数据概览</router-link>
        <router-link to="/tenant-management" class="tab">租户管理</router-link>
        <router-link to="/user-management" class="tab">用户管理</router-link>
        <router-link to="/organization-management" class="tab">机构管理</router-link>
        <router-link to="/platform-monitoring" class="tab" :class="{ active: $route.path === '/platform-monitoring' }">平台监控</router-link>
        <router-link to="/alert-center" class="tab">告警中心</router-link>
        <router-link to="/platform-logs" class="tab">平台日志</router-link>
        <router-link to="/operation-audit" class="tab">操作审计</router-link>
        <router-link to="/user-feedback" class="tab">用户反馈</router-link>
        <router-link to="/help-center" class="tab">帮助中心</router-link>
        <router-link to="/monitoring-management" class="tab">监控管理</router-link>
        <router-link to="/version-management" class="tab">版本管理</router-link>
      </div>
    </header>

    <!-- 页面内容 -->
    <main class="content">
      <!-- 数据概览标题 -->
      <div class="section-header">
        <h2>数据概览</h2>
        <!-- 新增导航 -->
        <div class="data-nav">
          <span class="nav-item" :class="{ active: activeNav === '应用运营' }" @click="switchNav('应用运营')">应用运营</span>
          <span class="nav-item" :class="{ active: activeNav === '资源使用' }" @click="switchNav('资源使用')">资源使用</span>
        </div>
      </div>

      <!-- 应用运营内容 -->
      <div v-if="activeNav === '应用运营'">
        <!-- 统计类型切换 -->
      <div class="stat-type">
        <button class="stat-btn" :class="{ active: activeStatType1 === '月度统计' }" @click="changeStatType(1, '月度统计')">月度统计</button>
        <button class="stat-btn" :class="{ active: activeStatType1 === '季度统计' }" @click="changeStatType(1, '季度统计')">季度统计</button>
        <div class="filter-group" style="margin-left: auto;">
          <label>统计周期</label>
          <el-date-picker
            v-model="dateRange1"
            type="daterange"
            range-separator=" - "
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="YYYY-MM"
            value-format="YYYY-MM"
            style="width: 200px"
          />
        </div>
      </div>

        <!-- 图表区域1：用户统计 -->
        <div class="charts-row">
          <div class="chart-card">
            <h3>托管用户(新增)</h3>
            <div class="chart-container" ref="newUsersChart"></div>
          </div>

          <div class="chart-card">
            <h3>托管用户(累计)</h3>
            <div class="chart-container" ref="totalUsersChart"></div>
          </div>
        </div>

        <!-- 图表区域2：应用统计 -->
        <div class="charts-row">
          <div class="chart-card">
            <h3>托管应用(新增)</h3>
            <div class="chart-container" ref="newAppsChart"></div>
          </div>

          <div class="chart-card">
            <h3>托管应用(累计)</h3>
            <div class="chart-container" ref="totalAppsChart"></div>
          </div>
        </div>

        <!-- 图表区域3：应用活跃度 -->
        <div class="charts-row">
          <div class="chart-card" style="grid-column: 1 / -1;">
            <h3>托管应用活跃度</h3>
            <div class="chart-container" ref="appActivityChart"></div>
          </div>
        </div>

        <!-- 平台资源使用情况表格 -->
        <div class="card">
          <h3>平台资源使用情况</h3>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>IP</th>
                  <th colspan="2">CPU</th>
                  <th colspan="2">MEM</th>
                  <th colspan="2">内存</th>
                </tr>
                <tr>
                  <th></th>
                  <th>2025-05</th>
                  <th>2025-06</th>
                  <th>2025-05</th>
                  <th>2025-06</th>
                  <th>2025-05</th>
                  <th>2025-06</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>96.0.8.227</td>
                  <td>0%</td>
                  <td>0%</td>
                  <td>0.00GB</td>
                  <td>0.00GB</td>
                  <td>0%</td>
                  <td>0%</td>
                </tr>
                <tr>
                  <td>96.0.8.178</td>
                  <td>0%</td>
                  <td>0%</td>
                  <td>0.00GB</td>
                  <td>0.00GB</td>
                  <td>0%</td>
                  <td>0%</td>
                </tr>
                <tr>
                  <td>96.0.8.215</td>
                  <td>0%</td>
                  <td>0%</td>
                  <td>0.00GB</td>
                  <td>0.00GB</td>
                  <td>0%</td>
                  <td>0%</td>
                </tr>
                <tr>
                  <td>96.0.190.112</td>
                  <td>5%</td>
                  <td>4%</td>
                  <td>6.31GB/6</td>
                  <td>6.51GB/6</td>
                  <td>17%</td>
                  <td>17%</td>
                </tr>
                <tr>
                  <td>96.0.190.113</td>
                  <td>7%</td>
                  <td>4%</td>
                  <td>6.31GB/6</td>
                  <td>6.51GB/6</td>
                  <td>11%</td>
                  <td>11%</td>
                </tr>
                <tr>
                  <td>96.0.188.212</td>
                  <td>3%</td>
                  <td>3%</td>
                  <td>7.54GB/8</td>
                  <td>7.54GB/8</td>
                  <td>9%</td>
                  <td>9%</td>
                </tr>
                <tr>
                  <td>96.0.188.213</td>
                  <td>4%</td>
                  <td>4%</td>
                  <td>7.54GB/8</td>
                  <td>7.54GB/8</td>
                  <td>7%</td>
                  <td>7%</td>
                </tr>
                <tr>
                  <td>96.0.1.191</td>
                  <td>4%</td>
                  <td>4%</td>
                  <td>7.54GB/8</td>
                  <td>7.54GB/8</td>
                  <td>2%</td>
                  <td>2%</td>
                </tr>
                <tr>
                  <td>96.0.8.67</td>
                  <td>0%</td>
                  <td>0%</td>
                  <td>0.00GB</td>
                  <td>0.00GB</td>
                  <td>0%</td>
                  <td>0%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 应用请求数/部署导航 -->
        <div class="app-nav">
          <h3>应用请求数/部署</h3>
          <div class="stat-type">
          <button class="stat-btn" :class="{ active: activeStatType2 === '月度统计' }" @click="changeStatType(2, '月度统计')">月度统计</button>
          <button class="stat-btn" :class="{ active: activeStatType2 === '季度统计' }" @click="changeStatType(2, '季度统计')">季度统计</button>
          <div class="filter-group" style="margin-left: auto;">
            <label>统计周期</label>
            <el-date-picker
              v-model="dateRange2"
              type="daterange"
              range-separator=" - "
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="YYYY-MM"
              value-format="YYYY-MM"
              style="width: 200px"
            />
          </div>
        </div>
        </div>

        <!-- 图表区域4：资源统计 -->
        <div class="charts-row">
          <div class="chart-card">
            <h3>应用请求数</h3>
            <div class="chart-container" ref="ossCapacityChart"></div>
          </div>

          <div class="chart-card">
            <h3>应用告警次数</h3>
            <div class="chart-container" ref="platformAlertChart"></div>
          </div>
        </div>

        <!-- 图表区域5：应用统计 -->
        <div class="charts-row">
          <div class="chart-card">
            <h3>应用部署次数</h3>
            <div class="chart-container" ref="appRequestsChart"></div>
          </div>

          <div class="chart-card">
            <h3>应用异常拦截次数</h3>
            <div class="chart-container" ref="appAlertChart"></div>
          </div>
        </div>

        <!-- 应用部署次数排名TOP30（当季） -->
        <div class="card">
          <h3>应用部署次数排名top30（当季）</h3>
          <div class="chart-container" ref="deployRankingChart" style="height: 400px;"></div>
        </div>

        <!-- 应用部署包大小TOP10 -->
        <div class="card">
          <h3>应用部署包大小TOP10</h3>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>app_id</th>
                  <th>应用名</th>
                  <th>部署包合计大小（GB）</th>
                  <th>部署包平均大小（MB）</th>
                  <th>最大部署包（MB）</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1,906,877,333,060,034,561</td>
                  <td>电子管理平台 web 端</td>
                  <td>2.6526</td>
                  <td>135.8155</td>
                  <td>164.6648</td>
                </tr>
                <tr>
                  <td>1,914,260,039,585,026,049</td>
                  <td>代发薪-企业端</td>
                  <td>1.9278</td>
                  <td>130.9131</td>
                  <td>130.9131</td>
                </tr>
                <tr>
                  <td>1,928,369,597,602,971,650</td>
                  <td>代发薪-企业端（内网）</td>
                  <td>1.1278</td>
                  <td>130.9131</td>
                  <td>130.9131</td>
                </tr>
                <tr>
                  <td>1,978,291,280,274,882,561</td>
                  <td>共享1016应用</td>
                  <td>0.751</td>
                  <td>76.8938</td>
                  <td>76.8938</td>
                </tr>
                <tr>
                  <td>1,978,291,103,929,565,186</td>
                  <td>隔离1016应用</td>
                  <td>0.510</td>
                  <td>76.8938</td>
                  <td>76.8938</td>
                </tr>
                <tr>
                  <td>1,777,993,453,115,809,794</td>
                  <td>H5开发者门户</td>
                  <td>0.4255</td>
                  <td>67.2582</td>
                  <td>76.8938</td>
                </tr>
                <tr>
                  <td>1,763,454,466,780,610,561</td>
                  <td>悦农生活-运营端</td>
                  <td>0.3818</td>
                  <td>21.3903</td>
                  <td>65.6667</td>
                </tr>
                <tr>
                  <td>1,813,479,074,938,081,281</td>
                  <td>悦农缴费商户端</td>
                  <td>0.2785</td>
                  <td>57.2349</td>
                  <td>57.5867</td>
                </tr>
                <tr>
                  <td>1,813,865,429,803,307,009</td>
                  <td>悦农生活-商户端 PC</td>
                  <td>0.1812</td>
                  <td>31.9928</td>
                  <td>56.3226</td>
                </tr>
                <tr>
                  <td>1,813,479,074,938,081,281</td>
                  <td>效能工具</td>
                  <td>0.0585</td>
                  <td>7.2349</td>
                  <td>17.5867</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 资源使用内容 -->
      <div v-else-if="activeNav === '资源使用'">
        <!-- 统计类型切换 -->
        <div class="stat-type">
          <button class="stat-btn" :class="{ active: activeStatType3 === '月度统计' }" @click="changeStatType(3, '月度统计')">月度统计</button>
          <button class="stat-btn" :class="{ active: activeStatType3 === '季度统计' }" @click="changeStatType(3, '季度统计')">季度统计</button>
          <div class="filter-group" style="margin-left: auto;">
            <label>统计周期</label>
            <el-date-picker
              v-model="dateRange3"
              type="daterange"
              range-separator=" - "
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="YYYY-MM"
              value-format="YYYY-MM"
              style="width: 200px"
            />
          </div>
        </div>

        <!-- 平台资源使用情况表格 -->
        <div class="card">
          <h3>资源使用情况</h3>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>IP</th>
                  <th colspan="3">CPU</th>
                  <th colspan="3">MEM</th>
                  <th colspan="3">磁盘</th>
                </tr>
                <tr>
                  <th></th>
                  <th>2025-11</th>
                  <th>2025-12</th>
                  <th>2026-01</th>
                  <th>2025-11</th>
                  <th>2025-12</th>
                  <th>2026-01</th>
                  <th>2025-11</th>
                  <th>2025-12</th>
                  <th>2026-01</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>96.0.188.175</td>
                  <td>7%</td>
                  <td>7%</td>
                  <td>8%</td>
                  <td>1.5G/4G</td>
                  <td>1.5G/4G</td>
                  <td>1.5G/4G</td>
                  <td>6%</td>
                  <td>6%</td>
                  <td>6%</td>
                </tr>
                <tr>
                  <td>96.0.188.178</td>
                  <td>10%</td>
                  <td>10%</td>
                  <td>10%</td>
                  <td>1.6G/4G</td>
                  <td>1.6G/4G</td>
                  <td>1.6G/4G</td>
                  <td>5%</td>
                  <td>5%</td>
                  <td>6%</td>
                </tr>
                <tr>
                  <td>96.0.188.206</td>
                  <td>5%</td>
                  <td>6%</td>
                  <td>5%</td>
                  <td>2.1G/4G</td>
                  <td>2.2G/4G</td>
                  <td>2.3G/4G</td>
                  <td>13%</td>
                  <td>13%</td>
                  <td>13%</td>
                </tr>
                <tr>
                  <td>96.0.188.219</td>
                  <td></td>
                  <td>17%</td>
                  <td></td>
                  <td>1.2G/6G</td>
                  <td></td>
                  <td></td>
                  <td>10%</td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 图表区域：OSS使用容量和平台告警次数 -->
        <div class="charts-row">
          <div class="chart-card">
            <h3>OSS使用容量</h3>
            <div class="chart-container" ref="ossCapacityChart2" style="height: 250px;"></div>
          </div>

          <div class="chart-card">
            <h3>平台告警次数</h3>
            <div class="chart-container" ref="platformAlertChart2" style="height: 250px;"></div>
          </div>
        </div>

        <!-- 资源节省情况 -->
        <div class="card">
          <h3>资源节省情况</h3>
          
          <!-- 物力资源节省 -->
          <div class="resource-section">
            <h4>物力资源节省</h4>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>资源类型</th>
                    <th>接入前数量</th>
                    <th>接入后数量</th>
                    <th>节省数量</th>
                    <th>节省率</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>服务器</td>
                    <td>64台</td>
                    <td>24台</td>
                    <td>40台</td>
                    <td>62.50%</td>
                  </tr>
                  <tr>
                    <td>中间件</td>
                    <td>64个</td>
                    <td>24个</td>
                    <td>40个</td>
                    <td>62.50%</td>
                  </tr>
                  <tr>
                    <td>对象存储</td>
                    <td>2800G</td>
                    <td>300G</td>
                    <td>2500G</td>
                    <td>89.28%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 人力资源节省 -->
          <div class="resource-section">
            <h4>人力资源节省</h4>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>类别</th>
                    <th>资源类型</th>
                    <th>节省数量</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>省人</td>
                    <td>当季节省人力（租户端）</td>
                    <td>866工时</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'DataOverview',
  data() {
    return {
      charts: {},
      // 日期范围
      dateRange1: ['2025-05', '2025-06'], // 应用运营月度
      dateRange2: ['2025-12', '2026-01'], // 应用运营请求/部署月度
      dateRange3: ['2025-11', '2026-01'], // 资源使用月度
      // 统计类型：月度统计/季度统计
      activeStatType1: '月度统计', // 应用运营统计类型
      activeStatType2: '月度统计', // 应用运营请求/部署统计类型
      activeStatType3: '月度统计', // 资源使用统计类型
      // 当前激活的导航项
      activeNav: '应用运营'
    }
  },
  mounted() {
    this.initCharts()
    // 监听窗口大小变化，自动调整图表大小
    window.addEventListener('resize', this.resizeCharts)
  },
  beforeUnmount() {
    // 清理图表实例
    Object.values(this.charts).forEach(chart => chart.dispose())
    window.removeEventListener('resize', this.resizeCharts)
  },
  methods: {
    initCharts() {
      // 清理现有的图表实例
      Object.values(this.charts).forEach(chart => chart.dispose())
      this.charts = {}

      if (this.activeNav === '应用运营') {
        // 获取当前统计类型和日期范围
        const isQuarterly1 = this.activeStatType1 === '季度统计'
        const isQuarterly2 = this.activeStatType2 === '季度统计'
        
        // 托管用户(新增) - 折线图
        this.charts.newUsers = this.initLineChart(
          this.$refs.newUsersChart,
          isQuarterly1 ? ['2025-Q2', '2025-Q3'] : ['2025-05', '2025-06'],
          isQuarterly1 ? [35, 18] : [22, 2],
          '托管用户(新增)'
        )

        // 托管用户(累计) - 柱状图
        this.charts.totalUsers = this.initBarChart(
          this.$refs.totalUsersChart,
          isQuarterly1 ? ['2025-Q2', '2025-Q3'] : ['2025-05', '2025-06'],
          isQuarterly1 ? [105, 115] : [113, 113],
          '托管用户(累计)'
        )

        // 托管应用(新增) - 折线图
        this.charts.newApps = this.initLineChart(
          this.$refs.newAppsChart,
          isQuarterly1 ? ['2025-Q2', '2025-Q3'] : ['2025-12', '2026-01'],
          isQuarterly1 ? [15, 8] : [9, 0],
          '托管应用(新增)'
        )

        // 托管应用(累计) - 柱状图
        this.charts.totalApps = this.initBarChart(
          this.$refs.totalAppsChart,
          isQuarterly1 ? ['2025-Q2', '2025-Q3'] : ['2025-12', '2026-01'],
          isQuarterly1 ? [175, 185] : [181, 181],
          '托管应用(累计)'
        )

        // 托管应用活跃度 - 多系列柱状图
        this.charts.appActivity = this.initMultiBarChart(
          this.$refs.appActivityChart,
          isQuarterly1 ? ['2025-Q2', '2025-Q3'] : ['2025-12', '2026-01'],
          [
            { name: '活跃应用', data: isQuarterly1 ? [55, 65] : [60, 62], color: '#ff5722' },
            { name: '普通应用', data: isQuarterly1 ? [80, 85] : [85, 78], color: '#ff9800' },
            { name: '僵尸应用', data: isQuarterly1 ? [45, 58] : [50, 55], color: '#f59e0b' }
          ],
          '托管应用活跃度'
        )

        // 应用请求数 - 柱状图
        this.charts.ossCapacity = this.initBarChart(
          this.$refs.ossCapacityChart,
          isQuarterly2 ? ['2025-Q4', '2026-Q1'] : ['2025-05', '2025-06'],
          isQuarterly2 ? [250, 180] : [188.5, 140.0],
          '应用请求数'
        )

        // 应用告警次数 - 折线图
        this.charts.platformAlert = this.initLineChart(
          this.$refs.platformAlertChart,
          isQuarterly2 ? ['2025-Q4', '2026-Q1'] : ['2025-05', '2025-06'],
          isQuarterly2 ? [5, 2] : [3, 0],
          '应用告警次数'
        )

        // 应用部署次数 - 柱状图
        this.charts.appRequests = this.initBarChart(
          this.$refs.appRequestsChart,
          isQuarterly2 ? ['2025-Q4', '2026-Q1'] : ['2025-05', '2025-06'],
          isQuarterly2 ? [220000, 50000] : [187183, 20297],
          '应用部署次数'
        )

        // 应用异常拦截次数 - 折线图
        this.charts.appAlert = this.initLineChart(
          this.$refs.appAlertChart,
          isQuarterly2 ? ['2025-Q4', '2026-Q1'] : ['2025-05', '2025-06'],
          isQuarterly2 ? [0.2, 0.15] : [0.1, 0.1],
          '应用异常拦截次数'
        )

        // 应用部署次数排名TOP30（当季） - 水平柱状图
        this.charts.deployRanking = this.initHorizontalBarChart(
          this.$refs.deployRankingChart,
          ['应用30', '应用29', '应用28', '应用27', '应用26', '应用25', '应用24', '应用23', '应用22', '应用21', '应用20', '应用19', '应用18', '应用17', '应用16', '应用15', '应用14', '应用13', '应用12', '应用11', '效能工具', '悦农生活-商户端 PC', '悦农缴费商户端', '悦农生活-运营端', 'H5开发者门户', '隔离1016应用', '共享1016应用', '代发薪-企业端（内网）', '代发薪-企业端', '电子管理平台 web 端'],
          isQuarterly2 ? [5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 35, 38, 42, 48, 55, 62, 68, 75, 88, 95, 120, 135, 150] : [3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 35, 38, 42, 48, 55, 62, 68, 75, 88, 95, 120],
          '应用部署次数排名top30（当季）'
        )
      } else if (this.activeNav === '资源使用') {
        // 获取当前统计类型
        const isQuarterly = this.activeStatType3 === '季度统计'
        
        // OSS使用容量 - 折线图
        this.charts.ossCapacity2 = this.initLineChart(
          this.$refs.ossCapacityChart2,
          isQuarterly ? ['2025-Q4', '2026-Q1'] : ['2025-11', '2025-12', '2026-01'],
          isQuarterly ? [0.5, 1.2] : [0, 0, 0],
          'OSS使用容量'
        )

        // 平台告警次数 - 折线图
        this.charts.platformAlert2 = this.initLineChart(
          this.$refs.platformAlertChart2,
          isQuarterly ? ['2025-Q4', '2026-Q1'] : ['2025-11', '2025-12', '2026-01'],
          isQuarterly ? [15000, 5000] : [8000, 12000, 2000],
          '平台告警次数'
        )
      }
    },

    // 初始化折线图
    initLineChart(dom, categories, data, title) {
      const chart = echarts.init(dom)
      const option = {
        title: {
          text: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: categories,
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          },
          splitLine: {
            lineStyle: {
              color: '#eee'
            }
          }
        },
        series: [
          {
            name: title,
            type: 'line',
            data: data,
            lineStyle: {
              color: '#ff5722',
              width: 3
            },
            itemStyle: {
              color: '#ff5722',
              borderColor: '#fff',
              borderWidth: 2
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(255, 87, 34, 0.3)'
                },
                {
                  offset: 1,
                  color: 'rgba(255, 87, 34, 0.05)'
                }
              ])
            },
            smooth: true
          }
        ]
      }
      chart.setOption(option)
      return chart
    },

    // 初始化柱状图
    initBarChart(dom, categories, data, title) {
      const chart = echarts.init(dom)
      const option = {
        title: {
          text: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: categories,
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          },
          splitLine: {
            lineStyle: {
              color: '#eee'
            }
          }
        },
        series: [
          {
            name: title,
            type: 'bar',
            data: data,
            itemStyle: {
              color: '#ff5722',
              borderRadius: [4, 4, 0, 0]
            },
            emphasis: {
              itemStyle: {
                color: '#f4511e'
              }
            }
          }
        ]
      }
      chart.setOption(option)
      return chart
    },

    // 初始化多系列柱状图
    initMultiBarChart(dom, categories, seriesData, title) {
      const chart = echarts.init(dom)
      const option = {
        title: {
          text: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: seriesData.map(item => item.name),
          top: 10,
          textStyle: {
            color: '#666'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
          top: '15%'
        },
        xAxis: {
          type: 'category',
          data: categories,
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          },
          splitLine: {
            lineStyle: {
              color: '#eee'
            }
          }
        },
        series: seriesData.map(item => ({
          name: item.name,
          type: 'bar',
          data: item.data,
          itemStyle: {
            color: item.color,
            borderRadius: [4, 4, 0, 0]
          },
          emphasis: {
            itemStyle: {
              opacity: 0.8
            }
          }
        }))
      }
      chart.setOption(option)
      return chart
    },

    // 初始化水平柱状图
    initHorizontalBarChart(dom, categories, data, title) {
      const chart = echarts.init(dom)
      const option = {
        title: {
          text: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '10%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          },
          splitLine: {
            lineStyle: {
              color: '#eee'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: categories,
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666',
            fontSize: 10,
            width: 120,
            overflow: 'truncate',
            formatter: function(value) {
              return value.length > 12 ? value.substring(0, 12) + '...' : value;
            }
          }
        },
        series: [
          {
            name: title,
            type: 'bar',
            data: data,
            itemStyle: {
              color: '#ff5722',
              borderRadius: [0, 4, 4, 0]
            },
            emphasis: {
              itemStyle: {
                color: '#f4511e'
              }
            },
            label: {
              show: true,
              position: 'right',
              color: '#666',
              fontSize: 10
            }
          }
        ]
      }
      chart.setOption(option)
      return chart
    },

    // 切换导航
    switchNav(nav) {
      this.activeNav = nav
      // 等待DOM更新后再初始化图表
      this.$nextTick(() => {
        this.initCharts()
      })
    },

    // 切换统计类型
    changeStatType(statTypeIndex, statType) {
      // 更新对应的统计类型状态
      if (statTypeIndex === 1) {
        this.activeStatType1 = statType
      } else if (statTypeIndex === 2) {
        this.activeStatType2 = statType
      } else if (statTypeIndex === 3) {
        this.activeStatType3 = statType
      }

      // 根据统计类型更新对应的日期范围
      if (statType === '季度统计') {
        if (statTypeIndex === 1) {
          this.dateRange1 = ['2025-Q2', '2025-Q3']
        } else if (statTypeIndex === 2) {
          this.dateRange2 = ['2025-Q4', '2026-Q1']
        } else if (statTypeIndex === 3) {
          this.dateRange3 = ['2025-Q4', '2026-Q1']
        }
      } else {
        if (statTypeIndex === 1) {
          this.dateRange1 = ['2025-05', '2025-06']
        } else if (statTypeIndex === 2) {
          this.dateRange2 = ['2025-12', '2026-01']
        } else if (statTypeIndex === 3) {
          this.dateRange3 = ['2025-11', '2026-01']
        }
      }

      // 重新初始化图表，更新数据
      this.initCharts()
    },

    // 调整所有图表大小
    resizeCharts() {
      Object.values(this.charts).forEach(chart => chart.resize())
    }
  }
}
</script>

<style scoped>
.data-overview {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: #f8f9fa;
  min-height: 100vh;
}

/* 顶部导航栏 */
.top-nav {
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.nav-tabs {
  display: flex;
  gap: 8px;
  padding: 15px 0;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.tab {
  padding: 8px 12px;
  font-size: 0.85rem;
  color: #666;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
  white-space: nowrap;
}

.tab:hover {
  background-color: #f0f0f0;
}

.tab.active {
  background-color: #1e3c72;
  color: white;
  font-weight: 500;
}

/* 内容区 */
.content {
  padding: 20px;
}

/* 章节标题 */
.section-header {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-header h2 {
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

/* 数据概览导航 */
.data-nav {
  display: flex;
  gap: 15px;
  font-size: 0.9rem;
}

.nav-item {
  color: #666;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  transition: all 0.2s;
}

.nav-item:hover {
  color: #ff5722;
}

.nav-item.active {
  color: #ff5722;
  font-weight: 600;
  border-bottom: 2px solid #ff5722;
  padding-bottom: 3px;
  border-radius: 0;
}

/* 统计类型切换 */
.stat-type {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.stat-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.stat-btn:hover {
  border-color: #1e3c72;
  color: #1e3c72;
}

.stat-btn.active {
  background-color: #ff5722;
  color: white;
  border-color: #ff5722;
  font-weight: 500;
}

/* 过滤条件 */
.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: center;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-group label {
  font-size: 0.9rem;
  color: #666;
  white-space: nowrap;
}

.filter-select,
.filter-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  width: 200px;
}

.filter-input {
  background-color: white;
  cursor: text;
}

/* 表格容器 */
.table-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* 数据表格 */
.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.data-table th,
.data-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
  white-space: nowrap;
}

.data-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #333;
  font-size: 0.85rem;
}

.data-table tbody tr:hover {
  background-color: #f8f9fa;
}

.data-table td {
  color: #555;
}

/* 应用导航 */
    .app-nav {
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }

    .app-nav h3 {
      margin: 0 0 15px 0;
      color: #333;
      font-size: 1.1rem;
      font-weight: 600;
    }

    /* 统计类型切换 */
    .stat-type {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      align-items: center;
    }

/* 图表行容器 */
.charts-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

/* 图表卡片 */
.chart-card {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chart-card h3 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
}

/* 图表容器 */
.chart-container {
  height: 250px;
  position: relative;
}

/* 折线图 */
.line-chart {
  height: 100%;
  position: relative;
}

/* 柱状图 */
.bar-chart {
  height: 100%;
  position: relative;
}

/* 图表网格 */
.chart-grid {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0;
  pointer-events: none;
}

.grid-line {
  height: 1px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 12px;
  color: #999;
}

.grid-line span {
  margin-right: 10px;
}

/* 卡片样式 */
.card {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.card h3 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
}

/* 数据表格 */
.table-container {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.data-table th,
.data-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
}

.data-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
}

.data-table tbody tr:hover {
  background-color: #f8f9fa;
}

/* 过滤条件 */
.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-group label {
  font-size: 0.9rem;
  color: #666;
  white-space: nowrap;
}

.filter-select,
.filter-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  width: 200px;
}

.filter-input {
  background-color: white;
  cursor: text;
}

/* 资源使用页面样式 */
.resource-section {
  margin-bottom: 30px;
}

.resource-section:last-child {
  margin-bottom: 0;
}

.resource-section h4 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 1rem;
  font-weight: 600;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

/* 空内容样式 */
.empty-content {
  background-color: white;
  border-radius: 8px;
  padding: 60px 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.empty-text {
  color: #999;
  font-size: 1.1rem;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .table-container {
    overflow-x: auto;
  }
  
  .data-table {
    min-width: 1200px;
  }
  
  .filters {
    flex-wrap: wrap;
    gap: 15px;
  }
  
  .filter-group {
    flex-wrap: wrap;
  }
}

@media (max-width: 768px) {
  .content {
    padding: 15px;
  }
  
  .nav-tabs {
    gap: 5px;
  }
  
  .tab {
    padding: 6px 12px;
    font-size: 0.85rem;
  }
  
  .filters {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .filter-select,
  .filter-input {
    width: 100%;
  }
}
</style>