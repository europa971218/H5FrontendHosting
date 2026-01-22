<template>
  <div class="footer">
    <p class="datetime">{{ currentDateTime }}</p>
  </div>
</template>

<script>
export default {
  name: 'DateTimeFooter',
  data() {
    return {
      currentDateTime: '',
      timer: null
    }
  },
  mounted() {
    this.updateDateTime()
    this.timer = setInterval(() => {
      this.updateDateTime()
    }, 1000)
  },
  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    updateDateTime() {
      const now = new Date()
      this.currentDateTime = now.toLocaleString('zh-CN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }
  }
}
</script>

<style scoped>
.footer {
  position: relative;
  z-index: 2;
  padding: 20px 30px;
  text-align: right;
}

.datetime {
  font-size: 12px;
  color: #666;
  margin: 0;
}
</style>