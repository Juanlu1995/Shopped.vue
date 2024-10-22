import '@/assets/base.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import router from '@/router';

async function enableMocking() {
  if (import.meta.env.MODE !== 'development' || !import.meta.env.VITE_MWS) {
    return;
  }

  const { worker } = await import('./mocks/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking().then(() => {
  const app = createApp(App);

  app.use(createPinia());
  app.use(router);

  app.mount('#app');
});
