// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';

const routes = [
  {
    name: "LoginPage",
    component: () => import('../components/LoginPage.vue'),
    path: "/"
  },
  {
    name: "camController",
    component: () => import('../components/CamController.vue'),
    path: "/camController",
  },
  {
    name: "SignUp",
    component: () => import('../components/SignUp.vue'),
    path: "/sign-up",
  },
  {
    name: "ThermalDetect",
    component: () => import('../components/ThermalDetect.vue'),
    path: "/thermal-detect",
  },
  {
    name: "GasDetect",
    component: () => import('../components/GasDetect.vue'),
    path: "/gas-detect",
  },
  {
    name: "PressureSoundDetect",
    component: () => import('../components/PressureSoundDetect.vue'),
    path: "/pressure-sound-detect",
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const getResponse = async (to, next) => {
  try {
    let result = await axios.get('/protected');
    console.log("login result", result);
    if (result.status === 200) {
      if (to.name === 'LoginPage') {
        next({ name: 'camController' });
      } else {
        next();
      }
    }
  } catch (err) {
    if (err.response && err.response.status === 403) {
      next({ name: 'LoginPage' });
    } else {
      console.log("Error", err);
    }
  }
};

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    getResponse(to, next);
  } else {
    if (to.name === 'LoginPage' || to.name === 'SignUp') {
      next();
    } else {
      next({ name: 'LoginPage' });
    }
  }
});

export default router;
