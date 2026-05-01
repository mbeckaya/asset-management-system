import { createRouter, createWebHistory } from "vue-router";

import { useUserStore } from "@/stores/user.store";

import LoginPage from "@/pages/LoginPage.vue";
import DeviceListPage from "@/pages/DeviceListPage.vue";
import DeviceItemPage from "@/pages/DeviceItemPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: { name: "device.list" }
    },
    {
      path: "/login",
      name: "user.login",
      component: LoginPage,
    },
    {
      path: "/devices",
      name: "device.list",
      component: DeviceListPage,
      meta: { requiresAuth: true }
    },
    {
      path: "/devices/:id",
      name: "device.item",
      component: DeviceItemPage,
      meta: { requiresAuth: true }
    },
  ],
});

router.beforeEach((to) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.user?.accessToken) {
    return { name: "user.login" };
  }
});

export default router;
