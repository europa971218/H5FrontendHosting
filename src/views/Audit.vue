<template>
  <div class="audit-page">
    <h1>操作审计</h1>
    
    <!-- 查询区 -->
    <div class="search-section">
      <div class="search-form">
        <div class="form-row">
          <div class="form-group">
            <label>平台</label>
            <select v-model="searchParams.platform" class="form-select">
              <option value="">全部</option>
              <option value="系统管理端">系统管理端</option>
              <option value="租户管理端">租户管理端</option>
              <option value="用户端">用户端</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>操作类型</label>
            <select v-model="searchParams.operationType" class="form-select">
              <option value="">全部</option>
              <option value="登录">登录</option>
              <option value="创建">创建</option>
              <option value="更新">更新</option>
              <option value="删除">删除</option>
              <option value="开关">开关</option>
              <option value="上传下载">上传下载</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>时间范围</label>
            <div class="date-range">
              <input 
                type="date" 
                v-model="searchParams.startDate" 
                class="form-input"
              >
              <span class="date-separator">至</span>
              <input 
                type="date" 
                v-model="searchParams.endDate" 
                class="form-input"
              >
            </div>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label>应用</label>
            <select v-model="searchParams.application" class="form-select">
              <option value="">全部</option>
              <option value="应用1">应用1</option>
              <option value="应用2">应用2</option>
              <option value="应用3">应用3</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>功能模块</label>
            <select v-model="searchParams.module" class="form-select">
              <option value="">全部</option>
              <option value="用户模块">用户模块</option>
              <option value="应用概况">应用概况</option>
              <option value="部署管理">部署管理</option>
              <option value="监控管理">监控管理</option>
              <option value="告警管理">告警管理</option>
              <option value="租户管理">租户管理</option>
              <option value="团队管理">团队管理</option>
              <option value="角色管理">角色管理</option>
              <option value="应用管理">应用管理</option>
              <option value="平台告警">平台告警</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>操作行为</label>
            <input 
              type="text" 
              v-model="searchParams.operation" 
              placeholder="请输入操作行为" 
              class="form-input"
            >
          </div>
        </div>
        
        <div class="search-actions">
          <button class="btn btn-primary" @click="search">查询</button>
          <button class="btn" @click="resetSearch">重置</button>
        </div>
      </div>
    </div>
    
    <!-- 表格区 -->
    <div class="table-section">
      <div class="table-container">
        <table class="audit-table">
          <thead>
            <tr>
              <th>操作时间</th>
              <th>操作用户</th>
              <th>IP</th>
              <th>平台</th>
              <th>应用</th>
              <th>功能模块</th>
              <th>操作类型</th>
              <th>操作行为</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in auditRecords" :key="record.id">
              <td>{{ formatDateTime(record.operationTime) }}</td>
              <td>{{ record.username }}</td>
              <td>{{ record.ip }}</td>
              <td>{{ record.platform }}</td>
              <td>{{ record.application || '-' }}</td>
              <td>{{ record.module }}</td>
              <td>
                <span class="operation-type-tag" :class="getOperationTypeClass(record.operationType)">
                  {{ record.operationType }}
                </span>
              </td>
              <td>{{ record.operation }}</td>
              <td>{{ record.description || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- 分页 -->
      <div class="pagination">
        <div class="page-info">
          共 {{ totalRecords }} 条记录，当前第 {{ currentPage }} / {{ totalPages }} 页
        </div>
        <div class="page-controls">
          <button 
            class="btn page-btn" 
            @click="prevPage" 
            :disabled="currentPage === 1"
          >
            上一页
          </button>
          <button 
            class="btn page-btn" 
            @click="nextPage" 
            :disabled="currentPage === totalPages"
          >
            下一页
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Audit',
  data() {
    return {
      // 搜索参数
      searchParams: {
        platform: '',
        operationType: '',
        startDate: this.getDateBefore(7), // 默认最近7天
        endDate: this.getToday(),
        application: '',
        module: '',
        operation: ''
      },
      
      // 表格数据
      auditRecords: [
        {
          id: 1,
          operationTime: '2024-11-26T10:30:00',
          username: 'sysadmin',
          ip: '192.168.1.1',
          platform: '系统管理端',
          application: '',
          module: '租户管理',
          operationType: '创建',
          operation: '创建租户',
          description: '创建了名为租户A的新租户'
        },
        {
          id: 2,
          operationTime: '2024-11-26T09:15:00',
          username: 'tenantadmin1',
          ip: '192.168.1.2',
          platform: '租户管理端',
          application: '应用1',
          module: '应用管理',
          operationType: '更新',
          operation: '编辑应用',
          description: '更新了应用1的基本信息'
        },
        {
          id: 3,
          operationTime: '2024-11-25T16:45:00',
          username: 'tenantuser1',
          ip: '192.168.1.3',
          platform: '用户端',
          application: '应用2',
          module: '部署管理',
          operationType: '上传下载',
          operation: '上传部署包',
          description: '上传了应用2的新版本部署包'
        },
        {
          id: 4,
          operationTime: '2024-11-25T14:20:00',
          username: 'sysadmin',
          ip: '192.168.1.1',
          platform: '系统管理端',
          application: '',
          module: '用户管理',
          operationType: '创建',
          operation: '新增用户',
          description: '创建了新的租户管理员用户'
        },
        {
          id: 5,
          operationTime: '2024-11-24T11:50:00',
          username: 'tenantuser2',
          ip: '192.168.1.4',
          platform: '用户端',
          application: '应用3',
          module: '监控管理',
          operationType: '开关',
          operation: '开启健康检查',
          description: '开启了应用3的健康检查功能'
        }
      ],
      
      // 分页参数
      currentPage: 1,
      pageSize: 20,
      totalRecords: 5,
      totalPages: 1
    }
  },
  
  created() {
    this.calculateTotalPages();
  },
  
  methods: {
    // 获取当前日期
    getToday() {
      const today = new Date();
      return today.toISOString().split('T')[0];
    },
    
    // 获取n天前的日期
    getDateBefore(days) {
      const date = new Date();
      date.setDate(date.getDate() - days);
      return date.toISOString().split('T')[0];
    },
    
    // 格式化日期时间
    formatDateTime(dateTime) {
      const date = new Date(dateTime);
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    },
    
    // 根据操作类型获取样式类
    getOperationTypeClass(type) {
      const typeMap = {
        '登录': 'login',
        '创建': 'create',
        '更新': 'update',
        '删除': 'delete',
        '开关': 'switch',
        '上传下载': 'upload'
      };
      return typeMap[type] || '';
    },
    
    // 搜索
    search() {
      console.log('搜索参数:', this.searchParams);
      // 这里可以添加实际的搜索逻辑，调用API获取数据
      // 模拟搜索结果
      this.auditRecords = this.auditRecords.filter(record => {
        let match = true;
        
        if (this.searchParams.platform && record.platform !== this.searchParams.platform) {
          match = false;
        }
        
        if (this.searchParams.operationType && record.operationType !== this.searchParams.operationType) {
          match = false;
        }
        
        if (this.searchParams.operation) {
          const operation = this.searchParams.operation.toLowerCase();
          if (!record.operation.toLowerCase().includes(operation)) {
            match = false;
          }
        }
        
        if (this.searchParams.module && record.module !== this.searchParams.module) {
          match = false;
        }
        
        // 时间范围过滤
        if (this.searchParams.startDate) {
          const recordDate = new Date(record.operationTime).toISOString().split('T')[0];
          if (recordDate < this.searchParams.startDate) {
            match = false;
          }
        }
        
        if (this.searchParams.endDate) {
          const recordDate = new Date(record.operationTime).toISOString().split('T')[0];
          if (recordDate > this.searchParams.endDate) {
            match = false;
          }
        }
        
        return match;
      });
      
      this.totalRecords = this.auditRecords.length;
      this.calculateTotalPages();
      this.currentPage = 1;
    },
    
    // 重置搜索
    resetSearch() {
      this.searchParams = {
        platform: '',
        operationType: '',
        startDate: this.getDateBefore(7),
        endDate: this.getToday(),
        application: '',
        module: '',
        operation: ''
      };
      this.search();
    },
    
    // 计算总页数
    calculateTotalPages() {
      this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    },
    
    // 上一页
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    
    // 下一页
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    }
  }
}
</script>

<style scoped>
.audit-page {
  max-width: 1200px;
  margin: 0 auto;
}

/* 搜索区样式 */
.search-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.form-group {
  flex: 1;
  min-width: 150px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.form-select,
.form-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-select:focus,
.form-input:focus {
  outline: none;
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.date-range {
  display: flex;
  align-items: center;
  gap: 8px;
}

.date-separator {
  color: #666;
  font-size: 14px;
}

.search-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

/* 表格区样式 */
.table-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.table-container {
  overflow-x: auto;
}

.audit-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.audit-table th,
.audit-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.audit-table th {
  background-color: #f5f5f5;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
}

.audit-table td {
  color: #666;
}

/* 操作类型标签样式 */
.operation-type-tag {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  color: white;
}

.operation-type-tag.login {
  background-color: #52c41a;
}

.operation-type-tag.create {
  background-color: #1890ff;
}

.operation-type-tag.update {
  background-color: #faad14;
}

.operation-type-tag.delete {
  background-color: #f5222d;
}

.operation-type-tag.switch {
  background-color: #722ed1;
}

.operation-type-tag.upload {
  background-color: #13c2c2;
}

/* 分页样式 */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

.page-info {
  color: #666;
  font-size: 14px;
}

.page-controls {
  display: flex;
  gap: 8px;
}

.page-btn {
  padding: 6px 12px;
  border: 1px solid #d9d9d9;
  background: white;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.page-btn:hover:not(:disabled) {
  border-color: #1890ff;
  color: #1890ff;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 按钮样式 */
.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #1890ff;
  color: white;
}

.btn-primary:hover {
  background-color: #40a9ff;
}

.btn:hover {
  opacity: 0.9;
}
</style>