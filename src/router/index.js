import { createRouter, createWebHistory } from 'vue-router'
import { validateRoute } from '@/utils/route-guard'
import NotFoundPage from '@/pages/NotFoundPage'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:notFound(.*)*',
      abstract: true,
      name: 'NotFound',
      component: NotFoundPage,
      meta: {
        roles: []
      }
    }
  ]
})

router.beforeEach(validateRoute)

export default router
