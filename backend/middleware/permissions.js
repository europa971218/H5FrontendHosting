// 角色定义
const ROLES = {
  SYSADMIN: 'sysadmin',
  TENANTADMIN: 'tenantadmin',
  TENANT: 'tenant'
};

// 权限控制中间件
const checkPermission = (requiredRole) => {
  return (req, res, next) => {
    const { role, tenantId } = req.user;
    
    // 系统管理员拥有所有权限
    if (role === ROLES.SYSADMIN) {
      return next();
    }
    
    // 检查角色是否匹配
    if (role !== requiredRole) {
      return res.status(403).json({ success: false, message: '权限不足' });
    }
    
    // 对于租户管理员和租户，检查资源所属的租户ID是否匹配
    // 注意：这里假设资源ID包含租户ID，实际项目中可能需要从数据库查询
    const resourceTenantId = req.params.tenantId || req.body.tenantId;
    if (resourceTenantId && resourceTenantId !== tenantId) {
      return res.status(403).json({ success: false, message: '无权访问其他租户的资源' });
    }
    
    next();
  };
};

// 检查是否为系统管理员
const isSysAdmin = (req, res, next) => {
  if (req.user.role !== ROLES.SYSADMIN) {
    return res.status(403).json({ success: false, message: '需要系统管理员权限' });
  }
  next();
};

// 检查是否为租户管理员
const isTenantAdmin = (req, res, next) => {
  if (req.user.role !== ROLES.TENANTADMIN && req.user.role !== ROLES.SYSADMIN) {
    return res.status(403).json({ success: false, message: '需要租户管理员权限' });
  }
  next();
};

// 检查是否为租户成员
const isTenantMember = (req, res, next) => {
  if (req.user.role !== ROLES.TENANT && req.user.role !== ROLES.TENANTADMIN && req.user.role !== ROLES.SYSADMIN) {
    return res.status(403).json({ success: false, message: '需要租户权限' });
  }
  next();
};

module.exports = {
  ROLES,
  checkPermission,
  isSysAdmin,
  isTenantAdmin,
  isTenantMember
};
