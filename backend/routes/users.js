const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { generateToken, authMiddleware } = require('../middleware/auth');
const { isSysAdmin, isTenantAdmin } = require('../middleware/permissions');
const { userModel } = require('../models/user');

// 确保上传目录存在
const uploadDir = path.join(__dirname, '../uploads/avatars');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 配置multer存储
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, `avatar-${uniqueSuffix}${fileExtension}`);
  }
});

// 文件过滤
const fileFilter = (req, file, cb) => {
  // 只允许图片文件
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('请上传图片文件'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB
  }
});

// 用户注册路由
router.post('/register', (req, res) => {
  try {
    const { username, password, email, role, tenantId } = req.body;
    
    // 验证必填字段
    if (!username || !password || !email) {
      return res.status(400).json({ success: false, message: '用户名、密码和邮箱不能为空' });
    }
    
    // 检查用户名是否已存在
    const existingUser = userModel.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ success: false, message: '用户名已存在' });
    }
    
    // 创建新用户
    const newUser = userModel.create({
      username,
      password,
      email,
      role,
      tenantId
    });
    
    // 移除密码字段
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json({
      success: true,
      message: '用户注册成功',
      data: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || '注册失败'
    });
  }
});

// 用户登录路由
router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    
    // 验证必填字段
    if (!username || !password) {
      return res.status(400).json({ success: false, message: '用户名和密码不能为空' });
    }
    
    // 查找用户
    const user = userModel.findByUsername(username);
    if (!user) {
      return res.status(401).json({ success: false, message: '用户名或密码错误' });
    }
    
    // 验证密码
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: '用户名或密码错误' });
    }
    
    // 生成JWT令牌
    const token = generateToken(user);
    
    // 移除密码字段
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      message: '登录成功',
      data: {
        user: userWithoutPassword,
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || '登录失败'
    });
  }
});

// 获取当前用户信息
router.get('/info', authMiddleware, (req, res) => {
  try {
    const user = userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: '用户不存在' });
    }
    
    // 移除密码字段
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      data: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || '获取用户信息失败'
    });
  }
});

// 更新用户信息
router.put('/info', authMiddleware, (req, res) => {
  try {
    const { username, email } = req.body;
    
    // 更新用户信息
    const updatedUser = userModel.update(req.user.id, { username, email });
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: '用户不存在' });
    }
    
    // 移除密码字段
    const { password: _, ...userWithoutPassword } = updatedUser;
    
    res.json({
      success: true,
      message: '信息更新成功',
      data: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || '更新用户信息失败'
    });
  }
});

// 头像上传路由
router.post('/avatar', authMiddleware, upload.single('avatar'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: '请选择要上传的图片' });
    }
    
    // 返回头像URL
    const avatarUrl = `/uploads/avatars/${req.file.filename}`;
    
    // 更新用户头像
    userModel.update(req.user.id, { avatar: req.file.filename });
    
    res.status(200).json({
      success: true,
      message: '头像上传成功',
      data: {
        avatarUrl: avatarUrl,
        filename: req.file.filename,
        size: req.file.size
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || '头像上传失败'
    });
  }
});

// 获取头像路由
router.get('/avatar/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(uploadDir, filename);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ success: false, message: '头像文件不存在' });
  }
});

// 获取所有用户（系统管理员用）
router.get('/', authMiddleware, isSysAdmin, (req, res) => {
  try {
    const users = userModel.getAll();
    // 移除密码字段
    const usersWithoutPassword = users.map(({ password, ...user }) => user);
    
    res.json({
      success: true,
      data: usersWithoutPassword,
      total: usersWithoutPassword.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || '获取用户列表失败'
    });
  }
});

// 获取指定租户的所有用户（租户管理员用）
router.get('/tenant', authMiddleware, isTenantAdmin, (req, res) => {
  try {
    const users = userModel.getByTenantId(req.user.tenantId);
    // 移除密码字段
    const usersWithoutPassword = users.map(({ password, ...user }) => user);
    
    res.json({
      success: true,
      data: usersWithoutPassword,
      total: usersWithoutPassword.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || '获取租户用户列表失败'
    });
  }
});

// 删除用户（系统管理员和租户管理员用）
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const userId = req.params.id;
    const userToDelete = userModel.findById(userId);
    
    if (!userToDelete) {
      return res.status(404).json({ success: false, message: '用户不存在' });
    }
    
    // 检查权限：系统管理员可以删除所有用户，租户管理员只能删除自己租户的用户
    if (req.user.role !== 'sysadmin' && req.user.tenantId !== userToDelete.tenantId) {
      return res.status(403).json({ success: false, message: '无权删除其他租户的用户' });
    }
    
    userModel.delete(userId);
    
    res.json({
      success: true,
      message: '用户删除成功'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || '删除用户失败'
    });
  }
});

module.exports = router;
