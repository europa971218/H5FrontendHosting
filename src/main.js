import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 导入美化插件
import 'animate.css'
import VWave from 'v-wave'

// 导入Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

// 添加所有图标到库中
library.add(fas)

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
// 使用美化插件
app.use(VWave)
// 注册Font Awesome组件
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')