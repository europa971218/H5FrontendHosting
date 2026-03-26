const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const { isTenantAdmin } = require('../middleware/permissions');
const { hostingAppModel } = require('../models/hostingApp');

// 获取所有托管应用
router.get('/', authMiddleware, (req, res) => {
  const { role, tenantId } = req.user;
  let hostingApps = [];
  
  // 系统管理员可以看到所有应用
  if (role === 'sysadmin') {
    hostingApps = hostingAppModel.getAll();
  } 
  // 租户管理员和租户只能看到自己租户的应用
  else {
    hostingApps = hostingAppModel.getAll().filter(app => app.tenantId === tenantId);
  }
  
  res.json({
    success: true,
    data: hostingApps,
    total: hostingApps.length
  });
});

// 根据ID获取托管应用
router.get('/:id', authMiddleware, (req, res) => {
  const app = hostingAppModel.findById(req.params.id);
  const { role, tenantId } = req.user;
  
  if (!app) {
    return res.status(404).json({
      success: false,
      message: '托管应用不存在'
    });
  }
  
  // 检查权限：只有系统管理员或应用所属租户的用户才能查看
  if (role !== 'sysadmin' && app.tenantId !== tenantId) {
    return res.status(403).json({
      success: false,
      message: '无权访问该托管应用'
    });
  }
  
  res.json({
    success: true,
    data: app
  });
});

// 创建新托管应用 - 需要租户管理员或系统管理员权限
router.post('/', authMiddleware, isTenantAdmin, (req, res) => {
  const { role, tenantId } = req.user;
  
  // 系统管理员可以指定租户ID，租户管理员只能创建自己租户的应用
  const newAppData = {
    ...req.body,
    tenantId: role === 'sysadmin' ? req.body.tenantId : tenantId
  };
  
  const newApp = hostingAppModel.create(newAppData);
  
  res.status(201).json({
    success: true,
    data: newApp,
    message: '托管应用创建成功'
  });
});

// 更新托管应用 - 需要租户管理员或系统管理员权限
router.put('/:id', authMiddleware, isTenantAdmin, (req, res) => {
  const existingApp = hostingAppModel.findById(req.params.id);
  const { role, tenantId } = req.user;
  
  if (!existingApp) {
    return res.status(404).json({
      success: false,
      message: '托管应用不存在'
    });
  }
  
  // 检查权限：只有系统管理员或应用所属租户的管理员才能更新
  if (role !== 'sysadmin' && existingApp.tenantId !== tenantId) {
    return res.status(403).json({
      success: false,
      message: '无权更新该托管应用'
    });
  }
  
  // 租户管理员不能修改租户ID
  const updateData = {
    ...req.body
  };
  if (role !== 'sysadmin') {
    delete updateData.tenantId;
  }
  
  const app = hostingAppModel.update(req.params.id, updateData);
  
  res.json({
    success: true,
    data: app,
    message: '托管应用更新成功'
  });
});

// 删除托管应用 - 需要租户管理员或系统管理员权限
router.delete('/:id', authMiddleware, isTenantAdmin, (req, res) => {
  const existingApp = hostingAppModel.findById(req.params.id);
  const { role, tenantId } = req.user;
  
  if (!existingApp) {
    return res.status(404).json({
      success: false,
      message: '托管应用不存在'
    });
  }
  
  // 检查权限：只有系统管理员或应用所属租户的管理员才能删除
  if (role !== 'sysadmin' && existingApp.tenantId !== tenantId) {
    return res.status(403).json({
      success: false,
      message: '无权删除该托管应用'
    });
  }
  
  const app = hostingAppModel.delete(req.params.id);
  
  res.json({
    success: true,
    message: '托管应用删除成功'
  });
});

// 根据系统类型获取托管应用
router.get('/filter/system-type/:systemType', authMiddleware, (req, res) => {
  const { systemType } = req.params;
  const { role, tenantId } = req.user;
  let apps = hostingAppModel.findBySystemType(systemType);
  
  // 租户只能看到自己租户的应用
  if (role !== 'sysadmin') {
    apps = apps.filter(app => app.tenantId === tenantId);
  }
  
  res.json({
    success: true,
    data: apps,
    total: apps.length
  });
});

// 根据产品线获取托管应用
router.get('/filter/product-line/:productLine', authMiddleware, (req, res) => {
  const { productLine } = req.params;
  const { role, tenantId } = req.user;
  let apps = hostingAppModel.findByProductLine(productLine);
  
  // 租户只能看到自己租户的应用
  if (role !== 'sysadmin') {
    apps = apps.filter(app => app.tenantId === tenantId);
  }
  
  res.json({
    success: true,
    data: apps,
    total: apps.length
  });
});

// 根据业务区域获取托管应用
router.get('/filter/business-area/:businessArea', authMiddleware, (req, res) => {
  const { businessArea } = req.params;
  const { role, tenantId } = req.user;
  let apps = hostingAppModel.findByBusinessArea(businessArea);
  
  // 租户只能看到自己租户的应用
  if (role !== 'sysadmin') {
    apps = apps.filter(app => app.tenantId === tenantId);
  }
  
  res.json({
    success: true,
    data: apps,
    total: apps.length
  });
});

module.exports = router;