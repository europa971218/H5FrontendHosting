// 托管应用运营模型
class HostingApp {
  constructor(
    id,
    tenantId,
    systemType,
    productLine,
    product,
    businessArea,
    appName,
    appId,
    approverId,
    responsiblePerson,
    userType,
    accessType,
    testEnv,
    testEnvAccessTime,
    testEnvAccessPlan,
    productionEnv
  ) {
    this.id = id;
    this.tenantId = tenantId;
    this.systemType = systemType;
    this.productLine = productLine;
    this.product = product;
    this.businessArea = businessArea;
    this.appName = appName;
    this.appId = appId;
    this.approverId = approverId;
    this.responsiblePerson = responsiblePerson;
    this.userType = userType;
    this.accessType = accessType;
    this.testEnv = testEnv;
    this.testEnvAccessTime = testEnvAccessTime;
    this.testEnvAccessPlan = testEnvAccessPlan;
    this.productionEnv = productionEnv;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}

// 模拟托管应用数据
const hostingApps = [
  // 前端应用列表中的测试数据
  new HostingApp(
    '1',
    '租户1',
    '企业应用',
    '企业应用',
    '电子管理系统',
    '渝贵京FC区',
    '电子管理平台 web 端',
    '1,906,877,333,060,034,561',
    '982',
    '张三',
    'Web应用',
    '公开访问',
    '已移入',
    '2025/01/15 00:00',
    '2025年第一季度',
    '已移入'
  ),
  new HostingApp(
    '2',
    '租户2',
    '金融应用',
    '金融应用',
    '代发薪系统',
    '渝贵京FC区',
    '代发薪-企业端',
    '1,914,260,039,585,026,049',
    '983',
    '李四',
    'Web应用',
    '内网访问',
    '已移入',
    '2025/02/20 00:00',
    '2025年第一季度',
    '已移入'
  ),
  new HostingApp(
    '3',
    '租户2',
    '金融应用',
    '金融应用',
    '代发薪系统',
    '渝贵京FC区',
    '代发薪-企业端（内网）',
    '1,928,369,597,602,971,650',
    '984',
    '李四',
    'Web应用',
    '内网访问',
    '已移入',
    '2025/03/10 00:00',
    '2025年第一季度',
    '已移入'
  ),
  new HostingApp(
    '4',
    '租户1',
    '测试应用',
    '测试应用',
    '测试系统',
    '渝贵京FC区',
    '共享1016应用',
    '1,978,291,280,274,882,561',
    '985',
    '王五',
    'Web应用',
    '隔离环境',
    '已移入',
    '2025/04/05 00:00',
    '2025年第二季度',
    '已移入'
  ),
  new HostingApp(
    '5',
    '租户3',
    '测试应用',
    '测试应用',
    '测试系统',
    '渝贵京FC区',
    '隔离1016应用',
    '1,978,291,103,929,565,186',
    '986',
    '赵六',
    'Web应用',
    '隔离环境',
    '已移入',
    '2025/05/12 00:00',
    '2025年第二季度',
    '已移入'
  ),
  // 原有数据
  new HostingApp(
    '6',
    '租户1',
    '开发室',
    '综合系统',
    '资产全生命周期管理系统',
    '渝贵京FC区',
    '资产价值管理系统',
    '7249431679489268226',
    '982',
    '王雯珺',
    'PC',
    '内网访问',
    '已移入',
    '2023/11/14 06:45',
    '2023年第三季度',
    '已移入'
  ),
  new HostingApp(
    '7',
    '租户1',
    '开发室',
    '综合系统',
    '资产全生命周期管理系统',
    '渝贵京FC区',
    '资产价值管理系统',
    '1749203924663299564',
    '1097',
    '王雯珺',
    'PC',
    '内网访问',
    '已移入',
    '2023/11/14 06:45',
    '2023年第三季度',
    '已移入'
  )
];

// 托管应用数据操作
const hostingAppModel = {
  // 获取所有托管应用
  getAll: () => {
    return hostingApps;
  },
  
  // 根据ID查找托管应用
  findById: (id) => {
    return hostingApps.find(app => app.id === id);
  },
  
  // 根据系统类型查找托管应用
  findBySystemType: (systemType) => {
    return hostingApps.filter(app => app.systemType === systemType);
  },
  
  // 根据产品线查找托管应用
  findByProductLine: (productLine) => {
    return hostingApps.filter(app => app.productLine === productLine);
  },
  
  // 根据业务区域查找托管应用
  findByBusinessArea: (businessArea) => {
    return hostingApps.filter(app => app.businessArea === businessArea);
  },
  
  // 创建新托管应用
  create: (appData) => {
    const newApp = new HostingApp(
      `app-${Date.now()}`,
      appData.tenantId,
      appData.systemType,
      appData.productLine,
      appData.product,
      appData.businessArea,
      appData.appName,
      appData.appId,
      appData.approverId,
      appData.responsiblePerson,
      appData.userType,
      appData.accessType,
      appData.testEnv,
      appData.testEnvAccessTime,
      appData.testEnvAccessPlan,
      appData.productionEnv
    );
    hostingApps.push(newApp);
    return newApp;
  },
  
  // 更新托管应用信息
  update: (id, appData) => {
    const index = hostingApps.findIndex(app => app.id === id);
    if (index !== -1) {
      hostingApps[index] = {
        ...hostingApps[index],
        ...appData,
        updatedAt: new Date().toISOString()
      };
      return hostingApps[index];
    }
    return null;
  },
  
  // 删除托管应用
  delete: (id) => {
    const index = hostingApps.findIndex(app => app.id === id);
    if (index !== -1) {
      return hostingApps.splice(index, 1)[0];
    }
    return null;
  }
};

module.exports = {
  HostingApp,
  hostingAppModel
};