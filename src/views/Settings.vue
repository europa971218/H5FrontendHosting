<template>
  <div class="settings">
    <h1>设置</h1>
    <UserSettings />
  </div>
</template>

<script>
import UserSettings from '../components/UserSettings.vue'

export default {
  name: 'Settings',
  components: {
    UserSettings
  }
}
</script>

<style scoped>
.settings {
  max-width: 800px;
  margin: 0 auto;
}

.settings h1 {
  margin-bottom: 2rem;
  color: #1e3c72;
}
</style>