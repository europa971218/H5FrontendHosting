const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// 创建Express应用
const app = express();
const port = process.env.PORT || 3005;

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
const hostingAppRoutes = require('./routes/hostingApps');

// 使用路由
app.use('/api/applications', applicationRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/users', userRoutes);
app.use('/api/deployments', deploymentRoutes);
app.use('/api/hosting-apps', hostingAppRoutes);

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
  console.log(`  GET  /api/hosting-apps - Get all hosting applications`);
  console.log(`  GET  /api/hosting-apps/:id - Get hosting application by ID`);
  console.log(`  POST /api/hosting-apps - Create new hosting application`);
  console.log(`  PUT  /api/hosting-apps/:id - Update hosting application`);
  console.log(`  DELETE /api/hosting-apps/:id - Delete hosting application`);
  console.log(`  GET  /api/hosting-apps/filter/system-type/:systemType - Get hosting apps by system type`);
  console.log(`  GET  /api/hosting-apps/filter/product-line/:productLine - Get hosting apps by product line`);
  console.log(`  GET  /api/hosting-apps/filter/business-area/:businessArea - Get hosting apps by business area`);
  console.log(`  GET  /api/data/overview - Get data overview`);
  console.log(`  GET  /api/data/resource - Get resource usage`);
  console.log(`  POST /api/users/avatar - Upload user avatar`);
  console.log(`  GET  /api/users/avatar/:filename - Get user avatar`);
});
