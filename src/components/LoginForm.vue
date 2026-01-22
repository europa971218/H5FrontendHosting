<template>
  <div class="login-form-wrapper">
    <div class="login-form">
      <h2 class="title">欢迎登录</h2>
      <p class="sub-title">请输入用户名及密码</p>
      
      <el-form @submit.prevent="handleSubmit">
        <el-form-item>
          <el-input
            v-model="username"
            placeholder="请输入用户名"
            :prefix-icon="User"
            size="large"
          />
        </el-form-item>
        
        <el-form-item>
          <el-input
            v-model="password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            type="password"
            size="large"
          />
        </el-form-item>
        
        <el-form-item class="remember-me">
          <el-checkbox v-model="rememberPassword">记住密码</el-checkbox>
        </el-form-item>
        
        <el-form-item>
          <el-button
            type="primary"
            native-type="submit"
            size="large"
            block
            style="background-color: #ff6600; border-color: #ff6600;"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 导入图标
import { User, Lock } from '@element-plus/icons-vue'

export default {
  name: 'LoginForm',
  components: {
    User,
    Lock
  },
  props: {
    modelValue: {
      type: Object,
      default: () => ({ username: '', password: '' })
    }
  },
  emits: ['login', 'update:modelValue'],
  data() {
    return {
      username: this.modelValue.username,
      password: this.modelValue.password,
      rememberPassword: false
    }
  },
  mounted() {
    // 组件加载时，检查localStorage中是否有保存的密码
    this.loadRememberedPassword()
  },
  watch: {
    // 监听props变化，更新本地数据
    modelValue: {
      handler(newVal) {
        this.username = newVal.username
        this.password = newVal.password
      },
      deep: true
    },
    // 监听本地数据变化，通知父组件
    username(newVal) {
      this.$emit('update:modelValue', {
        ...this.modelValue,
        username: newVal
      })
    },
    password(newVal) {
      this.$emit('update:modelValue', {
        ...this.modelValue,
        password: newVal
      })
    }
  },
  methods: {
    // 从localStorage加载记住的密码
    loadRememberedPassword() {
      try {
        const remembered = localStorage.getItem('rememberedLogin')
        if (remembered) {
          const { username, password } = JSON.parse(remembered)
          this.username = username
          this.password = password
          this.rememberPassword = true
          // 更新父组件的modelValue
          this.$emit('update:modelValue', { username, password })
        }
      } catch (error) {
        console.error('Failed to load remembered password:', error)
      }
    },
    
    // 保存密码到localStorage
    saveRememberedPassword() {
      try {
        if (this.rememberPassword) {
          const loginData = {
            username: this.username,
            password: this.password
          }
          localStorage.setItem('rememberedLogin', JSON.stringify(loginData))
        } else {
          localStorage.removeItem('rememberedLogin')
        }
      } catch (error) {
        console.error('Failed to save remembered password:', error)
      }
    },
    
    handleSubmit() {
      // 保存密码
      this.saveRememberedPassword()
      // 触发登录事件
      this.$emit('login')
    }
  }
}
</script>

<style scoped>
.login-form-wrapper {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.login-form {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  width: auto;
  min-width: 300px;
  max-width: 350px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin: 0 0 10px 0;
  text-align: center;
}

.sub-title {
  font-size: 14px;
  color: #666;
  margin: 0 0 30px 0;
  text-align: center;
}

/* 记住密码样式 */
.remember-me {
  margin-bottom: 15px !important;
  display: flex;
  justify-content: flex-start;
}

:deep(.el-checkbox__label) {
  font-size: 14px;
  color: #666;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #ff6600 !important;
  border-color: #ff6600 !important;
}

:deep(.el-checkbox__input.is-checked+.el-checkbox__label) {
  color: #ff6600 !important;
}
</style>