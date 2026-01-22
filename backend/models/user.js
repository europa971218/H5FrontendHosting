const bcrypt = require('bcryptjs');
const { ROLES } = require('../middleware/permissions');

// 用户模型
class User {
  constructor(id, username, password, role, tenantId, email, avatar) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role;
    this.tenantId = tenantId;
    this.email = email;
    this.avatar = avatar || 'default-avatar.png';
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}

// 模拟用户数据
const users = [
  // 系统管理员
  new User(
    '1',
    'caohan',
    bcrypt.hashSync('4321·', 10), // 密码：sysadmin123
    ROLES.SYSADMIN,
    null,
    'sysadmin@example.com'
  ),
  // 租户管理员1
  new User(
    '2',
    'tenantadmin1',
    bcrypt.hashSync('tenantadmin123', 10), // 密码：tenantadmin123
    ROLES.TENANTADMIN,
    'tenant-001',
    'tenantadmin1@example.com'
  ),
  // 租户管理员2
  new User(
    '3',
    'tenantadmin2',
    bcrypt.hashSync('tenantadmin123', 10), // 密码：tenantadmin123
    ROLES.TENANTADMIN,
    'tenant-002',
    'tenantadmin2@example.com'
  ),
  // 租户用户1
  new User(
    '4',
    'tenantuser1',
    bcrypt.hashSync('tenantuser123', 10), // 密码：tenantuser123
    ROLES.TENANT,
    'tenant-001',
    'tenantuser1@example.com'
  ),
  // 租户用户2
  new User(
    '5',
    'tenantuser2',
    bcrypt.hashSync('tenantuser123', 10), // 密码：tenantuser123
    ROLES.TENANT,
    'tenant-002',
    'tenantuser2@example.com'
  ),
  // 新系统管理员
  new User(
    '6',
    'xtcaohan',
    bcrypt.hashSync('4321·', 10), // 密码：4321·
    ROLES.SYSADMIN,
    null,
    'xtcaohan@example.com'
  ),
  // 新租户管理员
  new User(
    '7',
    'zhglcaohan',
    bcrypt.hashSync('4321·', 10), // 密码：4321·
    ROLES.TENANTADMIN,
    'tenant-003',
    'zhglcaohan@example.com'
  ),
  // 新租户用户
  new User(
    '8',
    'caohan',
    bcrypt.hashSync('4321·', 10), // 密码：4321·
    ROLES.TENANT,
    'tenant-003',
    'caohan@example.com'
  )
];

// 用户数据操作
const userModel = {
  // 根据用户名查找用户
  findByUsername: (username) => {
    return users.find(user => user.username === username);
  },
  
  // 根据ID查找用户
  findById: (id) => {
    return users.find(user => user.id === id);
  },
  
  // 创建新用户
  create: (userData) => {
    const hashedPassword = bcrypt.hashSync(userData.password, 10);
    const newUser = new User(
      `user-${Date.now()}`,
      userData.username,
      hashedPassword,
      userData.role || ROLES.TENANT,
      userData.tenantId,
      userData.email,
      userData.avatar
    );
    users.push(newUser);
    return newUser;
  },
  
  // 更新用户信息
  update: (id, userData) => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
      if (userData.password) {
        userData.password = bcrypt.hashSync(userData.password, 10);
      }
      users[index] = { ...users[index], ...userData, updatedAt: new Date().toISOString() };
      return users[index];
    }
    return null;
  },
  
  // 删除用户
  delete: (id) => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
    return null;
  },
  
  // 获取所有用户（系统管理员用）
  getAll: () => {
    return users;
  },
  
  // 获取指定租户的所有用户（租户管理员用）
  getByTenantId: (tenantId) => {
    return users.filter(user => user.tenantId === tenantId);
  }
};

module.exports = {
  User,
  userModel
};
