const jwt = require('jsonwebtoken');

// JWT密钥，与auth.js中的一致
const JWT_SECRET = 'your-secret-key';

// 生成JWT令牌
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role, tenantId: user.tenantId },
    JWT_SECRET,
    { expiresIn: '1h' } // 令牌有效期1小时
  );
};

// 系统管理员用户
const sysadminUser = {
  id: '1',
  username: 'caohan',
  role: 'sysadmin',
  tenantId: null
};

// 生成令牌
const token = generateToken(sysadminUser);
console.log('Generated token:', token);
console.log('Use this token in the Authorization header: Bearer', token);