<template>
  <div class="version-management">
    <!-- 页面标题 -->
    <h1 class="page-title">版本管理</h1>
    
    <!-- 搜索和筛选区域 -->
    <div class="search-filter">
      <div class="filter-item">
        <label>应用系统</label>
        <select v-model="filters.appSystem" class="form-select">
          <option value="">全部</option>
          <option value="应用发布系统">应用发布系统</option>
          <option value="应用发布管理系统">应用发布管理系统</option>
          <option value="餐饮系统">餐饮系统</option>
          <option value="业务运营门户">业务运营门户</option>
          <option value="HS开发新门户">HS开发新门户</option>
        </select>
      </div>
      
      <div class="filter-item">
        <label>环境</label>
        <select v-model="filters.environment" class="form-select">
          <option value="">全部</option>
          <option value="sit">sit</option>
          <option value="prod">prod</option>
        </select>
      </div>
      
      <div class="filter-item">
        <label>MD5值</label>
        <input type="text" v-model="filters.md5" placeholder="请输入MD5" class="form-input">
      </div>
      
      <div class="filter-item">
        <label>版本上传时间范围</label>
        <input type="date" v-model="filters.dateRange" class="form-input">
      </div>
      
      <div class="filter-item">
        <label>分片 ID</label>
        <select v-model="filters.shardId" class="form-select">
          <option value="">全部</option>
          <option value="1">1</option>
        </select>
      </div>
      
      <div class="filter-item">
        <label>状态</label>
        <select v-model="filters.status" class="form-select">
          <option value="">全部</option>
        </select>
      </div>
      
      <div class="filter-item">
        <label>结果范围</label>
        <select v-model="filters.resultRange" class="form-select">
          <option value="">全部</option>
        </select>
      </div>
      
      <button class="search-btn">查询</button>
    </div>
    
    <!-- 表格区域 -->
    <div class="table-container">
      <table class="version-table">
        <thead>
          <tr>
            <th @click="sortBy('index')" class="sortable">
              序号
              <span v-if="sortField === 'index'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th @click="sortBy('appName')" class="sortable">
              应用名称
              <span v-if="sortField === 'appName'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th @click="sortBy('uploader')" class="sortable">
              上传人
              <span v-if="sortField === 'uploader'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th @click="sortBy('environment')" class="sortable">
              环境
              <span v-if="sortField === 'environment'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th @click="sortBy('md5')" class="sortable">
              MD5值
              <span v-if="sortField === 'md5'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th @click="sortBy('uploadTime')" class="sortable">
              上传时间
              <span v-if="sortField === 'uploadTime'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedData" :key="index">
            <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td>{{ item.appName }}</td>
            <td>{{ item.uploader }}</td>
            <td>{{ item.environment }}</td>
            <td>{{ item.md5 }}</td>
            <td>{{ item.uploadTime }}</td>
          </tr>
        </tbody>
      </table>
      
      <!-- 分页控件 -->
      <div class="pagination">
        <span class="page-info">{{ totalItems }}页/</span>
        <div class="page-buttons">
          <button @click="goToPage(1)" :disabled="currentPage === 1">首页</button>
          <button 
            v-for="page in pageRange" 
            :key="page"
            @click="goToPage(page)"
            :class="{ active: page === currentPage }"
          >
            {{ page }}
          </button>
          <button @click="goToPage(totalPages)" :disabled="currentPage === totalPages">末页</button>
        </div>
        <span class="page-info">前往 1 页</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VersionManagement',
  data() {
    return {
      // 模拟版本数据
      versionData: [
        {
          appName: '应用发布系统',
          uploader: '应用发布管理系统',
          environment: 'sit',
          md5: 'fa46c4573fbea0020091269792e47c78',
          uploadTime: '2025-05-12 15:10:15'
        },
        {
          appName: '应用发布系统',
          uploader: '应用发布管理系统',
          environment: 'sit',
          md5: 'fa46c4573fbea0020091269792e47c78',
          uploadTime: '2025-05-12 17:47:28'
        },
        {
          appName: '应用发布系统',
          uploader: '应用发布管理系统',
          environment: 'sit',
          md5: 'e6e612b87cc88113a13a00300795386',
          uploadTime: '2025-05-18 12:11:21'
        },
        {
          appName: '应用发布系统',
          uploader: '应用发布管理系统',
          environment: 'sit',
          md5: 'e6e612b87cc88113a13a00300795386',
          uploadTime: '2025-05-19 16:49:30'
        },
        {
          appName: '应用发布系统',
          uploader: '应用发布管理系统',
          environment: 'sit',
          md5: 'fa46c4573fbea0020091269792e47c78',
          uploadTime: '2025-07-10 14:44:35'
        },
        {
          appName: '应用发布系统',
          uploader: '应用发布管理系统',
          environment: 'sit',
          md5: 'fa46c4573fbea0020091269792e47c78',
          uploadTime: '2025-07-10 14:44:35'
        },
        {
          appName: '餐饮系统(广州广百)',
          uploader: '应用发布管理系统',
          environment: 'sit',
          md5: '07d2b2205c8bce4060a298b7308f7107',
          uploadTime: '2025-08-19 16:29:13'
        },
        {
          appName: '餐饮系统(客户Demo)',
          uploader: '应用发布管理系统',
          environment: 'sit',
          md5: 'a5f9379ad03b372a0a6b777c22fdb',
          uploadTime: '2025-08-21 10:00:53'
        },
        {
          appName: '业务运营门户(前端-营销)',
          uploader: '应用发布管理系统',
          environment: 'sit',
          md5: '4a8efc1a10b42a6752e5e2d976751e',
          uploadTime: '2025-10-11 14:38:21'
        },
        {
          appName: 'HS开发新门户',
          uploader: '应用发布管理系统',
          environment: 'prod',
          md5: 'a13f815368e83e68c76787067a826',
          uploadTime: '2025-11-18 10:59:59'
        }
      ],
      filters: {
        appSystem: '',
        environment: '',
        md5: '',
        dateRange: '',
        shardId: '',
        status: '',
        resultRange: ''
      },
      sortField: '',
      sortOrder: 'asc',
      currentPage: 1,
      pageSize: 10
    }
  },
  computed: {
    // 计算总页数
    totalPages() {
      return Math.ceil(this.filteredData.length / this.pageSize)
    },
    // 计算总项目数
    totalItems() {
      return this.filteredData.length
    },
    // 过滤后的数据
    filteredData() {
      let filtered = [...this.versionData]
      
      // 应用系统过滤
      if (this.filters.appSystem) {
        filtered = filtered.filter(item => item.appName.includes(this.filters.appSystem))
      }
      
      // 环境过滤
      if (this.filters.environment) {
        filtered = filtered.filter(item => item.environment === this.filters.environment)
      }
      
      // MD5过滤
      if (this.filters.md5) {
        filtered = filtered.filter(item => item.md5.includes(this.filters.md5))
      }
      
      // 排序
      if (this.sortField) {
        filtered.sort((a, b) => {
          let valueA = a[this.sortField]
          let valueB = b[this.sortField]
          
          if (this.sortField === 'uploadTime') {
            valueA = new Date(valueA)
            valueB = new Date(valueB)
          }
          
          if (valueA < valueB) {
            return this.sortOrder === 'asc' ? -1 : 1
          }
          if (valueA > valueB) {
            return this.sortOrder === 'asc' ? 1 : -1
          }
          return 0
        })
      }
      
      return filtered
    },
    // 分页后的数据
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.filteredData.slice(startIndex, endIndex)
    },
    // 分页按钮范围
    pageRange() {
      const range = []
      const total = this.totalPages
      const current = this.currentPage
      
      // 显示当前页附近的页码
      const start = Math.max(1, current - 2)
      const end = Math.min(total, start + 4)
      
      for (let i = start; i <= end; i++) {
        range.push(i)
      }
      
      return range
    }
  },
  methods: {
    // 排序方法
    sortBy(field) {
      if (this.sortField === field) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortField = field
        this.sortOrder = 'asc'
      }
    },
    // 跳转到指定页面
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
      }
    }
  }
}
</script>

<style scoped>
.version-management {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.page-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.search-filter {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-item label {
  font-size: 14px;
  color: #666;
  white-space: nowrap;
}

.form-select,
.form-input {
  padding: 6px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  min-width: 120px;
}

.form-input {
  min-width: 150px;
}

.search-btn {
  padding: 6px 16px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-btn:hover {
  background-color: #66b1ff;
}

.table-container {
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.version-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.version-table th,
.version-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ebeef5;
}

.version-table th {
  background-color: #f5f7fa;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  user-select: none;
}

.version-table th.sortable:hover {
  background-color: #e6e8eb;
}

.sort-icon {
  margin-left: 5px;
  font-size: 12px;
  color: #909399;
}

.version-table tr:hover {
  background-color: #f5f7fa;
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
  .search-filter {
    flex-wrap: wrap;
  }
  
  .filter-item {
    flex: 1 1 200px;
  }
}

@media (max-width: 768px) {
  .version-table {
    font-size: 12px;
  }
  
  .version-table th,
  .version-table td {
    padding: 8px;
  }
  
  .form-select,
  .form-input {
    min-width: 100px;
    font-size: 12px;
  }
}
</style>