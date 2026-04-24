import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/pages/LoginPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: { name: "user.login" }
    },
    {
      path: "/login",
      name: "user.login",
      component: LoginPage,
    },
  ],
});

export default router;
