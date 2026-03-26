<template>
  <div class="version-management">
    <!-- 标签页组件 -->
    <div class="tab-container">
      <div class="version-tabs">
        <button 
          class="version-tab" 
          :class="{ active: activeTab === 'versionList' }" 
          @click="activeTab = 'versionList'"
        >
          版本列表
        </button>
        <button 
          class="version-tab" 
          :class="{ active: activeTab === 'deploymentData' }" 
          @click="activeTab = 'deploymentData'"
        >
          部署发布数据
        </button>
      </div>

      <!-- 版本列表标签页内容 -->
      <div v-if="activeTab === 'versionList'" class="tab-content">
        <SearchFilterTable :data="versionData" />
      </div>

      <!-- 部署发布数据标签页内容 -->
      <div v-if="activeTab === 'deploymentData'" class="tab-content">
        <DeployAndPublishDataList :data="deploymentData" />
      </div>
    </div>
  </div>
</template>

<script>
import SearchFilterTable from '../components/SearchFilterTable.vue'
import DeployAndPublishDataList from '../components/deployAndPublishDataList.vue'

export default {
  name: 'VersionManagement',
  components: {
    SearchFilterTable,
    DeployAndPublishDataList
  },
  data() {
    return {
      // 激活的标签页
      activeTab: 'versionList',
      // 版本列表数据
      versionData: [
        {
          appName: '应用发布系统',
          uploader: '应用发布管理系统',
          environment: 'sit',
          md5: 'fa46c4573fbea0020091269792e47c78',
          uploadTime: '2025-05-12 15:10:15'
        },
        {
          appName: '应用发布系统',
          uploader: '应用发布管理系统',
          environment: 'sit',
          md5: 'fa46c4573fbea0020091269792e47c78',
          uploadTime: '2025-05-12 17:47:28'
        },
        {
          appName: '应用发布系统',
          uploader: '应用发布管理系统',
          environment: 'sit',
          md5: 'e6e612b87cc88113a13a00300795386',
          uploadTime: '2025-05-18 12:11:21'
        },
        {
          appName: '应用发布系统',
          uploader: '应用发布管理系统',
          environment: 'sit',
          md5: 'e6e612b87cc88113a13a00300795386',
          uploadTime: '2025-05-19 16:49:30'
        },
        {
          appName: '应用发布系统',
          uploader: '应用发布管理系统',
          environment: 'sit',
          md5: 'fa46c4573fbea0020091269792e47c78',
          uploadTime: '2025-07-10 14:44:35'
        },
        {
          appName: '应用发布系统',
          uploader: '应用发布管理系统',
          environment: 'sit',
          md5: 'fa46c4573fbea0020091269792e47c78',
          uploadTime: '2025-07-10 14:44:35'
        },
        {
          appName: '餐饮系统(广州广百)',
          uploader: '应用发布管理系统',
          environment: 'sit',
          md5: '07d2b2205c8bce4060a298b7308f7107',
          uploadTime: '2025-08-19 16:29:13'
        },
        {
          appName: '餐饮系统(客户Demo)',
          uploader: '应用发布管理系统',
          environment: 'sit',
          md5: 'a5f9379ad03b372a0a6b777c22fdb',
          uploadTime: '2025-08-21 10:00:53'
        },
        {
          appName: '业务运营门户(前端-营销)',
          uploader: '应用发布管理系统',
          environment: 'sit',
          md5: '4a8efc1a10b42a6752e5e2d976751e',
          uploadTime: '2025-10-11 14:38:21'
        },
        {
          appName: 'HS开发新门户',
          uploader: '应用发布管理系统',
          environment: 'prod',
          md5: 'a13f815368e83e68c76787067a826',
          uploadTime: '2025-11-18 10:59:59'
        }
      ],
      // 部署发布数据
      deploymentData: [
        {
          tenant: '广东农信',
          appName: '电子管理平台 web 端',
          appId: '18138565155772782',
          createdAt: '2025-12-20 10:30:00',
          totalDeployments: 15,
          manualDeployments: 5,
          latestDeploymentTime: '2025-12-20 10:30:00',
          rollbackCount: 2,
          configModifyCount: 3,
          currentPackageVersions: 8,
          statisticsPeriod: '2025-12',
          totalPackageSize: 2.5,
          maxPackageSize: 500,
          avgPackageSize: 250,
          appTags: '生产环境,Web应用'
        },
        {
          tenant: '广东农信',
          appName: '代发薪-企业端',
          appId: '17835446687603079',
          createdAt: '2025-12-15 14:20:00',
          totalDeployments: 20,
          manualDeployments: 8,
          latestDeploymentTime: '2025-12-15 14:20:00',
          rollbackCount: 1,
          configModifyCount: 5,
          currentPackageVersions: 10,
          statisticsPeriod: '2025-12',
          totalPackageSize: 3.2,
          maxPackageSize: 800,
          avgPackageSize: 320,
          appTags: '生产环境,企业端'
        },
        {
          tenant: '广东农信',
          appName: '代发薪-企业端（内网）',
          appId: '18138564290330709',
          createdAt: '2025-12-10 09:15:00',
          totalDeployments: 12,
          manualDeployments: 3,
          latestDeploymentTime: '2025-12-10 09:15:00',
          rollbackCount: 0,
          configModifyCount: 2,
          currentPackageVersions: 6,
          statisticsPeriod: '2025-12',
          totalPackageSize: 1.8,
          maxPackageSize: 400,
          avgPackageSize: 200,
          appTags: '测试环境,内网应用'
        },
        {
          tenant: '广东农信',
          appName: '共享1016应用',
          appId: '181385653410758882',
          createdAt: '2025-12-05 16:45:00',
          totalDeployments: 8,
          manualDeployments: 2,
          latestDeploymentTime: '2025-12-05 16:45:00',
          rollbackCount: 0,
          configModifyCount: 1,
          currentPackageVersions: 4,
          statisticsPeriod: '2025-12',
          totalPackageSize: 1.2,
          maxPackageSize: 300,
          avgPackageSize: 150,
          appTags: '测试环境,共享应用'
        },
        {
          tenant: '广东农信',
          appName: '隔离1016应用',
          appId: '1784776437802790273',
          createdAt: '2025-12-01 11:20:00',
          totalDeployments: 5,
          manualDeployments: 1,
          latestDeploymentTime: '2025-12-01 11:20:00',
          rollbackCount: 0,
          configModifyCount: 0,
          currentPackageVersions: 3,
          statisticsPeriod: '2025-12',
          totalPackageSize: 0.8,
          maxPackageSize: 250,
          avgPackageSize: 120,
          appTags: '测试环境,隔离应用'
        },
        {
          tenant: '广东农信',
          appName: '移动银行APP',
          appId: '18138565155772783',
          createdAt: '2025-11-30 15:45:00',
          totalDeployments: 25,
          manualDeployments: 10,
          latestDeploymentTime: '2025-11-30 15:45:00',
          rollbackCount: 3,
          configModifyCount: 7,
          currentPackageVersions: 12,
          statisticsPeriod: '2025-11',
          totalPackageSize: 4.5,
          maxPackageSize: 1000,
          avgPackageSize: 400,
          appTags: '生产环境,移动应用'
        },
        {
          tenant: '广东农信',
          appName: '网上银行系统',
          appId: '17835446687603080',
          createdAt: '2025-11-25 10:15:00',
          totalDeployments: 18,
          manualDeployments: 6,
          latestDeploymentTime: '2025-11-25 10:15:00',
          rollbackCount: 1,
          configModifyCount: 4,
          currentPackageVersions: 9,
          statisticsPeriod: '2025-11',
          totalPackageSize: 3.0,
          maxPackageSize: 700,
          avgPackageSize: 300,
          appTags: '生产环境,Web应用'
        },
        {
          tenant: '广东农信',
          appName: '信用卡管理系统',
          appId: '18138564290330710',
          createdAt: '2025-11-20 14:30:00',
          totalDeployments: 16,
          manualDeployments: 4,
          latestDeploymentTime: '2025-11-20 14:30:00',
          rollbackCount: 2,
          configModifyCount: 5,
          currentPackageVersions: 7,
          statisticsPeriod: '2025-11',
          totalPackageSize: 2.8,
          maxPackageSize: 600,
          avgPackageSize: 280,
          appTags: '生产环境,企业端'
        },
        {
          tenant: '广东农信',
          appName: '风控系统',
          appId: '181385653410758883',
          createdAt: '2025-11-15 09:20:00',
          totalDeployments: 10,
          manualDeployments: 3,
          latestDeploymentTime: '2025-11-15 09:20:00',
          rollbackCount: 0,
          configModifyCount: 2,
          currentPackageVersions: 5,
          statisticsPeriod: '2025-11',
          totalPackageSize: 1.5,
          maxPackageSize: 350,
          avgPackageSize: 180,
          appTags: '测试环境,风控应用'
        },
        {
          tenant: '广东农信',
          appName: '数据分析平台',
          appId: '1784776437802790274',
          createdAt: '2025-11-10 16:50:00',
          totalDeployments: 14,
          manualDeployments: 5,
          latestDeploymentTime: '2025-11-10 16:50:00',
          rollbackCount: 1,
          configModifyCount: 4,
          currentPackageVersions: 8,
          statisticsPeriod: '2025-11',
          totalPackageSize: 2.2,
          maxPackageSize: 550,
          avgPackageSize: 240,
          appTags: '测试环境,数据分析'
        },
        {
          tenant: '广东农信',
          appName: '人力资源系统',
          appId: '18138565155772784',
          createdAt: '2025-10-30 11:15:00',
          totalDeployments: 9,
          manualDeployments: 2,
          latestDeploymentTime: '2025-10-30 11:15:00',
          rollbackCount: 0,
          configModifyCount: 1,
          currentPackageVersions: 4,
          statisticsPeriod: '2025-10',
          totalPackageSize: 1.0,
          maxPackageSize: 280,
          avgPackageSize: 140,
          appTags: '测试环境,内部应用'
        },
        {
          tenant: '广东农信',
          appName: '财务管理系统',
          appId: '17835446687603081',
          createdAt: '2025-10-25 15:30:00',
          totalDeployments: 17,
          manualDeployments: 7,
          latestDeploymentTime: '2025-10-25 15:30:00',
          rollbackCount: 2,
          configModifyCount: 6,
          currentPackageVersions: 11,
          statisticsPeriod: '2025-10',
          totalPackageSize: 3.5,
          maxPackageSize: 850,
          avgPackageSize: 350,
          appTags: '生产环境,企业端'
        },
        {
          tenant: '广东农信',
          appName: '客户关系管理系统',
          appId: '18138564290330711',
          createdAt: '2025-10-20 10:00:00',
          totalDeployments: 13,
          manualDeployments: 4,
          latestDeploymentTime: '2025-10-20 10:00:00',
          rollbackCount: 1,
          configModifyCount: 3,
          currentPackageVersions: 6,
          statisticsPeriod: '2025-10',
          totalPackageSize: 2.0,
          maxPackageSize: 450,
          avgPackageSize: 220,
          appTags: '生产环境,客户管理'
        },
        {
          tenant: '广东农信',
          appName: '供应链金融系统',
          appId: '181385653410758884',
          createdAt: '2025-10-15 14:45:00',
          totalDeployments: 11,
          manualDeployments: 3,
          latestDeploymentTime: '2025-10-15 14:45:00',
          rollbackCount: 0,
          configModifyCount: 2,
          currentPackageVersions: 5,
          statisticsPeriod: '2025-10',
          totalPackageSize: 1.6,
          maxPackageSize: 380,
          avgPackageSize: 190,
          appTags: '测试环境,金融应用'
        },
        {
          tenant: '广东农信',
          appName: '资产负债管理系统',
          appId: '1784776437802790275',
          createdAt: '2025-10-10 09:30:00',
          totalDeployments: 8,
          manualDeployments: 2,
          latestDeploymentTime: '2025-10-10 09:30:00',
          rollbackCount: 0,
          configModifyCount: 1,
          currentPackageVersions: 3,
          statisticsPeriod: '2025-10',
          totalPackageSize: 0.9,
          maxPackageSize: 260,
          avgPackageSize: 130,
          appTags: '测试环境,财务管理'
        }
      ]
    }
  }
}
</script>

<style scoped>
.version-management {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

/* 标签页容器 */
.tab-container {
  width: 100%;
}

/* 标签页导航 */
.version-tabs {
  display: flex;
  gap: 40px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0;
}

/* 标签页按钮 */
.version-tab {
  padding: 12px 0;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 100px;
  justify-content: center;
}

.version-tab:hover {
  color: #ff5722;
}

.version-tab.active {
  color: #ff5722;
  border-bottom-color: #ff5722;
  font-weight: 600;
}

/* 标签页图标 */
.version-tab::before {
  content: '';
  display: inline-block;
  width: 16px;
  height: 16px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.version-tab:nth-child(1)::before {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 14H5V4h14v12z"/></svg>');
}

.version-tab:nth-child(2)::before {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2v-4H8v-2h4V7h2v4h4v2h-4v4z"/></svg>');
}

/* 标签页内容 */
.tab-content {
  padding: 20px 0;
  background-color: #f5f7fa;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .version-tabs {
    flex-direction: column;
    gap: 0;
  }
  
  .version-tab {
    border-bottom: 1px solid #e0e0e0;
    border-radius: 0;
    justify-content: flex-start;
    padding-left: 12px;
  }
  
  .version-tab.active {
    border-bottom: 1px solid #ff5722;
    background-color: rgba(255, 87, 34, 0.05);
  }
}
</style>