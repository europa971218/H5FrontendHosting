<template>
  <div class="services">
    <!-- 顶部导航栏 -->
    <header class="top-nav">
      <div class="nav-tabs">
        <router-link to="/" class="tab" :class="{ active: $route.path === '/' }">首页</router-link>
        <router-link to="/accounts" class="tab" :class="{ active: $route.path === '/accounts' }">账户</router-link>
        <router-link to="/transactions" class="tab" :class="{ active: $route.path === '/transactions' }">交易</router-link>
        <router-link to="/services" class="tab" :class="{ active: $route.path === '/services' }">服务</router-link>
      </div>
    </header>

    <!-- 页面内容 -->
    <main class="content">
      <h1>金融服务</h1>
      
      <div class="services-grid">
        <div class="service-card">
          <div class="service-icon">💳</div>
          <h2>信用卡服务</h2>
          <p>申请信用卡、查询账单、还款、提升额度</p>
          <button class="service-btn">立即使用</button>
        </div>
        
        <div class="service-card">
          <div class="service-icon">🏦</div>
          <h2>贷款服务</h2>
          <p>个人贷款、房贷、车贷、经营贷</p>
          <button class="service-btn">立即使用</button>
        </div>
        
        <div class="service-card">
          <div class="service-icon">💰</div>
          <h2>理财服务</h2>
          <p>基金、保险、理财产品、贵金属</p>
          <button class="service-btn">立即使用</button>
        </div>
        
        <div class="service-card">
          <div class="service-icon">💵</div>
          <h2>转账服务</h2>
          <p>跨行转账、境内汇款、境外汇款</p>
          <button class="service-btn">立即使用</button>
        </div>
        
        <div class="service-card">
          <div class="service-icon">📱</div>
          <h2>手机银行</h2>
          <p>下载手机银行APP、功能介绍、使用指南</p>
          <button class="service-btn">立即使用</button>
        </div>
        
        <div class="service-card">
          <div class="service-icon">🔒</div>
          <h2>安全中心</h2>
          <p>账户安全、密码管理、风险提示</p>
          <button class="service-btn">立即使用</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Services'
}
</script>

<style scoped>
.services {
  max-width: 1200px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

/* 顶部导航栏 */
.top-nav {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.nav-tabs {
  display: flex;
  gap: 2rem;
}

.nav-tabs a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s;
}

.nav-tabs a:hover {
  opacity: 0.8;
}

.nav-tabs a.active {
  border-bottom: 2px solid white;
  padding-bottom: 0.3rem;
}

/* 内容区 */
.content {
  padding: 2rem;
}

.content h1 {
  color: #333;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
}

/* 服务网格 */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

/* 服务卡片 */
.service-card {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.service-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.service-card h2 {
  color: #1e3c72;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.service-card p {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.service-btn {
  background: #1e3c72;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.service-btn:hover {
  background: #2a5298;
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .content {
    padding: 1rem;
  }
  
  .nav-tabs {
    gap: 1rem;
  }
}
</style>