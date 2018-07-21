import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#0f8a46',
    navigationBarTitleText: '',
    navigationBarTextStyle: 'black'
  }
}
