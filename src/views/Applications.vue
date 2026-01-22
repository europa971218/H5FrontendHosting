<template>
  <div class="applications-container">
    <!-- 顶部欢迎信息 -->
    <div class="header-section">
      <div class="welcome-info">
        <div class="logo">
          <div class="logo-icon">💎</div>
        </div>
        <div class="welcome-text">
          <h2>早安，hanhan，祝你展翅高飞每一天！</h2>
          <p class="date-info">广东农信 最近登录时间:2025-12-15 11:32:44</p>
        </div>
        <div class="app-count">
          <span>应用数</span>
          <span class="count">1</span>
        </div>
      </div>
    </div>

    <!-- 应用管理内容 -->
    <div class="content-section">
      <!-- 筛选和搜索 -->
      <div class="filter-section">
        <div class="filter-tabs">
          <el-tabs v-model="activeTab">
            <el-tab-pane label="全部" name="all"></el-tab-pane>
            <el-tab-pane label="全量" name="full"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="filter-buttons">
          <el-button size="small">可对外分发下载的应用数量</el-button>
        </div>
        <div class="search-box">
          <el-input 
            placeholder="请输入应用名称" 
            v-model="searchKeyword"
            clearable
            size="small"
          >
            <template #append>
              <el-button size="small" type="primary">搜索</el-button>
            </template>
          </el-input>
        </div>
      </div>

      <!-- 应用列表 -->
      <div class="apps-list">
        <div class="app-card">
          <div class="app-info">
            <div class="app-icon">
              <el-icon class="icon"><i-ep-document-copy /></el-icon>
            </div>
            <div class="app-details">
              <h3 class="app-name">访问验证</h3>
              <div class="app-meta">
                <span class="meta-item">需求类型：业务功能</span>
                <span class="meta-item status status-normal">状态：正常</span>
              </div>
            </div>
          </div>
          <div class="app-actions">
            <el-button size="small" type="primary" style="background-color: #ff6600; border-color: #ff6600;" @click="navigateToAppOverview">
              查看详情
            </el-button>
            <el-button size="small">新增访问</el-button>
          </div>
        </div>
      </div>
      
      <!-- 应用托管入口 -->
      <div class="hosting-entry">
        <el-button type="primary" @click="navigateToHosting">
          进入应用托管视图
        </el-button>
      </div>

      <!-- 空状态 -->
      <div v-if="applications.length === 0" class="empty-state">
        <el-empty description="没有更多数据" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Applications',
  data() {
    return {
      activeTab: 'all',
      searchKeyword: '',
      applications: [
        {
          id: 1,
          name: '访问验证',
          type: '业务功能',
          status: 'normal'
        }
      ]
    }
  },
  methods: {
    // 可以添加获取应用列表的方法
    fetchApplications() {
      // 这里可以添加实际的API调用逻辑
      console.log('获取应用列表');
    },
    // 导航到应用托管视图
    navigateToHosting() {
      this.$router.push('/hosting');
    },
    // 导航到应用概况页面
    navigateToAppOverview() {
      this.$router.push('/app-overview');
    }
  },
  mounted() {
    this.fetchApplications();
  }
}
</script>

<style scoped>
.applications-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 顶部欢迎信息 */
.header-section {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.welcome-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  margin-right: 20px;
}

.logo-icon {
  font-size: 40px;
  color: #ff6600;
}

.welcome-text h2 {
  margin: 0 0 5px 0;
  font-size: 18px;
  color: #333;
}

.date-info {
  margin: 0;
  font-size: 12px;
  color: #666;
}

.app-count {
  text-align: right;
  color: #666;
  font-size: 14px;
}

.app-count .count {
  display: block;
  font-size: 24px;
  font-weight: bold;
  color: #ff6600;
}

/* 内容区域 */
.content-section {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

/* 筛选区域 */
.filter-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-tabs {
  flex: 0 0 auto;
}

.filter-buttons {
  flex: 1;
  text-align: center;
}

.search-box {
  flex: 0 0 auto;
  width: 250px;
}

/* 应用列表 */
.apps-list {
  margin-bottom: 20px;
}

.app-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 1px solid #e5e7eb;
}

.app-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.app-icon {
  margin-right: 20px;
  padding: 10px;
  background: #ff6600;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-icon .icon {
  font-size: 24px;
}

.app-details {
  flex: 1;
}

.app-name {
  margin: 0 0 10px 0;
  font-size: 16px;
  color: #333;
}

.app-meta {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #666;
}

.status {
  display: flex;
  align-items: center;
}

.status-normal::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  margin-right: 5px;
}

.app-actions {
  display: flex;
  gap: 10px;
}

/* 应用托管入口 */
.hosting-entry {
  margin-top: 20px;
  text-align: center;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 40px 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .welcome-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .app-count {
    align-self: flex-end;
  }
  
  .filter-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-tabs,
  .filter-buttons,
  .search-box {
    width: 100%;
  }
  
  .app-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  
  .app-actions {
    align-self: stretch;
    justify-content: flex-end;
  }
  
  .app-meta {
    flex-direction: column;
    gap: 5px;
  }
}
</style>
