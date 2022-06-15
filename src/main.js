import {
    createApp
} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import routes from './routes'
import * as VueRouter from 'vue-router'

const router = new VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})

const app = createApp(App).use(router).use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')