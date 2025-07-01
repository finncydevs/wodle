import { createRouter, createWebHistory } from "vue-router";
import { useToast } from "vue-toastification";
import { routes } from "./routes";
const toast = useToast();
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    toast.warning("Anda harus login terlebih dahulu");
    next({ name: "login" });
  } else {
    next();
  }
});

export default function (app) {
  app.use(router);
}

export { router };
