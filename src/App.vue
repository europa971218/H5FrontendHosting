<template>
  <div class="app">
    <header class="header">
      <h1 class="logo">银行H5</h1>
      <nav class="nav">
        <router-link to="/">首页</router-link>
        <router-link to="/accounts">账户</router-link>
        <router-link to="/transactions">交易</router-link>
        <router-link to="/services">服务</router-link>
      </nav>
    </header>
    
    <main class="main">
      <router-view />
    </main>
    
    <footer class="footer">
      <p>&copy; 2026 银行H5前端托管项目. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
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