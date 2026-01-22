<template>
  <div class="header">
    <h1 class="logo">{{ logoText }}</h1>
    <p class="subtitle">{{ subtitleText }}</p>
  </div>
</template>

<script>
export default {
  name: 'HeaderLogo',
  props: {
    logoText: {
      type: String,
      default: '广东农信'
    },
    subtitleText: {
      type: String,
      default: '悦农鲜H5应用集中托管系统(A区)'
    }
  }
}
</script>

<style scoped>
.header {
  position: relative;
  z-index: 2;
  padding: 20px 30px 20px 120px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #1e3c72;
  margin: 0;
}

.subtitle {
  font-size: 14px;
  color: #666;
  margin: 5px 0 0 0;
}
</style>