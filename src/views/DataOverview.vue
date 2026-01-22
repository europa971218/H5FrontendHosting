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
      <!-- 操作审计内容 -->
      <div v-if="$route.path === '/operation-audit' || $route.path === '/audit'">
        <h2>操作审计</h2>
        
        <!-- 查询区 -->
        <div class="search-section">
          <div class="search-form">
            <div class="form-row">
              <div class="form-group">
                <label>平台</label>
                <select v-model="auditSearchParams.platform" class="form-select">
                  <option value="">全部</option>
                  <option value="系统管理端">系统管理端</option>
                  <option value="租户管理端">租户管理端</option>
                  <option value="用户端">用户端</option>
                </select>
              </div>
              
              <div class="form-group">
                <label>操作类型</label>
                <select v-model="auditSearchParams.operationType" class="form-select">
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
                    v-model="auditSearchParams.startDate" 
                    class="form-input"
                  >
                  <span class="date-separator">至</span>
                  <input 
                    type="date" 
                    v-model="auditSearchParams.endDate" 
                    class="form-input"
                  >
                </div>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label>应用</label>
                <select v-model="auditSearchParams.application" class="form-select">
                  <option value="">全部</option>
                  <option value="应用1">应用1</option>
                  <option value="应用2">应用2</option>
                  <option value="应用3">应用3</option>
                </select>
              </div>
              
              <div class="form-group">
                <label>功能模块</label>
                <select v-model="auditSearchParams.module" class="form-select">
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
                  v-model="auditSearchParams.operation" 
                  placeholder="请输入操作行为" 
                  class="form-input"
                >
              </div>
            </div>
            
            <div class="search-actions">
              <button class="btn btn-primary" @click="auditSearch">查询</button>
              <button class="btn" @click="resetAuditSearch">重置</button>
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
              共 {{ auditTotalRecords }} 条记录，当前第 {{ auditCurrentPage }} / {{ auditTotalPages }} 页
            </div>
            <div class="page-controls">
              <button 
                class="btn page-btn" 
                @click="auditPrevPage" 
                :disabled="auditCurrentPage === 1"
              >
                上一页
              </button>
              <button 
                class="btn page-btn" 
                @click="auditNextPage" 
                :disabled="auditCurrentPage === auditTotalPages"
              >
                下一页
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 数据概览内容 -->
      <div v-else>
      <!-- 数据概览标题 -->
      <div class="section-header animate__animated animate__fadeInDown">
        <h2><font-awesome-icon icon="chart-line" /> 数据概览</h2>
        <!-- 新增导航 -->
        <div class="data-nav">
          <span class="nav-item" :class="{ active: activeNav === '应用运营' }" @click="switchNav('应用运营')" v-wave>
            <font-awesome-icon icon="cubes" /> 应用运营
          </span>
          <span class="nav-item" :class="{ active: activeNav === '资源使用' }" @click="switchNav('资源使用')" v-wave>
            <font-awesome-icon icon="server" /> 资源使用
          </span>
        </div>
      </div>

      <!-- 应用运营内容 -->
      <div v-if="activeNav === '应用运营'">
        <!-- 统计类型切换 -->
      <div class="stat-type">
        <button class="stat-btn" :class="{ active: activeStatType1 === '月度统计' }" @click="changeStatType(1, '月度统计')">月度统计</button>
        <button class="stat-btn" :class="{ active: activeStatType1 === '季度统计' }" @click="changeStatType(1, '季度统计')">季度统计</button>
        <div class="filter-group" style="margin-left: auto;">
          <label>统计周期</label>
          <el-date-picker
            v-model="dateRange1"
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

        <!-- 应用请求数/部署导航 -->
        <div class="app-nav">
          <h3>应用请求数/部署</h3>
          <div class="stat-type">
          <button class="stat-btn" :class="{ active: activeStatType2 === '月度统计' }" @click="changeStatType(2, '月度统计')">月度统计</button>
          <button class="stat-btn" :class="{ active: activeStatType2 === '季度统计' }" @click="changeStatType(2, '季度统计')">季度统计</button>
          <div class="filter-group" style="margin-left: auto;">
            <label>统计周期</label>
            <el-date-picker
              v-model="dateRange2"
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
        </div>

        <!-- 图表区域4：资源统计 -->
        <div class="charts-row">
          <div class="chart-card">
            <h3>应用请求数</h3>
            <div class="chart-container" ref="ossCapacityChart"></div>
          </div>

          <div class="chart-card">
            <h3>应用告警次数</h3>
            <div class="chart-container" ref="platformAlertChart"></div>
          </div>
        </div>

        <!-- 图表区域5：应用统计 -->
        <div class="charts-row">
          <div class="chart-card">
            <h3>应用部署次数</h3>
            <div class="chart-container" ref="appRequestsChart"></div>
          </div>

          <div class="chart-card">
            <h3>应用异常拦截次数</h3>
            <div class="chart-container" ref="appAlertChart"></div>
          </div>
        </div>

        <!-- 应用部署次数排名TOP30（当季） -->
        <div class="card">
          <h3>应用部署次数排名top30（当季）</h3>
          <div class="chart-container" ref="deployRankingChart" style="height: 400px;"></div>
        </div>

        <!-- 应用部署包大小TOP10 -->
        <div class="card">
          <h3>应用部署包大小TOP10</h3>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>app_id</th>
                  <th>应用名</th>
                  <th>部署包合计大小（GB）</th>
                  <th>部署包平均大小（MB）</th>
                  <th>最大部署包（MB）</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1,906,877,333,060,034,561</td>
                  <td>电子管理平台 web 端</td>
                  <td>2.6526</td>
                  <td>135.8155</td>
                  <td>164.6648</td>
                </tr>
                <tr>
                  <td>1,914,260,039,585,026,049</td>
                  <td>代发薪-企业端</td>
                  <td>1.9278</td>
                  <td>130.9131</td>
                  <td>130.9131</td>
                </tr>
                <tr>
                  <td>1,928,369,597,602,971,650</td>
                  <td>代发薪-企业端（内网）</td>
                  <td>1.1278</td>
                  <td>130.9131</td>
                  <td>130.9131</td>
                </tr>
                <tr>
                  <td>1,978,291,280,274,882,561</td>
                  <td>共享1016应用</td>
                  <td>0.751</td>
                  <td>76.8938</td>
                  <td>76.8938</td>
                </tr>
                <tr>
                  <td>1,978,291,103,929,565,186</td>
                  <td>隔离1016应用</td>
                  <td>0.510</td>
                  <td>76.8938</td>
                  <td>76.8938</td>
                </tr>
                <tr>
                  <td>1,777,993,453,115,809,794</td>
                  <td>H5开发者门户</td>
                  <td>0.4255</td>
                  <td>67.2582</td>
                  <td>76.8938</td>
                </tr>
                <tr>
                  <td>1,763,454,466,780,610,561</td>
                  <td>悦农生活-运营端</td>
                  <td>0.3818</td>
                  <td>21.3903</td>
                  <td>65.6667</td>
                </tr>
                <tr>
                  <td>1,813,479,074,938,081,281</td>
                  <td>悦农缴费商户端</td>
                  <td>0.2785</td>
                  <td>57.2349</td>
                  <td>57.5867</td>
                </tr>
                <tr>
                  <td>1,813,865,429,803,307,009</td>
                  <td>悦农生活-商户端 PC</td>
                  <td>0.1812</td>
                  <td>31.9928</td>
                  <td>56.3226</td>
                </tr>
                <tr>
                  <td>1,813,479,074,938,081,281</td>
                  <td>效能工具</td>
                  <td>0.0585</td>
                  <td>7.2349</td>
                  <td>17.5867</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- 资源使用内容 -->
      <div v-else-if="activeNav === '资源使用'">
        <!-- 统计类型切换 -->
        <div class="stat-type">
          <button class="stat-btn" :class="{ active: activeStatType3 === '月度统计' }" @click="changeStatType(3, '月度统计')">月度统计</button>
          <button class="stat-btn" :class="{ active: activeStatType3 === '季度统计' }" @click="changeStatType(3, '季度统计')">季度统计</button>
          <div class="filter-group" style="margin-left: auto;">
            <label>统计周期</label>
            <el-date-picker
              v-model="dateRange3"
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

        <!-- 平台资源使用情况表格 -->
        <div class="card">
          <h3>资源使用情况</h3>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>IP</th>
                  <th colspan="3">CPU</th>
                  <th colspan="3">MEM</th>
                  <th colspan="3">磁盘</th>
                </tr>
                <tr>
                  <th></th>
                  <th>2025-11</th>
                  <th>2025-12</th>
                  <th>2026-01</th>
                  <th>2025-11</th>
                  <th>2025-12</th>
                  <th>2026-01</th>
                  <th>2025-11</th>
                  <th>2025-12</th>
                  <th>2026-01</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>96.0.188.175</td>
                  <td>7%</td>
                  <td>7%</td>
                  <td>8%</td>
                  <td>1.5G/4G</td>
                  <td>1.5G/4G</td>
                  <td>1.5G/4G</td>
                  <td>6%</td>
                  <td>6%</td>
                  <td>6%</td>
                </tr>
                <tr>
                  <td>96.0.188.178</td>
                  <td>10%</td>
                  <td>10%</td>
                  <td>10%</td>
                  <td>1.6G/4G</td>
                  <td>1.6G/4G</td>
                  <td>1.6G/4G</td>
                  <td>5%</td>
                  <td>5%</td>
                  <td>6%</td>
                </tr>
                <tr>
                  <td>96.0.188.206</td>
                  <td>5%</td>
                  <td>6%</td>
                  <td>5%</td>
                  <td>2.1G/4G</td>
                  <td>2.2G/4G</td>
                  <td>2.3G/4G</td>
                  <td>13%</td>
                  <td>13%</td>
                  <td>13%</td>
                </tr>
                <tr>
                  <td>96.0.188.219</td>
                  <td></td>
                  <td>17%</td>
                  <td></td>
                  <td>1.2G/6G</td>
                  <td></td>
                  <td></td>
                  <td>10%</td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 图表区域：OSS使用容量和平台告警次数 -->
        <div class="charts-row">
          <div class="chart-card">
            <h3>OSS使用容量</h3>
            <div class="chart-container" ref="ossCapacityChart2" style="height: 250px;"></div>
          </div>

          <div class="chart-card">
            <h3>平台告警次数</h3>
            <div class="chart-container" ref="platformAlertChart2" style="height: 250px;"></div>
          </div>
        </div>

        <!-- 资源节省情况 -->
        <div class="card">
          <h3>资源节省情况</h3>
          
          <!-- 物力资源节省 -->
          <div class="resource-section">
            <h4>物力资源节省</h4>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>资源类型</th>
                    <th>接入前数量</th>
                    <th>接入后数量</th>
                    <th>节省数量</th>
                    <th>节省率</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>服务器</td>
                    <td>64台</td>
                    <td>24台</td>
                    <td>40台</td>
                    <td>62.50%</td>
                  </tr>
                  <tr>
                    <td>中间件</td>
                    <td>64个</td>
                    <td>24个</td>
                    <td>40个</td>
                    <td>62.50%</td>
                  </tr>
                  <tr>
                    <td>对象存储</td>
                    <td>2800G</td>
                    <td>300G</td>
                    <td>2500G</td>
                    <td>89.28%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 人力资源节省 -->
          <div class="resource-section">
            <h4>人力资源节省</h4>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>类别</th>
                    <th>资源类型</th>
                    <th>节省数量</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>省人</td>
                    <td>当季节省人力（租户端）</td>
                    <td>866工时</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
      charts: {},
      // 日期范围
      dateRange1: ['2025-05', '2025-06'], // 应用运营月度
      dateRange2: ['2025-12', '2026-01'], // 应用运营请求/部署月度
      dateRange3: ['2025-11', '2026-01'], // 资源使用月度
      // 统计类型：月度统计/季度统计
      activeStatType1: '月度统计', // 应用运营统计类型
      activeStatType2: '月度统计', // 应用运营请求/部署统计类型
      activeStatType3: '月度统计', // 资源使用统计类型
      // 当前激活的导航项
      activeNav: '应用运营',
      // 后端数据
      backendData: {
        applicationStats: null,
        deploymentRank: null,
        packageSizeRank: null,
        platformMonitoring: null,
        resourceUsage: null
      },
      
      // 操作审计相关数据
      auditSearchParams: {
        platform: '',
        operationType: '',
        startDate: this.getDateBefore(7), // 默认最近7天
        endDate: this.getToday(),
        application: '',
        module: '',
        operation: ''
      },
      
      // 操作审计表格数据
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
      
      // 操作审计分页参数
      auditCurrentPage: 1,
      auditPageSize: 20,
      auditTotalRecords: 5,
      auditTotalPages: 1
    }
  },
  mounted() {
    this.fetchDataFromBackend()
    // 监听窗口大小变化，自动调整图表大小
    window.addEventListener('resize', this.resizeCharts)
  },
  beforeUnmount() {
    // 清理图表实例
    Object.values(this.charts).forEach(chart => chart.dispose())
    window.removeEventListener('resize', this.resizeCharts)
  },
  methods: {
    // 从后端获取数据
    async fetchDataFromBackend() {
      try {
        // 调用后端API获取数据概览
        const response = await fetch('http://localhost:3003/api/data/overview')
        if (response.ok) {
          const result = await response.json()
          if (result.success) {
            this.backendData = result.data
            this.initCharts() // 数据获取成功后初始化图表
          }
        }
      } catch (error) {
        console.error('Failed to fetch data from backend:', error)
      }
    },
    initCharts() {
      // 清理现有的图表实例
      Object.values(this.charts).forEach(chart => chart.dispose())
      this.charts = {}

      if (this.activeNav === '应用运营') {
        // 获取当前统计类型和日期范围
        const isQuarterly1 = this.activeStatType1 === '季度统计'
        const isQuarterly2 = this.activeStatType2 === '季度统计'
        
        // 使用后端数据或默认值
        const appStats = this.backendData.applicationStats || {
          requests: { trend: [{ date: '2025-05', value: 188.5 }, { date: '2025-06', value: 140.0 }] },
          alerts: { trend: [{ date: '2025-05', value: 3 }, { date: '2025-06', value: 0 }] },
          deployments: { trend: [{ date: '2025-05', value: 187183 }, { date: '2025-06', value: 20297 }] },
          exceptions: { trend: [{ date: '2025-05', value: 0.1 }, { date: '2025-06', value: 0.1 }] }
        }
        
        const deploymentRank = this.backendData.deploymentRank || Array.from({ length: 30 }, (_, i) => ({
          rank: i + 1,
          applicationName: `应用${String.fromCharCode(65 + Math.floor(i / 5))}${i + 1}`,
          deployments: Math.floor(Math.random() * 50) + 5
        }))
        
        // 托管用户(新增) - 折线图
        this.charts.newUsers = this.initLineChart(
          this.$refs.newUsersChart,
          isQuarterly1 ? ['2025-Q2', '2025-Q3'] : ['2025-05', '2025-06'],
          isQuarterly1 ? [35, 18] : [22, 2],
          '托管用户(新增)'
        )

        // 托管用户(累计) - 柱状图
        this.charts.totalUsers = this.initBarChart(
          this.$refs.totalUsersChart,
          isQuarterly1 ? ['2025-Q2', '2025-Q3'] : ['2025-05', '2025-06'],
          isQuarterly1 ? [105, 115] : [113, 113],
          '托管用户(累计)'
        )

        // 托管应用(新增) - 折线图
        this.charts.newApps = this.initLineChart(
          this.$refs.newAppsChart,
          isQuarterly1 ? ['2025-Q2', '2025-Q3'] : ['2025-12', '2026-01'],
          isQuarterly1 ? [15, 8] : [9, 0],
          '托管应用(新增)'
        )

        // 托管应用(累计) - 柱状图
        this.charts.totalApps = this.initBarChart(
          this.$refs.totalAppsChart,
          isQuarterly1 ? ['2025-Q2', '2025-Q3'] : ['2025-12', '2026-01'],
          isQuarterly1 ? [175, 185] : [181, 181],
          '托管应用(累计)'
        )

        // 托管应用活跃度 - 多系列柱状图
        this.charts.appActivity = this.initMultiBarChart(
          this.$refs.appActivityChart,
          isQuarterly1 ? ['2025-Q2', '2025-Q3'] : ['2025-12', '2026-01'],
          [
            { name: '活跃应用', data: isQuarterly1 ? [55, 65] : [60, 62], color: '#ff5722' },
            { name: '普通应用', data: isQuarterly1 ? [80, 85] : [85, 78], color: '#ff9800' },
            { name: '僵尸应用', data: isQuarterly1 ? [45, 58] : [50, 55], color: '#f59e0b' }
          ],
          '托管应用活跃度'
        )

        // 应用请求数 - 柱状图
        this.charts.ossCapacity = this.initBarChart(
          this.$refs.ossCapacityChart,
          appStats.requests.trend.map(item => item.date),
          appStats.requests.trend.map(item => item.value),
          '应用请求数'
        )

        // 应用告警次数 - 折线图
        this.charts.platformAlert = this.initLineChart(
          this.$refs.platformAlertChart,
          appStats.alerts.trend.map(item => item.date),
          appStats.alerts.trend.map(item => item.value),
          '应用告警次数'
        )

        // 应用部署次数 - 柱状图
        this.charts.appRequests = this.initBarChart(
          this.$refs.appRequestsChart,
          appStats.deployments.trend.map(item => item.date),
          appStats.deployments.trend.map(item => item.value),
          '应用部署次数'
        )

        // 应用异常拦截次数 - 折线图
        this.charts.appAlert = this.initLineChart(
          this.$refs.appAlertChart,
          appStats.exceptions.trend.map(item => item.date),
          appStats.exceptions.trend.map(item => item.value),
          '应用异常拦截次数'
        )

        // 应用部署次数排名TOP30（当季） - 水平柱状图
        this.charts.deployRanking = this.initHorizontalBarChart(
          this.$refs.deployRankingChart,
          deploymentRank.map(item => item.applicationName),
          deploymentRank.map(item => item.deployments),
          '应用部署次数排名top30（当季）'
        )
      } else if (this.activeNav === '资源使用') {
        // 获取当前统计类型
        const isQuarterly = this.activeStatType3 === '季度统计'
        
        // 使用后端数据或默认值
        const resourceUsage = this.backendData.resourceUsage || {
          trend: [{ time: '2025-11', cpu: 0 }, { time: '2025-12', cpu: 0 }, { time: '2026-01', cpu: 0 }]
        }
        
        // OSS使用容量 - 折线图
        this.charts.ossCapacity2 = this.initLineChart(
          this.$refs.ossCapacityChart2,
          isQuarterly ? ['2025-Q4', '2026-Q1'] : resourceUsage.trend.map(item => item.time),
          isQuarterly ? [0.5, 1.2] : resourceUsage.trend.map(item => item.cpu),
          'OSS使用容量'
        )

        // 平台告警次数 - 折线图
        this.charts.platformAlert2 = this.initLineChart(
          this.$refs.platformAlertChart2,
          isQuarterly ? ['2025-Q4', '2026-Q1'] : resourceUsage.trend.map(item => item.time),
          isQuarterly ? [15000, 5000] : resourceUsage.trend.map(item => item.memory ? item.memory * 1000 : 0),
          '平台告警次数'
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

    // 初始化水平柱状图
    initHorizontalBarChart(dom, categories, data, title) {
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
          left: '10%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
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
        yAxis: {
          type: 'category',
          data: categories,
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666',
            fontSize: 10,
            width: 120,
            overflow: 'truncate',
            formatter: function(value) {
              return value.length > 12 ? value.substring(0, 12) + '...' : value;
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
              borderRadius: [0, 4, 4, 0]
            },
            emphasis: {
              itemStyle: {
                color: '#f4511e'
              }
            },
            label: {
              show: true,
              position: 'right',
              color: '#666',
              fontSize: 10
            }
          }
        ]
      }
      chart.setOption(option)
      return chart
    },

    // 切换导航
    switchNav(nav) {
      this.activeNav = nav
      // 等待DOM更新后再初始化图表
      this.$nextTick(() => {
        this.initCharts()
      })
    },

    // 切换统计类型
    changeStatType(statTypeIndex, statType) {
      // 更新对应的统计类型状态
      if (statTypeIndex === 1) {
        this.activeStatType1 = statType
      } else if (statTypeIndex === 2) {
        this.activeStatType2 = statType
      } else if (statTypeIndex === 3) {
        this.activeStatType3 = statType
      }

      // 根据统计类型更新对应的日期范围
      if (statType === '季度统计') {
        if (statTypeIndex === 1) {
          this.dateRange1 = ['2025-Q2', '2025-Q3']
        } else if (statTypeIndex === 2) {
          this.dateRange2 = ['2025-Q4', '2026-Q1']
        } else if (statTypeIndex === 3) {
          this.dateRange3 = ['2025-Q4', '2026-Q1']
        }
      } else {
        if (statTypeIndex === 1) {
          this.dateRange1 = ['2025-05', '2025-06']
        } else if (statTypeIndex === 2) {
          this.dateRange2 = ['2025-12', '2026-01']
        } else if (statTypeIndex === 3) {
          this.dateRange3 = ['2025-11', '2026-01']
        }
      }

      // 重新初始化图表，更新数据
      this.initCharts()
    },

    // 调整所有图表大小
    resizeCharts() {
      Object.values(this.charts).forEach(chart => chart.resize())
      },
      
      // 操作审计相关方法
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
      
      // 操作审计搜索
      auditSearch() {
        console.log('搜索参数:', this.auditSearchParams);
        // 这里可以添加实际的搜索逻辑，调用API获取数据
        // 模拟搜索结果
        const filteredRecords = this.auditRecords.filter(record => {
          let match = true;
          
          if (this.auditSearchParams.platform && record.platform !== this.auditSearchParams.platform) {
            match = false;
          }
          
          if (this.auditSearchParams.operationType && record.operationType !== this.auditSearchParams.operationType) {
            match = false;
          }
          
          if (this.auditSearchParams.operation) {
            const operation = this.auditSearchParams.operation.toLowerCase();
            if (!record.operation.toLowerCase().includes(operation)) {
              match = false;
            }
          }
          
          if (this.auditSearchParams.module && record.module !== this.auditSearchParams.module) {
            match = false;
          }
          
          // 时间范围过滤
          if (this.auditSearchParams.startDate) {
            const recordDate = new Date(record.operationTime).toISOString().split('T')[0];
            if (recordDate < this.auditSearchParams.startDate) {
              match = false;
            }
          }
          
          if (this.auditSearchParams.endDate) {
            const recordDate = new Date(record.operationTime).toISOString().split('T')[0];
            if (recordDate > this.auditSearchParams.endDate) {
              match = false;
            }
          }
          
          return match;
        });
        
        this.auditTotalRecords = filteredRecords.length;
        this.calculateAuditTotalPages();
        this.auditCurrentPage = 1;
      },
      
      // 重置操作审计搜索
      resetAuditSearch() {
        this.auditSearchParams = {
          platform: '',
          operationType: '',
          startDate: this.getDateBefore(7),
          endDate: this.getToday(),
          application: '',
          module: '',
          operation: ''
        };
        this.auditSearch();
      },
      
      // 计算操作审计总页数
      calculateAuditTotalPages() {
        this.auditTotalPages = Math.ceil(this.auditTotalRecords / this.auditPageSize);
      },
      
      // 操作审计上一页
      auditPrevPage() {
        if (this.auditCurrentPage > 1) {
          this.auditCurrentPage--;
        }
      },
      
      // 操作审计下一页
      auditNextPage() {
        if (this.auditCurrentPage < this.auditTotalPages) {
          this.auditCurrentPage++;
        }
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

/* 数据概览导航 */
.data-nav {
  display: flex;
  gap: 15px;
  font-size: 0.9rem;
}

.nav-item {
  color: #666;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  transition: all 0.2s;
}

.nav-item:hover {
  color: #ff5722;
}

.nav-item.active {
  color: #ff5722;
  font-weight: 600;
  border-bottom: 2px solid #ff5722;
  padding-bottom: 3px;
  border-radius: 0;
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

/* 应用导航 */
    .app-nav {
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }

    .app-nav h3 {
      margin: 0 0 15px 0;
      color: #333;
      font-size: 1.1rem;
      font-weight: 600;
    }

    /* 统计类型切换 */
    .stat-type {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
      align-items: center;
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

/* 资源使用页面样式 */
.resource-section {
  margin-bottom: 30px;
}

.resource-section:last-child {
  margin-bottom: 0;
}

.resource-section h4 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 1rem;
  font-weight: 600;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
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

/* 操作审计相关样式 */
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