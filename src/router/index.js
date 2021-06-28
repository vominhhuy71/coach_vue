import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/index';
import CoachDetail from '../views/coaches/CoachDetail.vue';
import CoachesList from '../views/coaches/CoachesList.vue';
import CoachRegistration from '../views/coaches/CoachRegistration.vue';
import ContactCoach from '../views/requests/ContactCoach.vue';
import RequestsReceived from '../views/requests/RequestsReceived.vue';
import NotFound from '../views/NotFound.vue';
import UserAuth from '../views/auth/UserAuth.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    {
      path: '/coaches',
      component: CoachesList
    },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [{ path: 'contact', component: ContactCoach }]
    },
    {
      path: '/register',
      component: CoachRegistration,
      meta: { requiresAuth: true }
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requiresAuth: true }
    },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
