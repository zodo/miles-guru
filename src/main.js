import App from './App.svelte'
import './app.css'
import '@picocss/pico'

const app = new App({
  target: document.getElementById('app')
})

export default app
