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
    path: '/tenants',
    name: 'tenants',
    component: () => import('../views/Tenants.vue'),
  },
  {
    path: '/my-properties',
    name: 'my-properties',
    component: () => import('../views/MyProperties.vue'),
  },
  {
    path: '/my-properties/:property_slug',
    name: 'property',
    component: () => import('../views/Property.vue'),
  },
  {
    path: '/my-properties/create',
    name: 'property-create',
    component: () => import('../views/PropertyCreate.vue'),
  },
  {
    path: '/my-properties/:property_slug/inspections',
    name: 'property-inspections',
    component: () => import('../views/PropertyInspections.vue'),
  },
  {
    path: '/my-properties/:property_slug/applications',
    name: 'property-applications',
    component: () => import('../views/PropertyApplications.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
