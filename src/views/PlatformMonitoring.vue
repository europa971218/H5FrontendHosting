<template>
  <div class="platform-monitoring">
    <!-- 顶部导航栏 -->
    <header class="top-nav">
      <div class="nav-tabs">
        <router-link to="/data-overview" class="tab">数据概览</router-link>
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
      <!-- 平台监控标题 -->
      <div class="section-header">
        <h2>平台监控</h2>
      </div>

      <!-- 监控内容区域 -->
      <div class="monitoring-content">
        <div class="card">
          <h3>实时监控数据</h3>
          <div class="metrics-grid">
            <div class="metric-item">
              <div class="metric-label">CPU使用率</div>
              <div class="metric-value">4.2%</div>
              <div class="metric-change">+0.5%</div>
            </div>
            <div class="metric-item">
              <div class="metric-label">内存使用率</div>
              <div class="metric-value">12.3%</div>
              <div class="metric-change">+1.2%</div>
            </div>
            <div class="metric-item">
              <div class="metric-label">磁盘使用率</div>
              <div class="metric-value">67.8%</div>
              <div class="metric-change">+0.8%</div>
            </div>
            <div class="metric-item">
              <div class="metric-label">网络流量</div>
              <div class="metric-value">1.2 GB/s</div>
              <div class="metric-change">-0.3 GB/s</div>
            </div>
          </div>
        </div>

        <!-- 图表区域 -->
        <div class="charts-row">
          <div class="chart-card">
            <h3>CPU使用趋势</h3>
            <div class="chart-container" ref="cpuUsageChart"></div>
          </div>
          <div class="chart-card">
            <h3>内存使用趋势</h3>
            <div class="chart-container" ref="memoryUsageChart"></div>
          </div>
        </div>

        <div class="charts-row">
          <div class="chart-card">
            <h3>磁盘IO</h3>
            <div class="chart-container" ref="diskIoChart"></div>
          </div>
          <div class="chart-card">
            <h3>网络流量</h3>
            <div class="chart-container" ref="networkTrafficChart"></div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'PlatformMonitoring',
  data() {
    return {
      charts: {}
    }
  },
  mounted() {
    this.initCharts()
    window.addEventListener('resize', this.resizeCharts)
  },
  beforeUnmount() {
    Object.values(this.charts).forEach(chart => chart.dispose())
    window.removeEventListener('resize', this.resizeCharts)
  },
  methods: {
    initCharts() {
      // CPU使用趋势 - 折线图
      this.charts.cpuUsage = this.initLineChart(
        this.$refs.cpuUsageChart,
        ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
        [3.5, 4.2, 5.8, 6.5, 4.8, 4.2],
        'CPU使用趋势'
      )

      // 内存使用趋势 - 折线图
      this.charts.memoryUsage = this.initLineChart(
        this.$refs.memoryUsageChart,
        ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
        [10.2, 11.5, 13.8, 14.5, 13.2, 12.3],
        '内存使用趋势'
      )

      // 磁盘IO - 柱状图
      this.charts.diskIo = this.initBarChart(
        this.$refs.diskIoChart,
        ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
        [120, 180, 250, 320, 280, 220],
        '磁盘IO'
      )

      // 网络流量 - 折线图
      this.charts.networkTraffic = this.initLineChart(
        this.$refs.networkTrafficChart,
        ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
        [0.8, 1.2, 1.5, 1.8, 1.6, 1.2],
        '网络流量'
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
              color: '#4caf50',
              width: 3
            },
            itemStyle: {
              color: '#4caf50',
              borderColor: '#fff',
              borderWidth: 2
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(76, 175, 80, 0.3)'
                },
                {
                  offset: 1,
                  color: 'rgba(76, 175, 80, 0.05)'
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
              color: '#2196f3',
              borderRadius: [4, 4, 0, 0]
            },
            emphasis: {
              itemStyle: {
                color: '#1976d2'
              }
            }
          }
        ]
      }
      chart.setOption(option)
      return chart
    },

    resizeCharts() {
      Object.values(this.charts).forEach(chart => chart.resize())
    }
  }
}
</script>

<style scoped>
.platform-monitoring {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: #f8f9fa;
  min-height: 100vh;
}

/* 顶部导航栏样式同DataOverview.vue */
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

/* 监控内容 */
.monitoring-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 指标网格 */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 15px;
}

.metric-item {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #e0e0e0;
}

.metric-label {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.metric-value {
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.metric-change {
  font-size: 0.85rem;
  color: #4caf50;
}

/* 卡片样式 */
.card {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card h3 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
}

/* 图表行容器 */
.charts-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
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
  
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  
  .charts-row {
    grid-template-columns: 1fr;
  }
}
</style>