import { createRouter, createWebHistory } from "vue-router";
import GameView from "../views/GameView.vue";
import SignInView from "../views/SignInView.vue";
import SignUpView from "../views/SignUpView.vue";

const routes = [
  { path: "/", component: GameView },             // 🌟 Halaman utama langsung Game
  { path: "/login", component: SignInView },      // Login opsional
  { path: "/register", component: SignUpView },   // Register opsional
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
export { routes }; // Export routes if needed elsewhere