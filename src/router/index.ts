import DatasetDescriptionAssistant from '@/components/health-data/dataset-assistant/DatasetDescriptionAssistant.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/snapshot/:uuid', component: DatasetDescriptionAssistant
  }],
})

export default router
