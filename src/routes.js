import Home from './components/Home/Home.vue'
import Host from './components/Host/Host.vue'
import Config from './components/Config/Config.vue'
import New from './components/New/New.vue'
const routes = [{
    path: '/',
    component: Home
}, {
    path: '/:uhost',
    component: Host,
    props: true

}, {
    path: '/:uhost/new',
    component: New,
    props: true
}, {
    path: '/:uhost/:uconfigid',
    component: Config,
    props: true
}]
export default routes