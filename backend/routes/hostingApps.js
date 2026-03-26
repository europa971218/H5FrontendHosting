const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { isTenantAdmin } = require('../middleware/permissions');
const appListMockData = require('../mock/appListMockData.json');

// 获取所有托管应用
router.get('/', authMiddleware, (req, res) => {
  const { role, tenantId } = req.user;
  let hostingApps = [...appListMockData];
  
  // 系统管理员可以看到所有应用
  if (role !== 'sysadmin') {
    // 租户管理员和租户只能看到自己租户的应用
    hostingApps = hostingApps.filter(app => app.tenant === tenantId);
  }
  
  res.json(hostingApps);
});

// 根据ID获取托管应用
router.get('/:id', authMiddleware, (req, res) => {
  const app = appListMockData.find(app => app.appId === req.params.id);
  const { role, tenantId } = req.user;
  
  if (!app) {
    return res.status(404).json({
      success: false,
      message: '托管应用不存在'
    });
  }
  
  // 检查权限：只有系统管理员或应用所属租户的用户才能查看
  if (role !== 'sysadmin' && app.tenant !== tenantId) {
    return res.status(403).json({
      success: false,
      message: '无权访问该托管应用'
    });
  }
  
  res.json(app);
});

// 创建新托管应用 - 需要租户管理员或系统管理员权限
router.post('/', authMiddleware, isTenantAdmin, (req, res) => {
  const { role, tenantId } = req.user;
  
  // 系统管理员可以指定租户，租户管理员只能创建自己租户的应用
  const newAppData = {
    ...req.body,
    tenant: role === 'sysadmin' ? req.body.tenant : tenantId,
    appId: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    createdAt: new Date().toLocaleDateString('zh-CN')
  };
  
  // 模拟创建应用（实际上不会修改原始数据文件）
  res.status(201).json({
    success: true,
    data: newAppData,
    message: '托管应用创建成功'
  });
});

// 更新托管应用 - 需要租户管理员或系统管理员权限
router.put('/:id', authMiddleware, isTenantAdmin, (req, res) => {
  const existingApp = appListMockData.find(app => app.appId === req.params.id);
  const { role, tenantId } = req.user;
  
  if (!existingApp) {
    return res.status(404).json({
      success: false,
      message: '托管应用不存在'
    });
  }
  
  // 检查权限：只有系统管理员或应用所属租户的管理员才能更新
  if (role !== 'sysadmin' && existingApp.tenant !== tenantId) {
    return res.status(403).json({
      success: false,
      message: '无权更新该托管应用'
    });
  }
  
  // 租户管理员不能修改租户
  const updateData = {
    ...existingApp,
    ...req.body
  };
  if (role !== 'sysadmin') {
    delete updateData.tenant;
  }
  
  // 模拟更新应用（实际上不会修改原始数据文件）
  res.json({
    success: true,
    data: updateData,
    message: '托管应用更新成功'
  });
});

// 删除托管应用 - 需要租户管理员或系统管理员权限
router.delete('/:id', authMiddleware, isTenantAdmin, (req, res) => {
  const existingApp = appListMockData.find(app => app.appId === req.params.id);
  const { role, tenantId } = req.user;
  
  if (!existingApp) {
    return res.status(404).json({
      success: false,
      message: '托管应用不存在'
    });
  }
  
  // 检查权限：只有系统管理员或应用所属租户的管理员才能删除
  if (role !== 'sysadmin' && existingApp.tenant !== tenantId) {
    return res.status(403).json({
      success: false,
      message: '无权删除该托管应用'
    });
  }
  
  // 模拟删除应用（实际上不会修改原始数据文件）
  res.json({
    success: true,
    message: '托管应用删除成功'
  });
});

// 根据系统类型获取托管应用
router.get('/filter/system-type/:systemType', authMiddleware, (req, res) => {
  const { systemType } = req.params;
  const { role, tenantId } = req.user;
  let apps = appListMockData.filter(app => app.systemType === systemType);
  
  // 租户只能看到自己租户的应用
  if (role !== 'sysadmin') {
    apps = apps.filter(app => app.tenant === tenantId);
  }
  
  res.json(apps);
});

// 根据产品线获取托管应用
router.get('/filter/product-line/:productLine', authMiddleware, (req, res) => {
  const { productLine } = req.params;
  const { role, tenantId } = req.user;
  let apps = appListMockData.filter(app => app.productLine === productLine);
  
  // 租户只能看到自己租户的应用
  if (role !== 'sysadmin') {
    apps = apps.filter(app => app.tenant === tenantId);
  }
  
  res.json(apps);
});

// 根据业务区域获取托管应用
router.get('/filter/business-area/:businessArea', authMiddleware, (req, res) => {
  const { businessArea } = req.params;
  const { role, tenantId } = req.user;
  // 由于mock数据中没有businessArea字段，这里返回空数组
  let apps = [];
  
  // 租户只能看到自己租户的应用
  if (role !== 'sysadmin') {
    apps = apps.filter(app => app.tenant === tenantId);
  }
  
  res.json(apps);
});

module.exports = router;