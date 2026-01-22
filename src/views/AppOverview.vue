<template>
  <div class="app-overview">
    <header class="page-header">
      <h2>应用概况</h2>
      <button class="edit-btn">编辑</button>
    </header>
    
    <div class="info-container">
      <div class="info-row">
        <label class="info-label">应用名称</label>
        <input type="text" class="info-input" v-model="appInfo.appName" :disabled="!isEditing" :readonly="!isEditing">
      </div>
      
      <div class="info-row">
        <label class="info-label">AppId</label>
        <input type="text" class="info-input" v-model="appInfo.appId" readonly>
      </div>
      
      <div class="info-row">
        <label class="info-label">负责人</label>
        <input type="text" class="info-input" v-model="appInfo.owner" :disabled="!isEditing" :readonly="!isEditing">
      </div>
      
      <div class="info-row">
        <label class="info-label">项目类型</label>
        <select class="info-select" v-model="appInfo.projectType" :disabled="!isEditing">
          <option value="XC">XC</option>
        </select>
      </div>
      
      <div class="info-row">
        <label class="info-label">访问类型</label>
        <select class="info-select" v-model="appInfo.accessType" :disabled="!isEditing">
          <option value="内部访问">内部访问</option>
        </select>
      </div>
      
      <div class="info-row">
        <label class="info-label">托管模式</label>
        <select class="info-select" v-model="appInfo.hostingMode" :disabled="true">
          <option value="托管共享模式">托管共享模式</option>
          <option value="托管隔离模式">托管隔离模式</option>
        </select>
      </div>
      
      <div class="info-row">
        <label class="info-label">隔离链路</label>
        <el-select 
          v-model="appInfo.isolationLink" 
          placeholder="请选择隔离链路" 
          :disabled="appInfo.hostingMode !== '托管隔离模式' || !isEditing"
          clearable
        >
          <el-option 
            v-for="link in availableLinks" 
            :key="link.value" 
            :label="link.label" 
            :value="link.value">
          </el-option>
        </el-select>
      </div>
      
      <div class="info-row">
        <label class="info-label">切换托管模式</label>
        <div class="switch-mode-container">
          <el-button type="primary" @click="showSwitchModeDialog">切换托管模式</el-button>
        </div>
      </div>
      
      <div class="info-row">
        <label class="info-label">组件数量</label>
        <input type="text" class="info-input" v-model="appInfo.componentCount" readonly>
      </div>
      
      <div class="info-row">
        <label class="info-label">接口数量</label>
        <input type="text" class="info-input" v-model="appInfo.apiCount" readonly>
      </div>
      
      <div class="info-row">
        <label class="info-label">更新时间</label>
        <input type="text" class="info-input" v-model="appInfo.updateTime" readonly>
      </div>
      
      <div class="info-row">
        <label class="info-label">仓库地址</label>
        <input type="text" class="info-input" v-model="appInfo.repoUrl" :disabled="!isEditing" :readonly="!isEditing">
      </div>
      
      <div class="info-row">
        <label class="info-label">分支名称</label>
        <input type="text" class="info-input" v-model="appInfo.branchName" :disabled="!isEditing" :readonly="!isEditing">
      </div>
      
      <div class="info-row">
        <label class="info-label">协作令牌</label>
        <input type="text" class="info-input" v-model="appInfo.cooperationToken" :disabled="!isEditing" :readonly="!isEditing">
      </div>
      
      <div class="info-row">
        <label class="info-label">项目团队</label>
        <select class="info-select" v-model="appInfo.team" :disabled="!isEditing">
          <option value="test">test</option>
        </select>
      </div>
    </div>
    
    <!-- 保存/取消按钮 -->
    <div class="action-buttons" v-if="isEditing">
      <el-button @click="cancelEdit">取消</el-button>
      <el-button type="primary" @click="saveEdit">保存</el-button>
    </div>
    
    <!-- 切换托管模式弹窗 -->
    <el-dialog
      v-model="switchModeDialogVisible"
      title="切换托管模式"
      width="500px"
    >
      <div class="switch-mode-content">
        <div class="current-mode">
          <p>当前托管模式：<el-tag type="info">{{ appInfo.hostingMode }}</el-tag></p>
        </div>
        
        <div class="target-mode">
          <el-form-item label="目标托管模式" required>
            <el-radio-group v-model="switchModeForm.targetMode">
              <el-radio label="托管共享模式">托管共享模式</el-radio>
              <el-radio label="托管隔离模式">托管隔离模式</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        
        <!-- 隔离模式下需要选择链路 -->
        <el-form-item 
          v-if="switchModeForm.targetMode === '托管隔离模式'" 
          label="隔离链路" 
          required
        >
          <el-select 
            v-model="switchModeForm.isolationLink" 
            placeholder="请选择隔离链路" 
            clearable
          >
            <el-option 
              v-for="link in availableLinks" 
              :key="link.value" 
              :label="link.label" 
              :value="link.value">
            </el-option>
          </el-select>
        </el-form-item>
        
        <!-- 切换时间设置 -->
        <el-form-item label="切换时间">
          <el-radio-group v-model="switchModeForm.effectiveTimeType">
            <el-radio label="immediate">立即生效</el-radio>
            <el-radio label="scheduled">定时生效</el-radio>
          </el-radio-group>
          
          <el-date-picker
            v-if="switchModeForm.effectiveTimeType === 'scheduled'"
            v-model="switchModeForm.effectiveTime"
            type="datetime"
            placeholder="选择生效时间"
            format="YYYY-MM-DD HH:mm"
            value-format="YYYY-MM-DD HH:mm"
            style="margin-top: 10px; width: 100%;"
          ></el-date-picker>
        </el-form-item>
      </div>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="switchModeDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSwitchMode">确定</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 链路占用提醒弹窗 -->
    <el-dialog
      v-model="linkOccupiedDialogVisible"
      title="链路占用提醒"
      width="400px"
    >
      <div class="link-occupied-content">
        <el-alert
          title="该链路已被占用"
          type="warning"
          description="点击确认则代表可共用该链路，点击取消则返回修改页面。"
          show-icon
        ></el-alert>
      </div>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="linkOccupiedDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmLinkOccupation">确认共用</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AppOverview',
  data() {
    return {
      isEditing: false,
      appInfo: {
        appName: 'demo',
        appId: '10116',
        owner: 'agrine',
        projectType: 'XC',
        accessType: '内部访问',
        hostingMode: '托管共享模式',
        isolationLink: '',
        componentCount: '',
        apiCount: '',
        updateTime: '2024-12-11 09:13:43',
        repoUrl: '',
        branchName: '',
        cooperationToken: '',
        team: 'test'
      },
      availableLinks: [
        { value: 'link1', label: '测试链路（动态）' },
        { value: 'link2', label: '测试链路（静态）' },
        { value: 'link3', label: '生产链路1' },
        { value: 'link4', label: '生产链路2' }
      ],
      switchModeDialogVisible: false,
      linkOccupiedDialogVisible: false,
      switchModeForm: {
        targetMode: '',
        isolationLink: '',
        effectiveTimeType: 'immediate',
        effectiveTime: ''
      },
      originalAppInfo: {}
    }
  },
  methods: {
    // 显示切换托管模式弹窗
    showSwitchModeDialog() {
      this.switchModeForm = {
        targetMode: this.appInfo.hostingMode === '托管共享模式' ? '托管隔离模式' : '托管共享模式',
        isolationLink: '',
        effectiveTimeType: 'immediate',
        effectiveTime: ''
      }
      this.switchModeDialogVisible = true
    },
    
    // 处理切换托管模式
    handleSwitchMode() {
      // 验证表单
      if (this.switchModeForm.targetMode === '托管隔离模式' && !this.switchModeForm.isolationLink) {
        this.$message.error('请选择隔离链路')
        return
      }
      
      // 模拟检查链路是否被占用
      const isLinkOccupied = this.checkLinkOccupation(this.switchModeForm.isolationLink)
      
      if (isLinkOccupied) {
        // 显示链路占用提醒
        this.linkOccupiedDialogVisible = true
      } else {
        // 直接执行切换
        this.executeModeSwitch()
      }
    },
    
    // 检查链路是否被占用
    checkLinkOccupation(linkId) {
      // 模拟检查逻辑，实际应调用API
      return linkId === 'link1' // 假设link1已被占用
    },
    
    // 确认链路占用
    confirmLinkOccupation() {
      this.linkOccupiedDialogVisible = false
      this.executeModeSwitch()
    },
    
    // 执行模式切换
    executeModeSwitch() {
      // 根据生效时间类型处理
      if (this.switchModeForm.effectiveTimeType === 'immediate') {
        // 立即生效
        this.appInfo.hostingMode = this.switchModeForm.targetMode
        this.appInfo.isolationLink = this.switchModeForm.targetMode === '托管隔离模式' ? this.switchModeForm.isolationLink : ''
        this.$message.success('托管模式切换成功')
      } else {
        // 定时生效，这里只是模拟，实际应保存到后端
        this.$message.success(`托管模式将在 ${this.switchModeForm.effectiveTime} 生效`)
      }
      
      this.switchModeDialogVisible = false
    },
    
    // 编辑按钮点击事件
    toggleEdit() {
      this.isEditing = !this.isEditing
      if (this.isEditing) {
        // 保存原始数据，用于取消编辑时恢复
        this.originalAppInfo = JSON.parse(JSON.stringify(this.appInfo))
      }
    },
    
    // 保存编辑
    saveEdit() {
      // 模拟保存逻辑，实际应调用API
      this.isEditing = false
      this.$message.success('应用信息保存成功')
    },
    
    // 取消编辑
    cancelEdit() {
      // 恢复原始数据
      this.appInfo = JSON.parse(JSON.stringify(this.originalAppInfo))
      this.isEditing = false
    }
  },
  mounted() {
    // 页面加载时，将编辑按钮的点击事件绑定到toggleEdit方法
    const editBtn = document.querySelector('.edit-btn')
    if (editBtn) {
      editBtn.addEventListener('click', this.toggleEdit)
    }
  },
  beforeUnmount() {
    // 页面卸载时，移除事件监听
    const editBtn = document.querySelector('.edit-btn')
    if (editBtn) {
      editBtn.removeEventListener('click', this.toggleEdit)
    }
  }
}
</script>

<style scoped>
.app-overview {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e8e8e8;
}

.page-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #262626;
}

.edit-btn {
  background-color: #1890ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.edit-btn:hover {
  background-color: #40a9ff;
}

.info-container {
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 20px;
}

.info-row {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding: 8px 0;
}

.info-row:last-child {
  margin-bottom: 0;
}

.info-label {
  width: 150px;
  font-size: 14px;
  color: #595959;
  margin-right: 24px;
  text-align: right;
  flex-shrink: 0;
}

.info-input, .info-select {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  color: #262626;
  background-color: #fafafa;
  cursor: not-allowed;
  transition: all 0.3s;
}

.info-input:focus, .info-select:focus {
  border-color: #40a9ff;
  outline: none;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  background-color: #fff;
}

.info-select {
  cursor: not-allowed;
}

/* 可编辑状态样式 */
.info-input:not([readonly]), .info-select:not([disabled]) {
  background-color: #fff;
  cursor: text;
}

.info-select:not([disabled]) {
  cursor: pointer;
}

/* 切换模式按钮容器 */
.switch-mode-container {
  display: flex;
  align-items: center;
}

/* 操作按钮区域 */
.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  padding-top: 12px;
  border-top: 1px solid #e8e8e8;
}

/* 切换模式弹窗内容 */
.switch-mode-content {
  padding: 10px 0;
}

.current-mode {
  margin-bottom: 20px;
}

.target-mode {
  margin-bottom: 20px;
}

/* 链路占用提醒内容 */
.link-occupied-content {
  margin: 10px 0;
}

/* 弹窗按钮样式 */
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>