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
      </div>

      <!-- 统计类型切换 -->
      <div class="stat-type">
        <button class="stat-btn active">月均统计</button>
        <button class="stat-btn">季均统计</button>
        <div class="filter-group" style="margin-left: auto;">
          <label>统计周期</label>
          <input type="text" class="filter-input" value="2025-05 - 2025-06">
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

      <!-- 图表区域4：资源统计 -->
      <div class="charts-row">
        <div class="chart-card">
          <h3>OSS使用容量</h3>
          <div class="chart-container" ref="ossCapacityChart"></div>
        </div>

        <div class="chart-card">
          <h3>平台告警次数</h3>
          <div class="chart-container" ref="platformAlertChart"></div>
        </div>
      </div>

      <!-- 图表区域5：应用统计 -->
      <div class="charts-row">
        <div class="chart-card">
          <h3>应用请求数</h3>
          <div class="chart-container" ref="appRequestsChart"></div>
        </div>

        <div class="chart-card">
          <h3>应用告警次数</h3>
          <div class="chart-container" ref="appAlertChart"></div>
        </div>
      </div>

      <!-- 图表区域6：应用异常统计 -->
      <div class="charts-row">
        <div class="chart-card">
          <h3>应用异常次数</h3>
          <div class="chart-container" ref="appErrorChart"></div>
        </div>

        <div class="chart-card">
          <h3>应用宕机次数</h3>
          <div class="chart-container" ref="appDownChart"></div>
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
      charts: {}
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
      // 托管用户(新增) - 折线图
      this.charts.newUsers = this.initLineChart(
        this.$refs.newUsersChart,
        ['2025-05', '2025-06'],
        [22, 2],
        '托管用户(新增)'
      )

      // 托管用户(累计) - 柱状图
      this.charts.totalUsers = this.initBarChart(
        this.$refs.totalUsersChart,
        ['2025-05', '2025-06'],
        [113, 113],
        '托管用户(累计)'
      )

      // 托管应用(新增) - 折线图
      this.charts.newApps = this.initLineChart(
        this.$refs.newAppsChart,
        ['2025-12', '2026-01'],
        [9, 0],
        '托管应用(新增)'
      )

      // 托管应用(累计) - 柱状图
      this.charts.totalApps = this.initBarChart(
        this.$refs.totalAppsChart,
        ['2025-12', '2026-01'],
        [181, 181],
        '托管应用(累计)'
      )

      // 托管应用活跃度 - 多系列柱状图
      this.charts.appActivity = this.initMultiBarChart(
        this.$refs.appActivityChart,
        ['2025-12', '2026-01'],
        [
          { name: '活跃应用', data: [60, 62], color: '#ff5722' },
          { name: '普通应用', data: [85, 78], color: '#ff9800' },
          { name: '僵尸应用', data: [50, 55], color: '#f59e0b' }
        ],
        '托管应用活跃度'
      )

      // OSS使用容量 - 柱状图
      this.charts.ossCapacity = this.initBarChart(
        this.$refs.ossCapacityChart,
        ['2025-05', '2025-06'],
        [188.5, 140.0],
        'OSS使用容量'
      )

      // 平台告警次数 - 折线图
      this.charts.platformAlert = this.initLineChart(
        this.$refs.platformAlertChart,
        ['2025-05', '2025-06'],
        [3, 0],
        '平台告警次数'
      )

      // 应用请求数 - 柱状图
      this.charts.appRequests = this.initBarChart(
        this.$refs.appRequestsChart,
        ['2025-05', '2025-06'],
        [187183, 20297],
        '应用请求数'
      )

      // 应用告警次数 - 折线图
      this.charts.appAlert = this.initLineChart(
        this.$refs.appAlertChart,
        ['2025-05', '2025-06'],
        [0.1, 0.1],
        '应用告警次数'
      )

      // 应用异常次数 - 折线图
      this.charts.appError = this.initLineChart(
        this.$refs.appErrorChart,
        ['2025-05', '2025-06'],
        [350, 50],
        '应用异常次数'
      )

      // 应用宕机次数 - 折线图
      this.charts.appDown = this.initLineChart(
        this.$refs.appDownChart,
        ['2025-05', '2025-06'],
        [1800, 300],
        '应用宕机次数'
      )
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
}

.section-header h2 {
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
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
  background-color: #1e3c72;
  color: white;
  border-color: #1e3c72;
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

/* 统计类型切换 */
.stat-type {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
  background-color: white;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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