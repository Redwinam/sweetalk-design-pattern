import DefaultTheme from 'vitepress/theme'
import './style.css'
import AppTabs from './components/AppTabs.vue'
import AppTab from './components/AppTab.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: any }) {
    app.component('AppTabs', AppTabs)
    app.component('AppTab', AppTab)
  }
}
