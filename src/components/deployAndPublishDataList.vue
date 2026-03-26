<template>
  <div class="search-filter-table">
    <!-- 搜索和筛选区域 -->
    <div class="search-filter">
      <div class="filter-item">
        <label>租户</label>
        <select v-model="localFilters.tenant" class="form-select">
          <option value="">全部</option>
          <option value="广东农信">广东农信</option>
        </select>
      </div>
      
      <div class="filter-item">
        <label>应用名称</label>
        <input type="text" v-model="localFilters.appName" placeholder="请输入应用名称" class="form-input">
      </div>
      
      <div class="filter-item">
        <label>统计周期</label>
        <input type="text" v-model="localFilters.statisticsPeriod" placeholder="如：2025-12" class="form-input">
      </div>
      
      <div class="filter-item">
        <label>应用标签</label>
        <input type="text" v-model="localFilters.appTags" placeholder="请输入应用标签" class="form-input">
      </div>
      
      <button class="search-btn" @click="handleSearch">查询</button>
    </div>
    
    <!-- 表格区域 -->
    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th @click="sortBy('index')" class="sortable">
              序号
              <span v-if="sortField === 'index'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th @click="sortBy('tenant')" class="sortable">
              租户
              <span v-if="sortField === 'tenant'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th @click="sortBy('appName')" class="sortable">
              应用
              <span v-if="sortField === 'appName'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th @click="sortBy('appId')" class="sortable">
              应用 ID
              <span v-if="sortField === 'appId'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th @click="sortBy('createdAt')" class="sortable">
              创建时间
              <span v-if="sortField === 'createdAt'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th @click="sortBy('totalDeployments')" class="sortable">
              总部署次数
              <span v-if="sortField === 'totalDeployments'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th @click="sortBy('manualDeployments')" class="sortable">
              手动部署次数
              <span v-if="sortField === 'manualDeployments'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th @click="sortBy('latestDeploymentTime')" class="sortable">
              最新部署时间
              <span v-if="sortField === 'latestDeploymentTime'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th @click="sortBy('rollbackCount')" class="sortable">
              回滚次数
              <span v-if="sortField === 'rollbackCount'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th @click="sortBy('configModifyCount')" class="sortable">
              修改部署配置次数
              <span v-if="sortField === 'configModifyCount'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th @click="sortBy('currentPackageVersions')" class="sortable">
              当前部署包版本数
              <span v-if="sortField === 'currentPackageVersions'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th @click="sortBy('statisticsPeriod')" class="sortable">
              统计周期
              <span v-if="sortField === 'statisticsPeriod'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th @click="sortBy('totalPackageSize')" class="sortable">
              部署包合计大小（GB）
              <span v-if="sortField === 'totalPackageSize'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th @click="sortBy('maxPackageSize')" class="sortable">
              最大部署包（MB）
              <span v-if="sortField === 'maxPackageSize'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th @click="sortBy('avgPackageSize')" class="sortable">
              部署包平均大小（MB）
              <span v-if="sortField === 'avgPackageSize'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
            <th @click="sortBy('appTags')" class="sortable">
              应用标签
              <span v-if="sortField === 'appTags'" class="sort-icon">{{ sortOrder === 'asc' ? '↑' : '↓' }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedData" :key="index">
            <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td>{{ item.tenant }}</td>
            <td>{{ item.appName }}</td>
            <td>{{ item.appId }}</td>
            <td>{{ item.createdAt }}</td>
            <td>{{ item.totalDeployments }}</td>
            <td>{{ item.manualDeployments }}</td>
            <td>{{ item.latestDeploymentTime }}</td>
            <td>{{ item.rollbackCount }}</td>
            <td>{{ item.configModifyCount }}</td>
            <td>{{ item.currentPackageVersions }}</td>
            <td>{{ item.statisticsPeriod }}</td>
            <td>{{ item.totalPackageSize }}</td>
            <td>{{ item.maxPackageSize }}</td>
            <td>{{ item.avgPackageSize }}</td>
            <td>{{ item.appTags }}</td>
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
  name: 'SearchFilterTable',
  props: {
    // 数据源
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      localFilters: {
        tenant: '',
        appName: '',
        statisticsPeriod: '',
        appTags: ''
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
      let filtered = [...this.data]
      
      // 租户过滤
      if (this.localFilters.tenant) {
        filtered = filtered.filter(item => item.tenant === this.localFilters.tenant)
      }
      
      // 应用名称过滤
      if (this.localFilters.appName) {
        filtered = filtered.filter(item => item.appName.includes(this.localFilters.appName))
      }
      
      // 统计周期过滤
      if (this.localFilters.statisticsPeriod) {
        filtered = filtered.filter(item => item.statisticsPeriod === this.localFilters.statisticsPeriod)
      }
      
      // 应用标签过滤
      if (this.localFilters.appTags) {
        filtered = filtered.filter(item => item.appTags.includes(this.localFilters.appTags))
      }
      
      // 排序
      if (this.sortField) {
        filtered.sort((a, b) => {
          let valueA = a[this.sortField]
          let valueB = b[this.sortField]
          
          // 处理日期类型
          if (this.sortField === 'createdAt' || this.sortField === 'latestDeploymentTime') {
            valueA = new Date(valueA)
            valueB = new Date(valueB)
          }
          // 处理数字类型
          if (typeof valueA === 'number' && typeof valueB === 'number') {
            valueA = Number(valueA)
            valueB = Number(valueB)
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
    },
    // 处理搜索
    handleSearch() {
      // 可以在这里添加搜索逻辑
      this.currentPage = 1
    }
  }
}
</script>

<style scoped>
.search-filter-table {
  width: 100%;
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
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;
}

/* 自定义滚动条样式 */
.table-container::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.table-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.table-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.table-container::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 确保表格在容器内正确显示 */
.data-table {
  min-width: 1200px;
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.data-table th,
.data-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ebeef5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.data-table th {
  background-color: #f5f7fa;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  user-select: none;
  white-space: normal;
  line-height: 1.4;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 80px;
  vertical-align: middle;
}

.data-table th.sortable:hover {
  background-color: #e6e8eb;
}

.sort-icon {
  margin-left: 5px;
  font-size: 12px;
  color: #909399;
}

.data-table tr:hover {
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
  .data-table {
    font-size: 12px;
  }
  
  .data-table th,
  .data-table td {
    padding: 8px;
  }
  
  .form-select,
  .form-input {
    min-width: 100px;
    font-size: 12px;
  }
}
</style>