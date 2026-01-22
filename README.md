# 银行H5前端托管项目

## 项目介绍
这是一个银行H5前端托管项目，基于Vue 3 + Vite 2开发，包含数据概览、平台监控等功能模块。

## 技术栈
- **前端**：Vue 3 + Vite 2 + vue-router + ECharts + Element Plus
- **后端**：Express 4.x + Node.js

## 项目结构
```
├── src/                    # 前端源代码
│   ├── components/         # Vue组件
│   ├── views/              # 页面组件
│   │   ├── DataOverview.vue   # 数据概览页面
│   │   ├── Hosting.vue        # 托管页面
│   │   └── PlatformMonitoring.vue  # 平台监控页面
│   ├── App.vue             # 根组件
│   ├── main.js             # 入口文件
│   └── router/index.js     # 路由配置
├── backend/                # 后端代码
│   ├── routes/             # API路由
│   │   ├── applications.js   # 应用相关API
│   │   └── data.js           # 数据相关API
│   ├── index.js            # 后端入口文件
│   └── package.json        # 后端依赖
├── package.json            # 前端依赖
└── vite.config.js          # Vite配置
```

## 安装和启动

### 前端
1. 安装依赖
```bash
npm install
```

2. 启动开发服务器
```bash
npm run dev
```
前端将运行在 http://localhost:3002

3. 构建生产版本
```bash
npm run build
```

### 后端
1. 进入后端目录
```bash
cd backend
```

2. 安装依赖
```bash
npm install
```

3. 启动后端服务器
```bash
node index.js
```
后端将运行在 http://localhost:3003

## API端点

### 健康检查
- `GET /api/health` - 检查后端服务状态

### 应用管理
- `GET /api/applications` - 获取所有应用列表
- `GET /api/applications/:id` - 根据ID获取应用详情
- `POST /api/applications` - 创建新应用
- `PUT /api/applications/:id` - 更新应用信息
- `DELETE /api/applications/:id` - 删除应用

### 数据统计
- `GET /api/data/overview` - 获取数据概览
- `GET /api/data/resource` - 获取资源使用数据
- `GET /api/data/trend` - 获取应用统计趋势
- `GET /api/data/deployment-rank` - 获取应用部署排名
- `GET /api/data/package-size-rank` - 获取应用包大小排名

## 主要功能

### 数据概览
- 托管用户统计
- 托管应用统计
- 应用活跃度分析
- 应用请求数统计
- 应用告警次数统计
- 应用部署次数统计
- 应用异常拦截次数统计
- 应用部署次数排名TOP30
- 应用部署包大小TOP10

### 资源使用
- 资源使用情况表格
- OSS使用容量统计
- 平台告警次数统计
- 资源节省情况分析

## 注意事项
1. 确保Node.js版本为v14或以上
2. 前端和后端服务需要同时启动
3. 前端会自动从后端获取数据并渲染图表
4. 所有API返回格式统一为：
   ```json
   {
     "success": true/false,
     "data": {...}, // 数据内容
     "message": "..." // 提示信息
   }
   ```

## 开发说明
1. 导航栏内容：数据概览、租户管理、用户管理、机构管理、平台监控、告警中心、平台日志、操作审计、用户反馈、帮助中心、监控管理、版本管理
2. 数据概览页面包含应用运营和资源使用两个标签页
3. 所有图表使用ECharts绘制，支持响应式布局
4. 日期选择器使用Element Plus组件

## 浏览器兼容性
- Chrome (推荐)
- Firefox
- Safari
- Edge

## License
MIT