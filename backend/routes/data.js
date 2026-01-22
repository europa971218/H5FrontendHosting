const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');

// 模拟应用统计数据
const applicationStats = {
  // 应用请求数
  requests: {
    total: 530000,
    trend: [
      { date: '2024-01-18', value: 85000 },
      { date: '2024-01-19', value: 92000 },
      { date: '2024-01-20', value: 88000 },
      { date: '2024-01-21', value: 95000 },
      { date: '2024-01-22', value: 89000 },
      { date: '2024-01-23', value: 81000 }
    ]
  },
  // 应用告警次数
  alerts: {
    total: 15,
    trend: [
      { date: '2024-01-18', value: 2 },
      { date: '2024-01-19', value: 3 },
      { date: '2024-01-20', value: 1 },
      { date: '2024-01-21', value: 4 },
      { date: '2024-01-22', value: 3 },
      { date: '2024-01-23', value: 2 }
    ]
  },
  // 应用部署次数
  deployments: {
    total: 77,
    trend: [
      { date: '2024-01-18', value: 12 },
      { date: '2024-01-19', value: 14 },
      { date: '2024-01-20', value: 11 },
      { date: '2024-01-21', value: 15 },
      { date: '2024-01-22', value: 13 },
      { date: '2024-01-23', value: 12 }
    ]
  },
  // 应用异常拦截次数
  exceptions: {
    total: 32,
    trend: [
      { date: '2024-01-18', value: 5 },
      { date: '2024-01-19', value: 6 },
      { date: '2024-01-20', value: 4 },
      { date: '2024-01-21', value: 7 },
      { date: '2024-01-22', value: 5 },
      { date: '2024-01-23', value: 5 }
    ]
  }
};

// 模拟应用部署次数排名TOP30
const deploymentRank = Array.from({ length: 30 }, (_, i) => ({
  rank: i + 1,
  applicationName: `应用${String.fromCharCode(65 + Math.floor(i / 5))}${i + 1}`,
  deployments: Math.floor(Math.random() * 50) + 5
}));

// 模拟应用部署包大小TOP10
const packageSizeRank = [
  { rank: 1, applicationName: '应用A1', packageSize: 45.2, unit: 'MB' },
  { rank: 2, applicationName: '应用B3', packageSize: 38.7, unit: 'MB' },
  { rank: 3, applicationName: '应用C2', packageSize: 35.1, unit: 'MB' },
  { rank: 4, applicationName: '应用D5', packageSize: 32.8, unit: 'MB' },
  { rank: 5, applicationName: '应用E4', packageSize: 30.5, unit: 'MB' },
  { rank: 6, applicationName: '应用A2', packageSize: 28.3, unit: 'MB' },
  { rank: 7, applicationName: '应用B1', packageSize: 26.9, unit: 'MB' },
  { rank: 8, applicationName: '应用C4', packageSize: 25.4, unit: 'MB' },
  { rank: 9, applicationName: '应用D2', packageSize: 23.7, unit: 'MB' },
  { rank: 10, applicationName: '应用E3', packageSize: 22.1, unit: 'MB' }
];

// 模拟资源使用数据
const resourceUsage = {
  cpu: {
    total: 100,
    used: 45.2,
    units: '%'
  },
  memory: {
    total: 16,
    used: 8.7,
    units: 'GB'
  },
  storage: {
    total: 500,
    used: 128.3,
    units: 'GB'
  },
  network: {
    total: 1000,
    used: 320.5,
    units: 'Mbps'
  },
  trend: [
    { time: '00:00', cpu: 30, memory: 6.2, storage: 125.1, network: 280.3 },
    { time: '04:00', cpu: 25, memory: 5.8, storage: 125.5, network: 260.1 },
    { time: '08:00', cpu: 40, memory: 7.5, storage: 126.2, network: 350.7 },
    { time: '12:00', cpu: 55, memory: 9.2, storage: 127.1, network: 420.5 },
    { time: '16:00', cpu: 62, memory: 10.5, storage: 127.8, network: 480.9 },
    { time: '20:00', cpu: 45, memory: 8.7, storage: 128.3, network: 320.5 }
  ]
};

// 模拟平台监控数据
const platformMonitoring = {
  totalApplications: 45,
  runningApplications: 42,
  stoppedApplications: 3,
  totalRequests: 1250000,
  successRate: 99.2,
  averageResponseTime: 150,
  activeTenants: 12,
  activeUsers: 8900
};

// 获取数据概览
router.get('/overview', authMiddleware, (req, res) => {
  const { type } = req.query;
  
  res.json({
    success: true,
    data: {
      applicationStats,
      deploymentRank,
      packageSizeRank,
      platformMonitoring
    }
  });
});

// 获取资源使用数据
router.get('/resource', authMiddleware, (req, res) => {
  res.json({
    success: true,
    data: resourceUsage
  });
});

// 获取应用统计趋势
router.get('/trend', authMiddleware, (req, res) => {
  const { metric, startDate, endDate } = req.query;
  
  // 根据请求的指标返回对应趋势数据
  let trendData = [];
  if (metric && applicationStats[metric]) {
    trendData = applicationStats[metric].trend;
  }
  
  // 如果提供了日期范围，过滤数据
  if (startDate && endDate) {
    trendData = trendData.filter(item => 
      item.date >= startDate && item.date <= endDate
    );
  }
  
  res.json({
    success: true,
    data: {
      metric,
      trend: trendData
    }
  });
});

// 获取应用部署排名
router.get('/deployment-rank', authMiddleware, (req, res) => {
  const { limit = 30 } = req.query;
  
  res.json({
    success: true,
    data: deploymentRank.slice(0, parseInt(limit)),
    total: deploymentRank.length
  });
});

// 获取应用包大小排名
router.get('/package-size-rank', authMiddleware, (req, res) => {
  res.json({
    success: true,
    data: packageSizeRank,
    total: packageSizeRank.length
  });
});

module.exports = router;