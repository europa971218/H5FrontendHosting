<template>
  <div class="transactions">
    <h1>交易记录</h1>
    
    <div class="card">
      <h2>筛选条件</h2>
      <div class="filters">
        <div class="form-group">
          <label for="account">账户</label>
          <select id="account" class="form-control">
            <option value="all">全部账户</option>
            <option value="1">储蓄卡 (尾号0123)</option>
            <option value="2">信用卡 (尾号7890)</option>
            <option value="3">定期存款 (尾号012)</option>
          </select>
        </div>
        <div class="form-group">
          <label for="type">交易类型</label>
          <select id="type" class="form-control">
            <option value="all">全部类型</option>
            <option value="income">收入</option>
            <option value="expense">支出</option>
            <option value="transfer">转账</option>
          </select>
        </div>
        <div class="form-group">
          <label for="date">日期范围</label>
          <select id="date" class="form-control">
            <option value="today">今天</option>
            <option value="week">近7天</option>
            <option value="month">近30天</option>
            <option value="quarter">近90天</option>
            <option value="year">近1年</option>
          </select>
        </div>
        <div class="form-group">
          <button class="btn btn-primary" style="margin-top: 1.75rem;">查询</button>
        </div>
      </div>
    </div>
    
    <div class="card">
      <h2>交易列表</h2>
      <ul class="transaction-list">
        <li class="transaction-item" v-for="transaction in transactions" :key="transaction.id">
          <div class="transaction-header">
            <div class="transaction-type" :class="transaction.type">
              {{ transaction.type === 'income' ? '收入' : transaction.type === 'expense' ? '支出' : '转账' }}
            </div>
            <div class="transaction-amount" :class="transaction.type">
              {{ transaction.type === 'income' ? '+' : '-' }}¥{{ Math.abs(transaction.amount).toLocaleString() }}
            </div>
          </div>
          <div class="transaction-details">
            <div class="transaction-desc">{{ transaction.description }}</div>
            <div class="transaction-date">{{ transaction.date }}</div>
          </div>
          <div class="transaction-status" :class="transaction.status">
            {{ transaction.status === 'success' ? '成功' : transaction.status === 'pending' ? '处理中' : '失败' }}
          </div>
        </li>
      </ul>
    </div>
    
    <div class="pagination">
      <button class="btn">上一页</button>
      <span class="page-info">第 1 / 10 页</span>
      <button class="btn">下一页</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Transactions',
  data() {
    return {
      transactions: [
        {
          id: 1,
          type: 'income',
          amount: 5000.00,
          description: '工资收入',
          date: '2026-01-22 10:30:00',
          status: 'success'
        },
        {
          id: 2,
          type: 'expense',
          amount: 299.00,
          description: '网上购物',
          date: '2026-01-21 15:45:00',
          status: 'success'
        },
        {
          id: 3,
          type: 'transfer',
          amount: 1000.00,
          description: '转账给张三',
          date: '2026-01-20 09:15:00',
          status: 'success'
        },
        {
          id: 4,
          type: 'expense',
          amount: 150.00,
          description: '餐饮消费',
          date: '2026-01-19 18:30:00',
          status: 'success'
        },
        {
          id: 5,
          type: 'income',
          amount: 200.00,
          description: '理财收益',
          date: '2026-01-18 14:20:00',
          status: 'success'
        }
      ]
    }
  }
}
</script>

<style scoped>
.transactions {
  max-width: 800px;
  margin: 0 auto;
}

.filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.transaction-list {
  list-style: none;
}

.transaction-item {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
}

.transaction-item:hover {
  background-color: #f8f9fa;
}

.transaction-item:last-child {
  border-bottom: none;
}

.transaction-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.transaction-type {
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
}

.transaction-type.income {
  background-color: #e8f5e8;
  color: #2e7d32;
}

.transaction-type.expense {
  background-color: #ffebee;
  color: #c62828;
}

.transaction-type.transfer {
  background-color: #e3f2fd;
  color: #1565c0;
}

.transaction-amount {
  font-weight: 700;
  font-size: 1.1rem;
}

.transaction-amount.income {
  color: #2e7d32;
}

.transaction-amount.expense,
.transaction-amount.transfer {
  color: #c62828;
}

.transaction-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

.transaction-status {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.transaction-status.success {
  background-color: #e8f5e8;
  color: #2e7d32;
}

.transaction-status.pending {
  background-color: #fff3e0;
  color: #ef6c00;
}

.transaction-status.failed {
  background-color: #ffebee;
  color: #c62828;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.page-info {
  color: #666;
}

@media (max-width: 768px) {
  .filters {
    grid-template-columns: 1fr;
  }
  
  .transaction-details {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
}
</style>