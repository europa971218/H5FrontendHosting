<template>
  <div class="user-settings">
    <div class="user-profile">
      <h2>个人信息</h2>
      <div class="profile-section">
        <div class="avatar-container">
          <div class="avatar" :style="{ backgroundImage: `url(${user.avatar || defaultAvatar})` }">
            <div class="avatar-overlay" @click="openAvatarUpload">
              <span class="edit-icon">📷</span>
            </div>
          </div>
          <input 
            ref="avatarInput" 
            type="file" 
            accept="image/*" 
            style="display: none" 
            @change="handleAvatarUpload"
          >
          <p class="avatar-hint">点击头像可更换</p>
        </div>
        
        <div class="user-info">
          <div class="info-item">
            <label>用户名：</label>
            <span>{{ user.username }}</span>
          </div>
          <div class="info-item">
            <label>用户昵称：</label>
            <span>{{ user.nickname }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="security-section">
      <h2>安全设置</h2>
      <div class="security-item">
        <label>修改密码</label>
        <button class="btn btn-primary" @click="openPasswordDialog">修改密码</button>
      </div>
    </div>
    
    <!-- 密码修改对话框 -->
    <div v-if="showPasswordDialog" class="dialog-overlay" @click="closePasswordDialog">
      <div class="dialog-content" @click.stop>
        <div class="dialog-header">
          <h3>密码修改</h3>
          <button class="close-btn" @click="closePasswordDialog">×</button>
        </div>
        <div class="dialog-body">
          <div class="form-group">
            <label>用户账号</label>
            <input type="text" class="form-input" :value="user.username" disabled>
          </div>
          <div class="form-group">
            <label>用户昵称</label>
            <input type="text" class="form-input" :value="user.nickname" disabled>
          </div>
          <div class="form-group">
            <label>原密码 <span class="required">*</span></label>
            <input 
              type="password" 
              class="form-input" 
              v-model="passwordForm.oldPassword" 
              placeholder="请填写原密码"
            >
          </div>
          <div class="form-group">
            <label>新密码 <span class="required">*</span></label>
            <input 
              type="password" 
              class="form-input" 
              v-model="passwordForm.newPassword" 
              placeholder="请填写新密码"
            >
          </div>
          <div class="password-hint">
            密码长度需至少8位，满足包含大小写字母、数字、符号的其中三种以上
          </div>
          <div class="form-group">
            <label>确认密码 <span class="required">*</span></label>
            <input 
              type="password" 
              class="form-input" 
              v-model="passwordForm.confirmPassword" 
              placeholder="请确认密码"
            >
          </div>
        </div>
        <div class="dialog-footer">
          <button class="btn" @click="closePasswordDialog">取消</button>
          <button class="btn btn-primary" @click="submitPasswordChange">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserSettings',
  inject: ['updateUserAvatar'],
  data() {
    return {
      user: {
        username: 'agree',
        nickname: 'agree',
        avatar: ''
      },
      defaultAvatar: 'https://via.placeholder.com/150',
      showPasswordDialog: false,
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    openAvatarUpload() {
      this.$refs.avatarInput.click()
    },
    handleAvatarUpload(e) {
      const file = e.target.files[0]
      if (file) {
        // 文件验证
        const isImage = file.type.startsWith('image/')
        if (!isImage) {
          this.$message.error('请上传图片文件')
          return
        }
        
        // 文件大小限制（2MB）
        const maxSize = 2 * 1024 * 1024
        if (file.size > maxSize) {
          this.$message.error('图片大小不能超过2MB')
          return
        }
        
        // 预览图片
        const reader = new FileReader()
        reader.onload = (event) => {
          this.user.avatar = event.target.result
          
          // 更新全局用户头像
          if (this.updateUserAvatar) {
            this.updateUserAvatar(event.target.result)
          }
          
          // 上传到服务器
          this.uploadAvatarToServer(file)
        }
        reader.readAsDataURL(file)
      }
    },
    
    uploadAvatarToServer(file) {
      // 创建FormData对象
      const formData = new FormData()
      formData.append('avatar', file)
      
      // 发送请求到后端API
      fetch('http://localhost:3003/api/users/avatar', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.$message.success(data.message)
          // 可以保存服务器返回的头像URL
          console.log('服务器返回的头像URL:', data.data.avatarUrl)
        } else {
          this.$message.error(data.message)
        }
      })
      .catch(error => {
        console.error('头像上传失败:', error)
        this.$message.error('头像上传失败，请稍后重试')
      })
    },
    openPasswordDialog() {
      this.showPasswordDialog = true
    },
    closePasswordDialog() {
      this.showPasswordDialog = false
      this.resetPasswordForm()
    },
    resetPasswordForm() {
      this.passwordForm = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    },
    submitPasswordChange() {
      // 表单验证
      if (!this.passwordForm.oldPassword) {
        alert('请输入原密码')
        return
      }
      
      if (!this.passwordForm.newPassword) {
        alert('请输入新密码')
        return
      }
      
      if (this.passwordForm.newPassword.length < 8) {
        alert('密码长度需至少8位')
        return
      }
      
      if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
        alert('两次输入的密码不一致')
        return
      }
      
      // 密码复杂度验证
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])|(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])|(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;
      if (!passwordRegex.test(this.passwordForm.newPassword)) {
        alert('密码需满足包含大小写字母、数字、符号的其中三种以上')
        return
      }
      
      // 模拟API调用
      console.log('密码修改请求:', this.passwordForm)
      // 这里可以添加真实的API调用
      
      alert('密码修改成功')
      this.closePasswordDialog()
    }
  }
}
</script>

<style scoped>
.user-settings {
  max-width: 600px;
  margin: 0 auto;
}

.user-profile {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  position: relative;
  border: 3px solid #e0e0e0;
  cursor: pointer;
  transition: transform 0.2s;
}

.avatar:hover {
  transform: scale(1.05);
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.avatar:hover .avatar-overlay {
  opacity: 1;
}

.edit-icon {
  font-size: 2rem;
  color: white;
}

.avatar-hint {
  margin-top: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

.user-info {
  flex: 1;
}

.info-item {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.info-item label {
  font-weight: 600;
  color: #333;
  margin-right: 0.5rem;
}

.security-section {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.security-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #e0e0e0;
}

.security-item:last-child {
  border-bottom: none;
}

/* 对话框样式 */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.dialog-header h3 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background-color: #f5f5f5;
}

.dialog-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

.required {
  color: #ff4d4f;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.password-hint {
  color: #666;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #e0e0e0;
}

/* 按钮样式 */
.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
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
@media (max-width: 768px) {
  .profile-section {
    flex-direction: column;
    text-align: center;
  }
  
  .security-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>