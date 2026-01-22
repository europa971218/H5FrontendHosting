<template>
  <el-dialog
    v-model="dialogVisible"
    title="欢迎您登录"
    width="400px"
    center
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    @close="$emit('update:visible', false)"
  >
    <div class="user-select-content">
      <h3>选择租户</h3>
      <p>您选择登录的用户:</p>
      <el-select
        v-model="localTenant"
        placeholder="请选择租户"
        style="width: 100%; margin: 15px 0;"
      >
        <el-option
          v-for="option in tenantOptions"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-select>
      <div class="dialog-buttons">
        <el-button @click="handleCancel" style="margin-right: 10px;">取消</el-button>
        <el-button type="primary" @click="handleConfirm" style="background-color: #ff6600; border-color: #ff6600;">进入</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'TenantDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: '广东农信'
    },
    tenantOptions: {
      type: Array,
      default: () => [
        { label: '广东农信', value: '广东农信' }
      ]
    }
  },
  emits: ['update:visible', 'update:modelValue', 'confirm', 'cancel'],
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(value) {
        this.$emit('update:visible', value)
      }
    },
    localTenant: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  methods: {
    handleConfirm() {
      this.$emit('confirm', this.localTenant)
      this.dialogVisible = false
    },
    handleCancel() {
      this.$emit('cancel')
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
/* 用户选择弹窗样式 */
.user-select-content {
  text-align: center;
}

.user-select-content h3 {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0 0 15px 0;
}

.user-select-content p {
  font-size: 14px;
  color: #666;
  margin: 0 0 5px 0;
  text-align: left;
}

.dialog-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>