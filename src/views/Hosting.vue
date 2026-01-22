<template>
  <div class="hosting">
    <!-- 顶部导航栏 -->
    <header class="top-nav">
      <div class="nav-tabs">
        <router-link to="/data-overview" class="tab">数据概览</router-link>
        <router-link to="/tenant-management" class="tab">租户管理</router-link>
        <router-link to="/user-management" class="tab">用户管理</router-link>
        <router-link to="/organization-management" class="tab">机构管理</router-link>
        <router-link to="/hosting" class="tab" :class="{ active: $route.path === '/hosting' }">托管管理</router-link>
        <router-link to="/platform-monitoring" class="tab">平台监控</router-link>
        <router-link to="/alert-center" class="tab">告警中心</router-link>
        <router-link to="/platform-logs" class="tab">平台日志</router-link>
        <router-link to="/operation-audit" class="tab">操作审计</router-link>
        <router-link to="/user-feedback" class="tab">用户反馈</router-link>
        <router-link to="/help-center" class="tab">帮助中心</router-link>
        <router-link to="/monitoring-management" class="tab">监控管理</router-link>
        <router-link to="/version-management" class="tab">版本管理</router-link>
        <router-link to="/link-management" class="tab" :class="{ active: $route.path === '/link-management' }">链路管理</router-link>
      </div>
    </header>

    <!-- 页面内容 -->
    <main class="content">
      <!-- 托管页面标题 -->
      <div class="section-header animate__animated animate__fadeInDown">
        <h2><font-awesome-icon icon="cubes" /> 托管管理</h2>
        <div class="header-actions">
          <button class="btn btn-primary" v-wave>
            <font-awesome-icon icon="plus" /> 新增应用
          </button>
          <button class="btn btn-secondary" v-wave>
            <font-awesome-icon icon="upload" /> 批量导入
          </button>
        </div>
      </div>

      <!-- 筛选区域 -->
      <div class="filters animate__animated animate__fadeInUp">
        <div class="filter-group">
          <label>应用名称</label>
          <input type="text" class="filter-input" placeholder="请输入应用名称">
        </div>
        <div class="filter-group">
          <label>应用状态</label>
          <select class="filter-select">
            <option>全部</option>
            <option>运行中</option>
            <option>已停止</option>
            <option>异常</option>
          </select>
        </div>
        <div class="filter-group">
          <label>应用类型</label>
          <select class="filter-select">
            <option>全部</option>
            <option>Web应用</option>
            <option>移动端应用</option>
            <option>API服务</option>
          </select>
        </div>
        <div class="filter-group">
          <label>创建时间</label>
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator=" - "
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            style="width: 200px"
          />
        </div>
        <div class="filter-group filter-actions">
          <button class="btn btn-search" v-wave>
            <font-awesome-icon icon="search" /> 搜索
          </button>
          <button class="btn btn-reset" v-wave>
            <font-awesome-icon icon="sync-alt" /> 重置
          </button>
        </div>
      </div>

      <!-- 数据表格 -->
      <div class="table-container animate__animated animate__fadeInUp">
        <table class="data-table">
          <thead>
            <tr>
              <th><input type="checkbox" class="select-all"></th>
              <th>应用名称</th>
              <th>应用ID</th>
              <th>应用类型</th>
              <th>状态</th>
              <th>创建时间</th>
              <th>最后更新</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="checkbox"></td>
              <td>银行APP</td>
              <td>APP001</td>
              <td>移动端应用</td>
              <td><span class="status status-running"><font-awesome-icon icon="play-circle" /> 运行中</span></td>
              <td>2025-12-01</td>
              <td>2026-01-22</td>
              <td>
                <button class="action-btn view" v-wave>
                  <font-awesome-icon icon="eye" /> 查看
                </button>
                <button class="action-btn edit" v-wave>
                  <font-awesome-icon icon="edit" /> 编辑
                </button>
                <button class="action-btn stop" v-wave>
                  <font-awesome-icon icon="stop-circle" /> 停止
                </button>
                <button class="action-btn delete" v-wave>
                  <font-awesome-icon icon="trash-alt" /> 删除
                </button>
              </td>
            </tr>
            <tr>
              <td><input type="checkbox"></td>
              <td>网银系统</td>
              <td>APP002</td>
              <td>Web应用</td>
              <td><span class="status status-running">运行中</span></td>
              <td>2025-12-05</td>
              <td>2026-01-21</td>
              <td>
                <button class="action-btn view">查看</button>
                <button class="action-btn edit">编辑</button>
                <button class="action-btn stop">停止</button>
                <button class="action-btn delete">删除</button>
              </td>
            </tr>
            <tr>
              <td><input type="checkbox"></td>
              <td>支付网关</td>
              <td>APP003</td>
              <td>API服务</td>
              <td><span class="status status-running">运行中</span></td>
              <td>2025-12-10</td>
              <td>2026-01-20</td>
              <td>
                <button class="action-btn view">查看</button>
                <button class="action-btn edit">编辑</button>
                <button class="action-btn stop">停止</button>
                <button class="action-btn delete">删除</button>
              </td>
            </tr>
            <tr>
              <td><input type="checkbox"></td>
              <td>数据分析系统</td>
              <td>APP004</td>
              <td>Web应用</td>
              <td><span class="status status-stopped">已停止</span></td>
              <td>2025-12-15</td>
              <td>2026-01-19</td>
              <td>
                <button class="action-btn view">查看</button>
                <button class="action-btn edit">编辑</button>
                <button class="action-btn start">启动</button>
                <button class="action-btn delete">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 分页 -->
      <div class="pagination">
        <div class="pagination-info">共 4 条记录</div>
        <div class="pagination-controls">
          <button class="page-btn prev">上一页</button>
          <button class="page-btn active">1</button>
          <button class="page-btn">2</button>
          <button class="page-btn next">下一页</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Hosting',
  data() {
    return {
      applications: [],
      dateRange: null // 日期范围
    }
  },
  mounted() {
    // 初始化数据
    this.loadApplications()
  },
  methods: {
    loadApplications() {
      // 模拟加载数据
      console.log('加载应用列表')
    }
  }
}
</script>

<style scoped>
.hosting {
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

/* 按钮样式 */
.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-left: 10px;
}

.btn-primary {
  background-color: #1e3c72;
  color: white;
}

.btn-primary:hover {
  background-color: #2a5298;
}

.btn-secondary {
  background-color: #f0f0f0;
  color: #333;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}

.btn-search {
  background-color: #4caf50;
  color: white;
}

.btn-search:hover {
  background-color: #45a049;
}

.btn-reset {
  background-color: #f0f0f0;
  color: #666;
  margin-left: 10px;
}

.btn-reset:hover {
  background-color: #e0e0e0;
}

/* 筛选区域 */
.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  align-items: center;
  background-color: white;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
  justify-content: space-between;
}

/* 筛选操作区域 */
.filter-actions {
  margin-left: auto;
  display: flex;
  gap: 10px;
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
  min-width: 150px;
}

/* 数据表格 */
.table-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

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

/* 状态标签 */
.status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-running {
  background-color: #e8f5e9;
  color: #4caf50;
}

.status-stopped {
  background-color: #f5f5f5;
  color: #9e9e9e;
}

.status-error {
  background-color: #ffebee;
  color: #f44336;
}

/* 操作按钮 */
.action-btn {
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  margin-right: 5px;
  transition: all 0.2s;
}

.action-btn.view {
  background-color: #e3f2fd;
  color: #2196f3;
}

.action-btn.edit {
  background-color: #fff3e0;
  color: #ff9800;
}

.action-btn.start {
  background-color: #e8f5e9;
  color: #4caf50;
}

.action-btn.stop {
  background-color: #ffebee;
  color: #f44336;
}

.action-btn.delete {
  background-color: #ffebee;
  color: #f44336;
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 15px 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px 20px;
}

.pagination-info {
  color: #666;
  font-size: 0.9rem;
}

.pagination-controls {
  display: flex;
  gap: 10px;
}

.page-btn {
  padding: 6px 12px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.page-btn:hover {
  background-color: #f0f0f0;
}

.page-btn.active {
  background-color: #1e3c72;
  color: white;
  border-color: #1e3c72;
}

.page-btn.prev,
.page-btn.next {
  padding: 6px 12px;
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
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .filters {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .filter-group {
    width: 100%;
  }
  
  .filter-select,
  .filter-input {
    width: 100%;
  }
  
  .table-container {
    overflow-x: auto;
  }
  
  .data-table {
    min-width: 800px;
  }
  
  .pagination {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
}
</style>