const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');

// 模拟部署历史数据
const deployments = [
  {
    id: 'deploy-1',
    linkId: 'link-1',
    linkName: '测试链路（动态）',
    application: '快递中台-仓库订单管理系统-测试环境',
    version: 'v1.2.3',
    status: 'success',
    startTime: '2024-01-23T10:30:00Z',
    endTime: '2024-01-23T10:35:00Z',
    logs: '部署成功：\n1. 拉取代码完成\n2. 依赖安装完成\n3. 构建完成\n4. 部署到服务器成功'
  },
  {
    id: 'deploy-2',
    linkId: 'link-1',
    linkName: '测试链路（动态）',
    application: '应用2',
    version: 'v2.0.1',
    status: 'failed',
    startTime: '2024-01-22T14:20:00Z',
    endTime: '2024-01-22T14:22:30Z',
    logs: '部署失败：\n1. 拉取代码完成\n2. 依赖安装失败：npm install 错误\n错误信息：npm ERR! missing dependencies'
  }
];

// 获取部署历史
router.get('/', authMiddleware, (req, res) => {
  const { linkId } = req.query;
  let filteredDeployments = deployments;
  
  if (linkId) {
    filteredDeployments = deployments.filter(deploy => deploy.linkId === linkId);
  }
  
  res.json({
    success: true,
    data: filteredDeployments,
    total: filteredDeployments.length
  });
});

// 执行部署
router.post('/', authMiddleware, (req, res) => {
  const { linkId, linkName, application, version, deployScript } = req.body;
  
  // 模拟部署过程
  const newDeployment = {
    id: `deploy-${Date.now()}`,
    linkId,
    linkName,
    application,
    version,
    status: 'running',
    startTime: new Date().toISOString(),
    endTime: null,
    logs: '部署开始：\n1. 初始化部署环境\n2. 准备部署脚本'
  };
  
  deployments.unshift(newDeployment);
  
  // 模拟异步部署完成
  setTimeout(() => {
    const deploymentIndex = deployments.findIndex(d => d.id === newDeployment.id);
    if (deploymentIndex !== -1) {
      deployments[deploymentIndex] = {
        ...newDeployment,
        status: Math.random() > 0.3 ? 'success' : 'failed',
        endTime: new Date().toISOString(),
        logs: newDeployment.logs + '\n3. 拉取代码完成\n4. 依赖安装完成\n5. 构建完成\n6. 部署到服务器' + (Math.random() > 0.3 ? '成功' : '失败')
      };
    }
  }, 3000);
  
  res.json({
    success: true,
    data: newDeployment,
    message: '部署任务已启动'
  });
});

// 获取部署详情
router.get('/:id', authMiddleware, (req, res) => {
  const deployment = deployments.find(d => d.id === req.params.id);
  
  if (!deployment) {
    return res.status(404).json({
      success: false,
      message: '部署记录不存在'
    });
  }
  
  res.json({
    success: true,
    data: deployment
  });
});

module.exports = router;