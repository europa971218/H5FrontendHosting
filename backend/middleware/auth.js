const jwt = require('jsonwebtoken');

// JWT密钥，实际项目中应该从环境变量获取
const JWT_SECRET = 'your-secret-key';

// 生成JWT令牌
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role, tenantId: user.tenantId },
    JWT_SECRET,
    { expiresIn: '1h' } // 令牌有效期1小时
  );
};

// JWT验证中间件
const authMiddleware = (req, res, next) => {
  // 从请求头获取Authorization
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ success: false, message: '访问令牌缺失' });
  }
  
  // 提取令牌
  const token = authHeader.replace('Bearer ', '');
  
  try {
    // 验证令牌
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // 将用户信息保存到请求对象中
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: '无效的访问令牌' });
  }
};

module.exports = {
  generateToken,
  authMiddleware
};
