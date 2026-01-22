<template>
  <div class="login-container">
    <!-- 顶部Logo组件 -->
    <HeaderLogo 
      logoText="广东农信" 
      subtitleText="悦农鲜H5应用集中托管系统(A区)" 
    />
    
    <!-- 登录表单组件 -->
    <LoginForm 
      v-model="loginForm" 
      @login="handleLogin" 
    />
    
    <!-- 底部日期时间组件 -->
    <DateTimeFooter />
    
    <!-- 租户选择弹窗组件 -->
    <TenantDialog
      v-model:visible="userSelectVisible"
      v-model="selectedTenant"
      :tenant-options="tenantOptions"
      @confirm="confirmLogin"
      @cancel="cancelLogin"
    />
  </div>
</template>

<script>
// 导入组件
import LoginForm from '../components/LoginForm.vue'
import TenantDialog from '../components/TenantDialog.vue'

export default {
  name: 'Login',
  // 注册组件
  components: {
    LoginForm,
    TenantDialog
  },
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      userSelectVisible: false,
      selectedTenant: '广东农信',
      tenantOptions: [
        { label: '广东农信', value: '广东农信' }
      ]
    }
  },
  methods: {
    async handleLogin() {
      // 发送登录请求到后台
      try {
        const response = await fetch('http://localhost:3003/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.loginForm)
        })
        
        const result = await response.json()
        
        if (result.success) {
          // 登录成功，保存token或用户信息
          if (result.data.token) {
            localStorage.setItem('token', result.data.token)
          }
          // 保存用户信息到localStorage
          if (result.data.user) {
            localStorage.setItem('userInfo', JSON.stringify(result.data.user))
          }
          // 根据用户角色跳转到不同页面
          if (result.data.user && result.data.user.role === 'sysadmin') {
            // 系统管理员跳转到数据概览页
            this.$router.push('/data-overview')
          } else {
            // 其他用户跳转到首页
            this.$router.push('/home')
          }
        } else {
          // 登录失败，显示错误信息
          this.$message.error(result.message || '登录失败，请检查用户名和密码')
        }
      } catch (error) {
        console.error('Login error:', error)
        this.$message.error('登录失败，请稍后重试')
      }
    },
    cancelLogin() {
      this.userSelectVisible = false
      // 重置表单
      this.loginForm = {
        username: '',
        password: ''
      }
    },
    confirmLogin() {
      // 选择租户后，跳转到首页
      this.$router.push('/home')
    }
  }
}
</script>

<style>
/* 全局样式重置，去掉滚动条 */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

* {
  box-sizing: inherit;
}
</style>

<style scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  background: url('https://picsum.photos/id/1039/1920/1080') no-repeat center center;
  background-size: cover;
  display: block;
  position: relative;
  overflow: hidden;
}

.login-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  z-index: 1;
}
</style>