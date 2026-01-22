const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// 创建Express应用
const app = express();
const port = process.env.PORT || 3003;

// 配置中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 配置静态文件服务
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 导入路由
const applicationRoutes = require('./routes/applications');
const dataRoutes = require('./routes/data');
const userRoutes = require('./routes/users');
const deploymentRoutes = require('./routes/deployments');

// 使用路由
app.use('/api/applications', applicationRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/users', userRoutes);
app.use('/api/deployments', deploymentRoutes);

// 健康检查路由
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend server is running' });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
  console.log(`API endpoints:`);
  console.log(`  GET  /api/health - Health check`);
  console.log(`  GET  /api/applications - Get all applications`);
  console.log(`  GET  /api/applications/:id - Get application by ID`);
  console.log(`  POST /api/applications - Create new application`);
  console.log(`  PUT  /api/applications/:id - Update application`);
  console.log(`  DELETE /api/applications/:id - Delete application`);
  console.log(`  GET  /api/data/overview - Get data overview`);
  console.log(`  GET  /api/data/resource - Get resource usage`);
  console.log(`  POST /api/users/avatar - Upload user avatar`);
  console.log(`  GET  /api/users/avatar/:filename - Get user avatar`);
});
