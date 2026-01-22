<template>
  <div class="link-management-container">
    <!-- 页面内容 -->
    <main class="content">
      <!-- 链路管理标题 -->
      <div class="section-header">
        <h2>链路管理</h2>
        <div class="header-actions">
          <el-input
            v-model="searchQuery"
            placeholder="搜索链路名称"
            class="search-input"
            clearable
          ></el-input>
          <el-button type="primary" @click="handleAddLink">
            <i class="el-icon-plus"></i> 新增
          </el-button>
        </div>
      </div>

      <el-table :data="linkList" style="width: 100%" border>
        <el-table-column prop="linkName" label="链路名称" min-width="150"></el-table-column>
        <el-table-column prop="serverCount" label="服务器数量" width="120"></el-table-column>
        <el-table-column prop="remark" label="备注" min-width="150"></el-table-column>
        <el-table-column prop="usageStatus" label="使用情况" width="100">
          <template #default="scope">
            <el-tag
              :type="scope.row.usageStatus === '已占用' ? 'warning' : 'success'"
              size="small"
            >
              {{ scope.row.usageStatus }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="applications" label="应用" min-width="200">
          <template #default="scope">
            <el-tooltip
              v-if="scope.row.applications.length > 3"
              :content="scope.row.applications.join(', ')"
              placement="top"
            >
              <div class="application-list">
                {{ scope.row.applications[0] }}, {{ scope.row.applications[1] }}, {{ scope.row.applications[2] }}...</div>
            </el-tooltip>
            <div v-else class="application-list">{{ scope.row.applications.join(', ') }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
             <template #default="scope">
               <el-button type="text" size="small" @click="handleView(scope.row)">
                 查看
               </el-button>
               <el-button type="text" size="small" @click="handleEdit(scope.row)">
                 编辑
               </el-button>
               <el-button type="text" size="small" @click="handleDelete(scope.row)" :disabled="scope.row.usageStatus === '已占用'">
                 删除
               </el-button>
               <el-button type="primary" size="small" @click="handleDeploy(scope.row)">
                 部署
               </el-button>
             </template>
           </el-table-column>
      </el-table>

      <div class="table-footer">
        <div class="pagination">
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            :page-size="pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </div>

      <!-- 新增链路弹窗 -->
      <el-dialog
        v-model="dialogVisible.add"
        title="新增链路"
        width="500px"
      >
        <el-form :model="formData" label-width="100px">
          <el-form-item label="链路名称" required>
            <el-input v-model="formData.linkName" placeholder="请输入链路名称"></el-input>
          </el-form-item>
          <el-form-item label="服务器IP" required>
            <el-input v-model="formData.serverIp" placeholder="请输入服务器IP"></el-input>
          </el-form-item>
          <el-form-item label="服务器用户" required>
            <el-input v-model="formData.serverUser" placeholder="请输入服务器用户"></el-input>
          </el-form-item>
          <el-form-item label="密码" required>
            <el-input type="password" v-model="formData.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="formData.remark" placeholder="请输入备注" :rows="3"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible.add = false">取消</el-button>
            <el-button type="primary" @click="handleSubmit('add')">确定</el-button>
          </span>
        </template>
      </el-dialog>

      <!-- 查看链路弹窗 -->
      <el-dialog
        v-model="dialogVisible.view"
        title="链路详情"
        width="500px"
      >
        <el-form :model="formData" label-width="100px">
          <el-form-item label="链路名称">
            <el-input v-model="formData.linkName" disabled></el-input>
          </el-form-item>
          <!-- 服务器列表 -->
          <el-form-item label="链路服务器">
            <div v-for="(server, index) in serverList" :key="index" class="server-item">
              <div class="server-info">
                <div class="server-label">服务器{{ index + 1 }}(内用户)</div>
                <div class="server-details">
                  {{ server.ip }}:{{ server.port }}<span v-if="server.status === '启用'" class="status-online">(启用)</span>
                  <span v-else class="status-offline">(禁用)</span>
                </div>
              </div>
              <div class="server-controls">
                <el-switch v-model="server.enabled" size="small" disabled></el-switch>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="formData.remark" :rows="2" disabled></el-input>
          </el-form-item>
          <el-form-item label="使用情况">
            <el-input v-model="formData.usageStatus" disabled></el-input>
          </el-form-item>
          <el-form-item label="应用">
            <el-input v-model="applicationsText" disabled></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible.view = false">取消</el-button>
            <el-button type="primary" @click="dialogVisible.view = false">确定</el-button>
          </span>
        </template>
      </el-dialog>

      <!-- 编辑链路弹窗 -->
      <el-dialog
        v-model="dialogVisible.edit"
        title="编辑链路"
        width="500px"
      >
        <el-form :model="formData" label-width="100px">
          <el-form-item label="链路名称" required>
            <el-input v-model="formData.linkName" placeholder="请输入链路名称"></el-input>
          </el-form-item>
          <el-form-item label="服务器IP" required>
            <el-input v-model="formData.serverIp" placeholder="请输入服务器IP"></el-input>
          </el-form-item>
          <el-form-item label="服务器用户" required>
            <el-input v-model="formData.serverUser" placeholder="请输入服务器用户"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="formData.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="formData.remark" placeholder="请输入备注" :rows="3"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible.edit = false">取消</el-button>
            <el-button type="primary" @click="handleSubmit('edit')">确定</el-button>
          </span>
        </template>
      </el-dialog>

      <!-- 删除链路弹窗 -->
         <el-dialog
           v-model="dialogVisible.delete"
           title="删除链路"
           width="400px"
           :before-close="handleDeleteCancel"
         >
           <div class="delete-content">
             <el-alert
               v-if="selectedRow.usageStatus === '已占用'"
               title="该链路已被占用，无法删除，请先解除占用。"
               type="error"
               show-icon
             ></el-alert>
             <el-alert
               v-else
               title="删除链路之后将无法恢复，请确认是否删除。"
               type="warning"
               show-icon
             ></el-alert>
           </div>
           <template #footer>
             <span class="dialog-footer">
               <el-button @click="dialogVisible.delete = false">取消</el-button>
               <el-button type="danger" @click="handleDeleteConfirm" :disabled="selectedRow.usageStatus === '已占用'">确定删除</el-button>
             </span>
           </template>
         </el-dialog>

         <!-- 部署弹窗 -->
         <el-dialog
           v-model="dialogVisible.deploy"
           title="自动化部署"
           width="600px"
         >
           <el-form :model="deployForm" label-width="100px">
             <el-form-item label="链路名称" required>
               <el-input v-model="deployForm.linkName" disabled></el-input>
             </el-form-item>
             <el-form-item label="应用名称" required>
               <el-select v-model="deployForm.application" placeholder="请选择应用">
                 <el-option
                   v-for="app in selectedRow.applications"
                   :key="app"
                   :label="app"
                   :value="app"
                 ></el-option>
               </el-select>
             </el-form-item>
             <el-form-item label="版本号" required>
               <el-input v-model="deployForm.version" placeholder="请输入版本号，如 v1.0.0"></el-input>
             </el-form-item>
             <el-form-item label="部署脚本">
               <el-input
                 type="textarea"
                 v-model="deployForm.deployScript"
                 placeholder="请输入部署脚本，默认为：git pull && npm install && npm run build"
                 :rows="4"
               ></el-input>
             </el-form-item>
           </el-form>
           <template #footer>
             <span class="dialog-footer">
               <el-button @click="dialogVisible.deploy = false">取消</el-button>
               <el-button type="primary" @click="handleDeploySubmit">开始部署</el-button>
             </span>
           </template>
         </el-dialog>

         <!-- 部署历史记录弹窗 -->
         <el-dialog
           v-model="dialogVisible.deployHistory"
           title="部署历史记录"
           width="800px"
         >
           <el-table :data="deploymentHistory" style="width: 100%" border>
             <el-table-column prop="id" label="部署ID" min-width="120"></el-table-column>
             <el-table-column prop="application" label="应用名称" min-width="150"></el-table-column>
             <el-table-column prop="version" label="版本" width="120"></el-table-column>
             <el-table-column prop="status" label="状态" width="100">
               <template #default="scope">
                 <el-tag
                   :type="scope.row.status === 'success' ? 'success' : scope.row.status === 'failed' ? 'danger' : 'warning'"
                   size="small"
                 >
                   {{ scope.row.status === 'success' ? '成功' : scope.row.status === 'failed' ? '失败' : '运行中' }}
                 </el-tag>
               </template>
             </el-table-column>
             <el-table-column prop="startTime" label="开始时间" min-width="180"></el-table-column>
             <el-table-column prop="endTime" label="结束时间" min-width="180"></el-table-column>
             <el-table-column label="操作" width="100">
               <template #default="scope">
                 <el-button type="text" size="small" @click="handleViewLogs(scope.row)">
                   查看日志
                 </el-button>
               </template>
             </el-table-column>
           </el-table>
           <template #footer>
             <span class="dialog-footer">
               <el-button @click="dialogVisible.deployHistory = false">关闭</el-button>
             </span>
           </template>
         </el-dialog>

         <!-- 部署日志弹窗 -->
         <el-dialog
           v-model="dialogVisible.deployLogs"
           title="部署日志"
           width="800px"
           top="10vh"
         >
           <div class="deploy-logs">
             <pre>{{ currentDeploymentLogs }}</pre>
           </div>
           <template #footer>
             <span class="dialog-footer">
               <el-button @click="dialogVisible.deployLogs = false">关闭</el-button>
             </span>
           </template>
         </el-dialog>
    </main>
  </div>
</template>

<script>
export default {
  name: 'LinkManagement',
  data() {
       return {
         searchQuery: '',
         linkList: [
           {
             id: 'link-1',
             linkName: '测试链路（动态）',
             serverCount: 2,
             remark: '测试用动态链路',
             usageStatus: '已占用',
             applications: ['快递中台-仓库订单管理系统-测试环境', '应用2', '应用3', '应用4'],
             serverIp: '192.0.168.80, 192.0.168.90',
             serverUser: 'admin',
             password: 'password123'
           },
           {
             id: 'link-2',
             linkName: '测试链路（静态）',
             serverCount: 1,
             remark: '测试用静态链路',
             usageStatus: '空闲中',
             applications: [],
             serverIp: '192.0.168.100',
             serverUser: 'admin',
             password: 'password456'
           }
         ],
         total: 2,
         pageSize: 20,
         currentPage: 1,
         dialogVisible: {
           add: false,
           view: false,
           edit: false,
           delete: false,
           deploy: false,
           deployHistory: false,
           deployLogs: false
         },
         formData: {
           linkName: '',
           serverIp: '',
           serverUser: '',
           password: '',
           remark: '',
           usageStatus: '',
           applications: []
         },
         deployForm: {
           linkId: '',
           linkName: '',
           application: '',
           version: '',
           deployScript: 'git pull && npm install && npm run build'
         },
         deploymentHistory: [],
         currentDeploymentLogs: '',
         selectedRow: null
       }
     },
  computed: {
    applicationsText() {
      return this.formData.applications.join(', ');
    },
    serverList() {
      // 解析服务器IP和端口，生成服务器列表
      const servers = [];
      if (this.formData.serverIp) {
        const ipList = this.formData.serverIp.split(',');
        ipList.forEach((ip, index) => {
          servers.push({
            ip: ip.trim(),
            port: '5555', // 默认端口，实际应从数据中获取
            status: index % 2 === 0 ? '启用' : '禁用', // 模拟启用/禁用状态
            enabled: index % 2 === 0
          });
        });
      }
      return servers;
    }
  },
  methods: {
    handleAddLink() {
      this.resetForm();
      this.dialogVisible.add = true;
    },
    handleView(row) {
      this.selectedRow = row;
      this.formData = JSON.parse(JSON.stringify(row));
      this.dialogVisible.view = true;
    },
    handleEdit(row) {
      this.selectedRow = row;
      this.formData = JSON.parse(JSON.stringify(row));
      this.dialogVisible.edit = true;
    },
    handleDelete(row) {
      this.selectedRow = row;
      this.dialogVisible.delete = true;
    },
    handleDeploy(row) {
      this.selectedRow = row;
      this.deployForm = {
        linkId: row.id,
        linkName: row.linkName,
        application: row.applications.length > 0 ? row.applications[0] : '',
        version: '',
        deployScript: 'git pull && npm install && npm run build'
      };
      this.dialogVisible.deploy = true;
    },
    handleDeploySubmit() {
      console.log('提交部署请求:', this.deployForm);
      // 模拟部署请求
      
      this.$message.success('部署任务已启动，正在执行中...');
      this.dialogVisible.deploy = false;
      
      // 显示部署历史记录
      this.fetchDeploymentHistory();
      this.dialogVisible.deployHistory = true;
    },
    handleViewLogs(row) {
      console.log('查看部署日志:', row.id);
      // 模拟获取部署日志
      this.currentDeploymentLogs = row.logs;
      this.dialogVisible.deployLogs = true;
    },
    fetchDeploymentHistory() {
      console.log('获取部署历史记录');
      // 模拟获取部署历史
      this.deploymentHistory = [
        {
          id: 'deploy-1',
          linkId: 'link-1',
          linkName: '测试链路（动态）',
          application: '快递中台-仓库订单管理系统-测试环境',
          version: 'v1.2.3',
          status: 'success',
          startTime: '2024-01-23T10:30:00Z',
          endTime: '2024-01-23T10:35:00Z',
          logs: '部署成功：\n1. 拉取代码完成\n2. 依赖安装完成\n3. 构建完成\n4. 部署到服务器成功'
        },
        {
          id: 'deploy-2',
          linkId: 'link-1',
          linkName: '测试链路（动态）',
          application: '应用2',
          version: 'v2.0.1',
          status: 'failed',
          startTime: '2024-01-22T14:20:00Z',
          endTime: '2024-01-22T14:22:30Z',
          logs: '部署失败：\n1. 拉取代码完成\n2. 依赖安装失败：npm install 错误\n错误信息：npm ERR! missing dependencies'
        }
      ];
    },
    handleDeleteCancel() {
      this.selectedRow = null;
    },
    handleDeleteConfirm() {
      const index = this.linkList.findIndex(item => item.linkName === this.selectedRow.linkName);
      if (index !== -1) {
        this.linkList.splice(index, 1);
        this.total--;
        this.dialogVisible.delete = false;
        this.$message.success('链路删除成功');
      }
      this.selectedRow = null;
    },
    handleSubmit(type) {
      // 简单的表单验证
      if (!this.formData.linkName || !this.formData.serverIp || !this.formData.serverUser) {
        this.$message.error('请填写必填项');
        return;
      }

      // 计算服务器数量
      const serverCount = this.formData.serverIp.split(',').length;

      if (type === 'add') {
        // 新增链路
        const newLink = {
          ...this.formData,
          serverCount: serverCount,
          usageStatus: '空闲中',
          applications: []
        };
        this.linkList.push(newLink);
        this.total++;
        this.$message.success('链路新增成功');
      } else if (type === 'edit') {
        // 编辑链路
        const index = this.linkList.findIndex(item => item.linkName === this.selectedRow.linkName);
        if (index !== -1) {
          this.linkList[index] = {
            ...this.formData,
            serverCount: serverCount
          };
          this.$message.success('链路编辑成功');
        }
      }

      this.dialogVisible[type] = false;
      this.resetForm();
    },
    resetForm() {
      this.formData = {
        linkName: '',
        serverIp: '',
        serverUser: '',
        password: '',
        remark: '',
        usageStatus: '',
        applications: []
      };
      this.selectedRow = null;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      // 重新获取数据
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      // 重新获取数据
    }
  }
}
</script>

<style scoped>
/* 全局容器样式 */
.link-management-container {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
  background-color: #f5f7fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 部署日志样式 */
.deploy-logs {
  max-height: 500px;
  overflow-y: auto;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
}

.deploy-logs pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* 内容区域样式 */
.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

/* 页面标题区域 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e4e7ed;
}

.section-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  color: #303133;
}

/* 头部操作按钮组 */
.header-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.search-input {
  width: 200px;
}

/* 表格容器 */
.el-table {
  margin-bottom: 20px;
  background-color: #ffffff;
}

/* 表格页脚 */
.table-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
  padding-top: 12px;
  border-top: 1px solid #e4e7ed;
}

/* 分页样式 */
.pagination {
  display: flex;
  justify-content: flex-end;
}

/* 应用列表样式 */
.application-list {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 删除弹窗内容样式 */
.delete-content {
  margin: 20px 0;
}

/* 表单样式优化 */
.el-form-item {
  margin-bottom: 20px;
}

/* 弹窗按钮样式 */
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* 服务器列表样式 */
.server-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 8px 12px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.server-info {
  flex: 1;
}

.server-label {
  font-size: 14px;
  color: #606266;
  margin-bottom: 4px;
}

.server-details {
  font-size: 14px;
  color: #303133;
}

.server-controls {
  margin-left: 20px;
}

.status-online {
  color: #67c23a;
  margin-left: 8px;
}

.status-offline {
  color: #909399;
  margin-left: 8px;
}
</style>