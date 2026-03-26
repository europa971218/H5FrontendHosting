<template>
  <div class="applications-container">
    <!-- 顶部导航栏 -->
    <header class="top-nav">
      <div class="nav-tabs">
        <router-link to="/applications" class="tab" :class="{ active: $route.path === '/applications' }">应用管理</router-link>
        <router-link to="/data-overview" class="tab">数据概览</router-link>
        <router-link to="/tenant-management" class="tab">租户管理</router-link>
        <router-link to="/user-management" class="tab">用户管理</router-link>
        <router-link to="/organization-management" class="tab">机构管理</router-link>
        <router-link to="/hosting" class="tab">托管管理</router-link>
        <router-link to="/platform-monitoring" class="tab">平台监控</router-link>
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
      <!-- 应用管理标题 -->
      <div class="section-header">
        <h2><font-awesome-icon icon="th-large" /> 应用管理</h2>
      </div>

      <!-- 统计类型切换 -->
      <div class="stat-type">
        <button class="stat-btn" :class="{ active: activeStatType === '月度统计' }" @click="changeStatType('月度统计')">月度统计</button>
        <button class="stat-btn" :class="{ active: activeStatType === '季度统计' }" @click="changeStatType('季度统计')">季度统计</button>
        <div class="filter-group" style="margin-left: auto;">
          <label>统计周期</label>
          <el-date-picker
            v-model="dateRange"
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

      <!-- 应用列表 -->
      <div class="card">
        <h3>应用列表</h3>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>应用ID</th>
                <th>应用名称</th>
                <th>租户</th>
                <th>状态</th>
                <th>部署次数</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1,906,877,333,060,034,561</td>
                <td>电子管理平台 web 端</td>
                <td>租户1</td>
                <td><span class="status-tag active">运行中</span></td>
                <td>19</td>
                <td>
                  <button class="btn btn-sm" @click="navigateToAppOverview">查看</button>
                  <button class="btn btn-sm">编辑</button>
                  <button class="btn btn-sm" @click="navigateToHosting">部署</button>
                </td>
              </tr>
              <tr>
                <td>1,914,260,039,585,026,049</td>
                <td>代发薪-企业端</td>
                <td>租户2</td>
                <td><span class="status-tag active">运行中</span></td>
                <td>15</td>
                <td>
                  <button class="btn btn-sm" @click="navigateToAppOverview">查看</button>
                  <button class="btn btn-sm">编辑</button>
                  <button class="btn btn-sm" @click="navigateToHosting">部署</button>
                </td>
              </tr>
              <tr>
                <td>1,928,369,597,602,971,650</td>
                <td>代发薪-企业端（内网）</td>
                <td>租户2</td>
                <td><span class="status-tag active">运行中</span></td>
                <td>9</td>
                <td>
                  <button class="btn btn-sm" @click="navigateToAppOverview">查看</button>
                  <button class="btn btn-sm">编辑</button>
                  <button class="btn btn-sm" @click="navigateToHosting">部署</button>
                </td>
              </tr>
              <tr>
                <td>1,978,291,280,274,882,561</td>
                <td>共享1016应用</td>
                <td>租户1</td>
                <td><span class="status-tag inactive">已停止</span></td>
                <td>10</td>
                <td>
                  <button class="btn btn-sm" @click="navigateToAppOverview">查看</button>
                  <button class="btn btn-sm">编辑</button>
                  <button class="btn btn-sm" @click="navigateToHosting">部署</button>
                </td>
              </tr>
              <tr>
                <td>1,978,291,103,929,565,186</td>
                <td>隔离1016应用</td>
                <td>租户3</td>
                <td><span class="status-tag active">运行中</span></td>
                <td>7</td>
                <td>
                  <button class="btn btn-sm" @click="navigateToAppOverview">查看</button>
                  <button class="btn btn-sm">编辑</button>
                  <button class="btn btn-sm" @click="navigateToHosting">部署</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 应用部署统计 -->
      <div class="charts-row">
        <div class="chart-card">
          <h3>应用部署趋势</h3>
          <div class="chart-container" ref="appDeploymentChart"></div>
        </div>

        <div class="chart-card">
          <h3>应用状态分布</h3>
          <div class="chart-container" ref="appStatusChart"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'Applications',
  data() {
    return {
      activeStatType: '月度统计',
      dateRange: ['2025-12', '2026-01'],
      charts: {}
    }
  },
  methods: {
    // 导航到应用托管视图
    navigateToHosting() {
      this.$router.push('/hosting');
    },
    // 导航到应用概况页面
    navigateToAppOverview() {
      this.$router.push('/app-overview');
    },
    // 切换统计类型
    changeStatType(statType) {
      this.activeStatType = statType
      // 根据统计类型更新日期范围
      if (statType === '季度统计') {
        this.dateRange = ['2025-Q4', '2026-Q1']
      } else {
        this.dateRange = ['2025-12', '2026-01']
      }
      // 重新初始化图表
      this.initCharts()
    },
    // 初始化图表
    initCharts() {
      // 清理现有的图表实例
      Object.values(this.charts).forEach(chart => chart.dispose())
      this.charts = {}

      // 获取当前统计类型
      const isQuarterly = this.activeStatType === '季度统计'
      
      // 应用部署趋势 - 折线图
      this.charts.appDeployment = this.initLineChart(
        this.$refs.appDeploymentChart,
        isQuarterly ? ['2025-Q4', '2026-Q1'] : ['2025-12', '2026-01'],
        isQuarterly ? [150, 200] : [187, 203],
        '应用部署趋势'
      )

      // 应用状态分布 - 饼图
      this.charts.appStatus = this.initPieChart(
        this.$refs.appStatusChart,
        ['运行中', '已停止', '部署中', '异常'],
        [65, 20, 10, 5],
        '应用状态分布'
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
    // 初始化饼图
    initPieChart(dom, categories, data, title) {
      const chart = echarts.init(dom)
      const option = {
        title: {
          text: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          textStyle: {
            color: '#666'
          }
        },
        series: [
          {
            name: title,
            type: 'pie',
            radius: '60%',
            center: ['50%', '50%'],
            data: categories.map((category, index) => ({
              value: data[index],
              name: category
            })),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            itemStyle: {
              color: function(params) {
                const colors = ['#67c23a', '#e6a23c', '#409eff', '#f56c6c']
                return colors[params.dataIndex]
              }
            }
          }
        ]
      }
      chart.setOption(option)
      return chart
    },
    // 调整图表大小
    resizeCharts() {
      Object.values(this.charts).forEach(chart => chart.resize())
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
  }
}
</script>

<style scoped>
.applications-container {
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

/* 统计类型切换 */
.stat-type {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
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

/* 状态标签样式 */
.status-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-tag.active {
  background-color: #f0f9eb;
  color: #67c23a;
  border: 1px solid #c2e7b0;
}

.status-tag.inactive {
  background-color: #fef0f0;
  color: #f56c6c;
  border: 1px solid #fbc4c4;
}

/* 按钮样式 */
.btn {
  padding: 6px 12px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 5px;
}

.btn:hover {
  border-color: #1e3c72;
  color: #1e3c72;
}

.btn-sm {
  padding: 4px 8px;
  font-size: 11px;
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
  
  .charts-row {
    grid-template-columns: 1fr;
  }
}
</style>
