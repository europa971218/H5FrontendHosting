<template>
  <div class="home">
    <h1>欢迎使用银行H5前端托管项目</h1>
    
    <div class="card">
      <h2>快速访问</h2>
      <div class="quick-links">
        <router-link to="/accounts" class="quick-link-item">
          <div class="quick-link-icon">💰</div>
          <div class="quick-link-text">我的账户</div>
        </router-link>
        <router-link to="/transactions" class="quick-link-item">
          <div class="quick-link-icon">📊</div>
          <div class="quick-link-text">交易记录</div>
        </router-link>
        <router-link to="/services" class="quick-link-item">
          <div class="quick-link-icon">🔧</div>
          <div class="quick-link-text">金融服务</div>
        </router-link>
        <router-link to="/applications" class="quick-link-item">
          <div class="quick-link-icon">📱</div>
          <div class="quick-link-text">应用管理</div>
        </router-link>
      </div>
    </div>
    
    <div class="card">
      <h2>最新公告</h2>
      <ul class="announcements">
        <li class="announcement-item">
          <span class="announcement-date">2026-01-22</span>
          <span class="announcement-content">银行H5前端托管项目正式上线</span>
        </li>
        <li class="announcement-item">
          <span class="announcement-date">2026-01-20</span>
          <span class="announcement-content">系统维护通知：2026年1月23日凌晨2:00-4:00</span>
        </li>
        <li class="announcement-item">
          <span class="announcement-date">2026-01-18</span>
          <span class="announcement-content">新增移动支付功能</span>
        </li>
      </ul>
    </div>
    
    <div class="card">
      <h2>安全提示</h2>
      <div class="safety-tips">
        <p>🔒 请妥善保管您的账号密码，不要泄露给他人</p>
        <p>📱 不要点击陌生链接，防止钓鱼网站诈骗</p>
        <p>💳 定期检查账户交易记录，发现异常及时联系客服</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
}

.quick-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.quick-link-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%);
  border-radius: 8px;
  text-decoration: none;
  color: #1e3c72;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.quick-link-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%);
}

.quick-link-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.quick-link-text {
  font-weight: 500;
  text-align: center;
}

.announcements {
  list-style: none;
}

.announcement-item {
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.announcement-item:last-child {
  border-bottom: none;
}

.announcement-date {
  color: #666;
  font-size: 0.9rem;
  margin-right: 1rem;
}

.announcement-content {
  flex: 1;
  color: #333;
}

.safety-tips {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: #666;
}

@media (max-width: 768px) {
  .quick-links {
    grid-template-columns: 1fr;
  }
  
  .announcement-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
}
</style>