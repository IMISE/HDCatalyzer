import { createApp } from 'vue'
import { createI18n } from 'vue-i18n';
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import I18N_CONFIG from '../config/i18n'

import { createStickyLocale } from '@/utils/helpers.ts';

// Import CSS
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap';
import '@ecl/preset-eu/dist/styles/ecl-eu.css'
import '@ecl/preset-eu/dist/images/icons/svg/all/plus-filled.svg'
import '@ecl/preset-eu/dist/styles/optional/ecl-eu-utilities.css'
import bootstrapTooltip from '@/utils/bootstrapTooltip';

const app = createApp(App)
app.config.performance = true;

// Global directive for Bootstrap tooltips
app.directive('bootstrap-tooltip', bootstrapTooltip);

// Runtime Configuration Service
const env = app.config.globalProperties.$env;

// TODO
// const LOCALE = env.languages.locale;
// const FALLBACKLOCALE = env.languages.fallbackLocale;

const LOCALE = 'de'
const FALLBACKLOCALE = 'en'

app.use(createPinia())

// Vue Router
router.beforeEach(createStickyLocale(LOCALE || FALLBACKLOCALE));
router.app = app;
app.use(router);

// Vue i18n
export const i18n = createI18n({
  locale: LOCALE,
  fallbackLocale: FALLBACKLOCALE,
  messages: I18N_CONFIG,
  legacy: false,
});
app.config.globalProperties.i18n = i18n; // Needed for compatibility with Piveau Hub UI modules
app.use(i18n);

// Mount the app
router.isReady().then(() => app.mount('#app'));
