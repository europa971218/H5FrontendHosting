<template>
  <div class="kanban-container">
    <!-- 顶部欢迎信息 -->
    <div class="header-section">
      <div class="welcome-info">
        <div class="logo">
          <div class="logo-icon">💎</div>
        </div>
        <div class="welcome-text">
          <h2>早安，hanhan，祝你展翅高飞每一天！</h2>
          <p class="date-info">广东农信 最近登录时间: 2025-12-15 11:32:44</p>
        </div>
        <div class="app-count">
          <span>应用数</span>
          <span class="count">2</span>
        </div>
      </div>
    </div>

    <!-- 应用管理内容 -->
    <div class="content-section">
      <!-- 筛选和搜索 -->
      <div class="filter-section">
        <div class="filter-tabs">
          <div class="tabs">
            <span class="tab active">全部</span>
            <span class="tab dropdown">全部▼</span>
          </div>
        </div>
        <div class="filter-buttons">
          <button class="filter-btn">可通过分类查看管理的应用数量</button>
        </div>
        <div class="search-box">
          <input 
            type="text" 
            placeholder="请输入应用名称" 
            class="search-input"
          >
        </div>
      </div>

      <!-- 应用列表 -->
      <div class="apps-grid">
        <!-- 应用卡片 -->
        <div class="app-card" v-for="app in applications" :key="app.id">
          <div class="app-header">
            <div class="app-status">
              <span class="status-dot"></span>
              <span class="app-name">{{ app.name }}</span>
            </div>
          </div>
          
          <div class="app-features">
            <div class="feature-item">
              <div class="feature-icon">📊</div>
              <span class="feature-text">数据访问</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon">📧</div>
              <span class="feature-text">邮箱访问</span>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🔗</div>
              <span class="feature-text">接口访问</span>
            </div>
          </div>
          
          <div class="app-footer">
            <button class="manage-btn">管理应用</button>
          </div>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-if="applications.length === 0" class="empty-state">
        <p>没有更多数据</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppKanban',
  data() {
    return {
      applications: [
        {
          id: 1,
          name: '测试应用'
        },
        {
          id: 2,
          name: '访问验证'
        }
      ]
    }
  },
  methods: {
    fetchApplications() {
      // 这里可以添加实际的API调用逻辑
      console.log('获取应用列表');
    }
  },
  mounted() {
    this.fetchApplications();
  }
}
</script>

<style scoped>
.kanban-container {
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

.filter-tabs .tabs {
  display: flex;
  gap: 10px;
  align-items: center;
}

.filter-tabs .tab {
  padding: 6px 12px;
  background: #f5f7fa;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  border: 1px solid #e5e7eb;
}

.filter-tabs .tab.active {
  background: #ff6600;
  color: white;
  border-color: #ff6600;
}

.filter-tabs .tab.dropdown {
  position: relative;
}

.filter-buttons .filter-btn {
  padding: 8px 16px;
  background: #f5f7fa;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
}

.search-box .search-input {
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 14px;
  width: 200px;
}

/* 应用列表 */
.apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

/* 应用卡片 */
.app-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.app-header {
  display: flex;
  align-items: center;
}

.app-status {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #ff6600;
  border-radius: 50%;
}

.app-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

/* 应用功能 */
.app-features {
  display: flex;
  justify-content: space-around;
  gap: 10px;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  flex: 1;
  cursor: pointer;
  transition: all 0.2s;
}

.feature-item:hover {
  background: #f0f4f8;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 24px;
}

.feature-text {
  font-size: 14px;
  color: #666;
}

/* 应用底部 */
.app-footer {
  text-align: center;
}

.manage-btn {
  padding: 8px 16px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  width: 100%;
  transition: all 0.2s;
}

.manage-btn:hover {
  background: #f5f7fa;
  border-color: #d1d5db;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 40px 0;
  color: #9ca3af;
  font-size: 14px;
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
  
  .filter-tabs, .filter-buttons, .search-box {
    width: 100%;
  }
  
  .apps-grid {
    grid-template-columns: 1fr;
  }
}
</style>