const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { isTenantAdmin } = require('../middleware/permissions');

// 模拟应用数据
const applications = [
  {
    id: '1',
    name: '银行APP首页',
    tenantId: 'tenant-001',
    status: 'running',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    deployments: 15,
    packageSize: 24.5,
    requests: 125000,
    alerts: 3
  },
  {
    id: '2',
    name: '转账功能',
    tenantId: 'tenant-001',
    status: 'running',
    createdAt: '2024-01-16T09:15:00Z',
    updatedAt: '2024-01-21T11:45:00Z',
    deployments: 23,
    packageSize: 18.2,
    requests: 98000,
    alerts: 5
  },
  {
    id: '3',
    name: '理财产品',
    tenantId: 'tenant-002',
    status: 'running',
    createdAt: '2024-01-17T14:20:00Z',
    updatedAt: '2024-01-19T08:10:00Z',
    deployments: 8,
    packageSize: 32.1,
    requests: 76000,
    alerts: 1
  },
  {
    id: '4',
    name: '信用卡服务',
    tenantId: 'tenant-002',
    status: 'running',
    createdAt: '2024-01-18T16:45:00Z',
    updatedAt: '2024-01-22T15:20:00Z',
    deployments: 12,
    packageSize: 28.7,
    requests: 89000,
    alerts: 2
  },
  {
    id: '5',
    name: '个人中心',
    tenantId: 'tenant-001',
    status: 'running',
    createdAt: '2024-01-19T11:30:00Z',
    updatedAt: '2024-01-23T10:50:00Z',
    deployments: 19,
    packageSize: 22.3,
    requests: 142000,
    alerts: 4
  }
];

// 获取所有应用
router.get('/', authMiddleware, (req, res) => {
  const { role, tenantId } = req.user;
  let filteredApps = applications;
  
  // 系统管理员可以看到所有应用
  if (role === 'sysadmin') {
    filteredApps = applications;
  } 
  // 租户管理员和租户只能看到自己租户的应用
  else {
    filteredApps = applications.filter(app => app.tenantId === tenantId);
  }
  
  res.json({
    success: true,
    data: filteredApps,
    total: filteredApps.length
  });
});

// 根据ID获取应用
router.get('/:id', authMiddleware, (req, res) => {
  const app = applications.find(a => a.id === req.params.id);
  const { role, tenantId } = req.user;
  
  if (!app) {
    return res.status(404).json({
      success: false,
      message: '应用不存在'
    });
  }
  
  // 检查权限：只有系统管理员或应用所属租户的用户才能查看
  if (role !== 'sysadmin' && app.tenantId !== tenantId) {
    return res.status(403).json({
      success: false,
      message: '无权访问该应用'
    });
  }
  
  res.json({
    success: true,
    data: app
  });
});

// 创建新应用 - 需要租户管理员或系统管理员权限
router.post('/', authMiddleware, isTenantAdmin, (req, res) => {
  const { tenantId } = req.user;
  
  // 系统管理员可以指定租户ID，租户管理员只能创建自己租户的应用
  const newAppTenantId = req.user.role === 'sysadmin' ? req.body.tenantId : tenantId;
  
  const newApp = {
    id: `app-${Date.now()}`,
    ...req.body,
    tenantId: newAppTenantId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  applications.push(newApp);
  res.status(201).json({
    success: true,
    data: newApp,
    message: '应用创建成功'
  });
});

// 更新应用 - 需要租户管理员或系统管理员权限
router.put('/:id', authMiddleware, isTenantAdmin, (req, res) => {
  const index = applications.findIndex(a => a.id === req.params.id);
  const { role, tenantId } = req.user;
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: '应用不存在'
    });
  }
  
  const app = applications[index];
  
  // 检查权限：只有系统管理员或应用所属租户的管理员才能更新
  if (role !== 'sysadmin' && app.tenantId !== tenantId) {
    return res.status(403).json({
      success: false,
      message: '无权更新该应用'
    });
  }
  
  applications[index] = {
    ...applications[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  
  res.json({
    success: true,
    data: applications[index],
    message: '应用更新成功'
  });
});

// 删除应用 - 需要租户管理员或系统管理员权限
router.delete('/:id', authMiddleware, isTenantAdmin, (req, res) => {
  const index = applications.findIndex(a => a.id === req.params.id);
  const { role, tenantId } = req.user;
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: '应用不存在'
    });
  }
  
  const app = applications[index];
  
  // 检查权限：只有系统管理员或应用所属租户的管理员才能删除
  if (role !== 'sysadmin' && app.tenantId !== tenantId) {
    return res.status(403).json({
      success: false,
      message: '无权删除该应用'
    });
  }
  
  applications.splice(index, 1);
  res.json({
    success: true,
    message: '应用删除成功'
  });
});

module.exports = router;