<template>
  <div class="app" :class="{ 'login-page': $route.name === 'Login' }">
    <!-- 登录页面不显示公共导航 -->
    <template v-if="$route.name !== 'Login'">
      <header class="header">
        <h1 class="logo">银行H5</h1>
        <nav class="nav">
          <router-link to="/home">首页</router-link>
          <router-link to="/accounts">账户</router-link>
          <router-link to="/transactions">交易</router-link>
          <router-link to="/services">服务</router-link>
          <router-link to="/audit">操作审计</router-link>
        </nav>
        <div class="user-menu">
          <div class="user-avatar" @click="toggleUserMenu">
            <img :src="userAvatar" alt="用户头像" class="avatar-img">
          </div>
          <div v-if="showUserMenu" class="dropdown-menu">
            <!-- 用户信息部分 -->
            <div class="user-info-section">
              <div class="user-header">
                <img :src="userAvatar" alt="用户头像" class="user-info-avatar">
                <div class="user-details">
                  <div class="username-row">
                    <span class="username">hanhan</span>
                    <span class="user-role">租户成员</span>
                  </div>
                  <div class="participation-info">
                    您参与的应用数为: <strong>1</strong>
                  </div>
                  <div class="login-time">
                    最近登录时间: 2025-5-15 11:35:58
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 功能选项 -->
            <div class="menu-options">
              <router-link to="/settings" class="menu-item">
                <span class="menu-icon">✏️</span>
                <span class="menu-text">编辑资料</span>
              </router-link>
              <a href="#" class="menu-item">
                <span class="menu-icon">💬</span>
                <span class="menu-text">意见反馈</span>
              </a>
              <a href="#" class="menu-item">
                <span class="menu-icon">🔄</span>
                <span class="menu-text">切换租户</span>
              </a>
              <a href="#" class="menu-item">
                <span class="menu-icon">🔒</span>
                <span class="menu-text">密码修改</span>
              </a>
              <div class="menu-divider"></div>
              <a href="#" class="menu-item logout" @click="logout">
                <span class="menu-icon">🚪</span>
                <span class="menu-text">退出登录</span>
              </a>
            </div>
          </div>
        </div>
      </header>
      <!-- 显示路由内容 -->
      <main class="main">
        <router-view />
      </main>
    </template>
    
    <!-- 登录页面直接显示 -->
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      userAvatar: 'https://via.placeholder.com/40',
      showUserMenu: false
    }
  },
  provide() {
    return {
      updateUserAvatar: (newAvatar) => {
        this.userAvatar = newAvatar
      }
    }
  },
  methods: {
    toggleUserMenu(event) {
      // 阻止事件冒泡，防止立即关闭菜单
      event.stopPropagation()
      this.showUserMenu = !this.showUserMenu
    },
    // 点击页面其他地方关闭下拉菜单
    closeUserMenu(event) {
      // 检查点击的是否是头像或下拉菜单本身
      const userAvatar = this.$el.querySelector('.user-avatar')
      const dropdownMenu = this.$el.querySelector('.dropdown-menu')
      
      if (userAvatar && !userAvatar.contains(event.target) && 
          dropdownMenu && !dropdownMenu.contains(event.target)) {
        this.showUserMenu = false
      }
    },
    // 退出登录方法
    logout(event) {
      event.preventDefault()
      // 关闭下拉菜单
      this.showUserMenu = false
      // 跳转到登录页面
      this.$router.push('/login')
    }
  },
  mounted() {
    // 监听点击事件，点击页面其他地方关闭下拉菜单
    document.addEventListener('click', this.closeUserMenu)
  },
  beforeUnmount() {
    // 移除事件监听
    document.removeEventListener('click', this.closeUserMenu)
  }
}
</script>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

/* 登录页面样式，去除max-width和margin限制 */
.app.login-page {
  max-width: none;
  margin: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.header {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s;
}

.nav a:hover {
  opacity: 0.8;
}

.user-menu {
  margin-left: auto;
  position: relative;
}

.user-avatar {
  cursor: pointer;
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.user-avatar:hover {
  transform: scale(1.05);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 0;
  min-width: 280px;
  z-index: 1000;
  border: 1px solid #e5e7eb;
}

/* 用户信息部分 */
.user-info-section {
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
}

.user-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-info-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-details {
  flex: 1;
}

.username-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.username {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.user-role {
  background-color: #3b82f6;
  color: white;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 12px;
}

.participation-info {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.login-time {
  font-size: 12px;
  color: #9ca3af;
}

/* 菜单选项 */
.menu-options {
  padding: 8px 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  color: #333;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s;
  cursor: pointer;
}

.menu-item:hover {
  background-color: #f5f7fa;
  color: #1e3c72;
}

.menu-icon {
  font-size: 16px;
  width: 20px;
  text-align: center;
}

.menu-text {
  flex: 1;
}

.menu-divider {
  height: 1px;
  background-color: #e5e7eb;
  margin: 4px 0;
}

.logout {
  color: #f56c6c;
}

.logout:hover {
  background-color: #fef0f0;
  color: #f56c6c;
}

.main {
  padding: 2rem;
  min-height: calc(100vh - 160px);
}

.footer {
  background: #f5f5f5;
  text-align: center;
  padding: 1rem;
  color: #666;
  font-size: 0.9rem;
  border-top: 1px solid #e0e0e0;
}
</style>