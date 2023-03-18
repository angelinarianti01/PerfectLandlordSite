import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/log-in',
    name: 'log-in',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/my-profile',
    name: 'my-profile',
    component: () => import('../views/MyProfile.vue'),
  },
  {
    path: '/my-profile/form',
    name: 'my-profile-form',
    component: () => import('../views/MyProfileForm.vue'),
  },
  {
    path: '/properties',
    name: 'properties',
    component: () => import('../views/Properties.vue'),
  },
  {
    path: '/properties/:property_slug',
    name: 'property',
    component: () => import('../views/Property.vue'),
  },
  {
    path: '/properties/:property_slug/inspections',
    name: 'property-inspections',
    component: () => import('../views/PropertyInspections.vue'),
  },
  {
    path: '/properties/:property_slug/application',
    name: 'property-application',
    component: () => import('../views/PropertyApplication.vue'),
  },
  {
    path: '/my-collections',
    name: 'my-collections',
    component: () => import('../views/MyCollections.vue'),
  },
  {
    path: '/my-inspections',
    name: 'my-inspections',
    component: () => import('../views/MyInspections.vue'),
  },
  {
    path: '/my-applications',
    name: 'my-applications',
    component: () => import('../views/MyApplications.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active-link',
});

export default router;
