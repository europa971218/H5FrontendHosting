<template>
  <div class="applications-container">
    <!-- 页面内容 -->
    <main class="content">
      <!-- 应用管理内容 -->
    
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
            <div class="table-wrapper">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>租户</th>
                    <th>产品线</th>
                    <th>产品</th>
                    <th>应用</th>
                    <th>应用 ID</th>
                    <th>创建时间</th>
                    <th>应用负责人</th>
                    <th>应用类型</th>
                    <th @click="appSortBy('accessType')" class="sortable">
                      访问类型
                      <span v-if="appSortField === 'accessType'" class="sort-icon">{{ appSortOrder === 'asc' ? '↑' : '↓' }}</span>
                    </th>
                    <th>用途</th>
                    <th @click="appSortBy('status')" class="sortable">
                      接入状态
                      <span v-if="appSortField === 'status'" class="sort-icon">{{ appSortOrder === 'asc' ? '↑' : '↓' }}</span>
                    </th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(app, index) in paginatedApps" :key="index">
                    <td>{{ app.tenant }}</td>
                    <td>{{ app.productLine }}</td>
                    <td>{{ app.product }}</td>
                    <td>{{ app.name }}</td>
                    <td>{{ app.id }}</td>
                    <td>{{ app.createTime }}</td>
                    <td>{{ app.owner }}</td>
                    <td>{{ app.type }}</td>
                    <td>{{ app.accessType }}</td>
                    <td>{{ app.purpose }}</td>
                    <td><span class="status-tag" :class="app.statusClass">{{ app.status }}</span></td>
                    <td>
                      <button class="btn btn-sm" @click="navigateToAppOverview">查看</button>
                      <button class="btn btn-sm">编辑</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- 分页控件 -->
            <div class="pagination">
              <el-pagination
                v-model:current-page="currentAppPage"
                v-model:page-size="appPageSize"
                :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalApps"
                @size-change="handleAppSizeChange"
                @current-change="handleAppCurrentChange"
              />
            </div>
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
      // 应用管理相关数据
      activeStatType: '月度统计',
      dateRange: ['2025-12', '2026-01'],
      charts: {},
      // 应用列表数据
      appData: [],
      loading: false,
      // 应用列表分页数据
      currentAppPage: 1,
      appPageSize: 10,
      jumpAppPage: 1,
      // 应用列表排序数据
      appSortField: '',
      appSortOrder: 'asc'
    }
  },
  computed: {
    // 应用列表计算属性
    totalApps() {
      return this.appData.length
    },
    totalAppPages() {
      return Math.ceil(this.totalApps / this.appPageSize)
    },
    paginatedApps() {
      // 先排序
      let sortedData = [...this.appData]
      if (this.appSortField) {
        sortedData.sort((a, b) => {
          let valueA = a[this.appSortField]
          let valueB = b[this.appSortField]
          
          if (valueA < valueB) {
            return this.appSortOrder === 'asc' ? -1 : 1
          }
          if (valueA > valueB) {
            return this.appSortOrder === 'asc' ? 1 : -1
          }
          return 0
        })
      }
      
      // 再分页
      const startIndex = (this.currentAppPage - 1) * this.appPageSize
      const endIndex = startIndex + this.appPageSize
      return sortedData.slice(startIndex, endIndex)
    },
    appPageRange() {
      const range = []
      const total = this.totalAppPages
      const current = this.currentAppPage
      
      // 显示当前页附近的页码
      const start = Math.max(1, current - 2)
      const end = Math.min(total, start + 4)
      
      for (let i = start; i <= end; i++) {
        range.push(i)
      }
      
      return range
    },

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
      if (this.$refs.appDeploymentChart) {
        this.charts.appDeployment = this.initLineChart(
          this.$refs.appDeploymentChart,
          isQuarterly ? ['2025-Q4', '2026-Q1'] : ['2025-12', '2026-01'],
          isQuarterly ? [150, 200] : [187, 203],
          '应用部署趋势'
        )
      }

      // 应用状态分布 - 饼图
      if (this.$refs.appStatusChart) {
        this.charts.appStatus = this.initPieChart(
          this.$refs.appStatusChart,
          ['运行中', '已停止', '部署中', '异常'],
          [65, 20, 10, 5],
          '应用状态分布'
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
    },

    // 应用列表分页方法
    handleAppSizeChange(size) {
      this.appPageSize = size
      this.currentAppPage = 1
    },
    handleAppCurrentChange(current) {
      this.currentAppPage = current
    },
    // 应用列表排序方法
    appSortBy(field) {
      if (this.appSortField === field) {
        this.appSortOrder = this.appSortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        this.appSortField = field
        this.appSortOrder = 'asc'
      }
    }
  },
  mounted() {
    // 设置JWT令牌到localStorage
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImNhb2hhbiIsInJvbGUiOiJzeXNhZG1pbiIsInRlbmFudElkIjpudWxsLCJpYXQiOjE3NzQ0OTYzNDIsImV4cCI6MTc3NDQ5OTk0Mn0.l4ON3KGnuXeQm5_VjOUqGST-VIJzVozjzYNRKPi9qpw'
    localStorage.setItem('token', token)
    console.log('Token set to localStorage:', token)
    
    this.loadApplications()
    this.initCharts()
    // 监听窗口大小变化，自动调整图表大小
    window.addEventListener('resize', this.resizeCharts)
  },
  methods: {
    async loadApplications() {
      this.loading = true
      try {
        console.log('Loading applications...')
        // 从后端API获取应用列表
        const token = localStorage.getItem('token')
        console.log('Token:', token)
        
        const response = await fetch('http://localhost:3005/api/hosting-apps', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + (token || 'test-token')
          }
        })
        console.log('Response status:', response.status)
        
        if (response.ok) {
          const data = await response.json()
          console.log('Loaded applications:', data)
          this.appData = data.map(app => ({
            tenant: app.tenantId,
            productLine: app.productLine,
            product: app.product,
            name: app.appName,
            id: app.appId,
            createTime: new Date(app.createdAt).toLocaleDateString(),
            owner: app.responsiblePerson,
            type: app.userType,
            accessType: app.accessType,
            purpose: this.getAppPurpose(app),
            status: (app.testEnv === '已移入' && app.productionEnv === '已移入') ? '已接入' : '未接入',
            statusClass: (app.testEnv === '已移入' && app.productionEnv === '已移入') ? 'active' : 'inactive'
          }))
        } else {
          console.error('Failed to load applications:', response.statusText)
          // 尝试获取详细错误信息
          try {
            const errorData = await response.json()
            console.error('Error data:', errorData)
          } catch (e) {
            console.error('Failed to parse error response:', e)
          }
        }
      } catch (error) {
        console.error('Error loading applications:', error)
      } finally {
        this.loading = false
      }
    },
    getAppPurpose(app) {
      // 根据应用类型和业务区域判断用途
      if (app.systemType === '金融应用') {
        return '金融服务'
      } else if (app.systemType === '测试应用') {
        return '测试用途'
      } else {
        return '企业管理'
      }
    }
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
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}

.nav-tabs {
  display: flex;
  gap: 10px;
  padding: 12px 0;
  justify-content: flex-start;
  align-items: center;
}

.tab {
  padding: 8px 14px;
  font-size: 0.8rem;
  color: #666;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
  white-space: nowrap;
  text-decoration: none;
  font-weight: 400;
}

.tab:hover {
  background-color: #f0f7ff;
  color: #1e3c72;
}

.tab.active {
  background-color: #1e3c72;
  color: white;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(30, 60, 114, 0.2);
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
  width: 100%;
  overflow-x: auto;
}

.table-wrapper {
  min-width: 1200px;
  width: 100%;
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

.data-table th.sortable {
  cursor: pointer;
  user-select: none;
}

.data-table th.sortable:hover {
  background-color: #e6e8eb;
}

.data-table th .sort-icon {
  margin-left: 5px;
  font-size: 12px;
  color: #909399;
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



/* 表格滚动容器 */
.table-container {
  overflow-x: auto;
  position: relative;
}

.table-wrapper {
  width: 100%;
  min-width: 1600px;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 15px;
  border-top: 1px solid #ebeef5;
  gap: 10px;
}

.page-info {
  font-size: 14px;
  color: #666;
}

.page-buttons {
  display: flex;
  gap: 5px;
}

.page-buttons button {
  padding: 4px 10px;
  border: 1px solid #dcdfe6;
  background-color: white;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.page-buttons button:hover:not(:disabled) {
  border-color: #409eff;
  color: #409eff;
}

.page-buttons button.active {
  background-color: #409eff;
  color: white;
  border-color: #409eff;
}

.page-buttons button:disabled {
  cursor: not-allowed;
  color: #c0c4cc;
  border-color: #ebeef5;
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
  
  .top-nav {
    position: relative;
  }
  
  .nav-tabs {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
    z-index: 1000;
    gap: 5px;
  }
  
  .top-nav::after {
    content: '☰';
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.5rem;
    cursor: pointer;
    color: #1e3c72;
  }
  
  .top-nav:hover .nav-tabs {
    display: flex;
  }
  
  .tab {
    padding: 10px 15px;
    font-size: 0.9rem;
    width: 100%;
    text-align: left;
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
