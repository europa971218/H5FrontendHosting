<template>
  <div class="accounts">
    <h1>我的账户</h1>
    
    <div class="accounts-container">
      <div class="account-card" v-for="account in accounts" :key="account.id">
        <div class="account-header">
          <div class="account-type">{{ account.type }}</div>
          <div class="account-balance">¥{{ account.balance.toLocaleString() }}</div>
        </div>
        <div class="account-info">
          <div class="account-number">{{ formatAccountNumber(account.number) }}</div>
          <div class="account-status" :class="{ 'active': account.status === 'active' }">
            {{ account.status === 'active' ? '正常' : '冻结' }}
          </div>
        </div>
        <div class="account-actions">
          <button class="btn btn-primary">查看详情</button>
          <button class="btn">转账</button>
        </div>
      </div>
    </div>
    
    <div class="card">
      <h2>账户操作</h2>
      <div class="action-buttons">
        <button class="btn btn-primary">活期转定期</button>
        <button class="btn">定期转活期</button>
        <button class="btn">账户挂失</button>
        <button class="btn">开通新账户</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Accounts',
  data() {
    return {
      accounts: [
        {
          id: 1,
          type: '储蓄卡',
          number: '6222021234567890123',
          balance: 15800.50,
          status: 'active'
        },
        {
          id: 2,
          type: '信用卡',
          number: '5183661234567890',
          balance: -2300.00,
          status: 'active'
        },
        {
          id: 3,
          type: '定期存款',
          number: '123456789012',
          balance: 50000.00,
          status: 'active'
        }
      ]
    }
  },
  methods: {
    formatAccountNumber(number) {
      return number.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')   
    }
  }
}
</script>

<style scoped>
.accounts {
  max-width: 800px;
  margin: 0 auto;
}

.accounts-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.account-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.account-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.account-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.account-type {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e3c72;
}

.account-balance {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2a5298;
}

.account-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  color: #666;
}

.account-number {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

.account-status {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: #f0f0f0;
  color: #666;
}

.account-status.active {
  background-color: #e8f5e8;
  color: #2e7d32;
}

.account-actions {
  display: flex;
  gap: 1rem;
}

.account-actions .btn {
  flex: 1;
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

@media (max-width: 768px) {
  .account-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .account-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .account-actions {
    flex-direction: column;
  }
  
  .action-buttons {
    grid-template-columns: 1fr;
  }
}
</style>