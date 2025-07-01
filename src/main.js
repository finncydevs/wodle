import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router"; // ⬅️ Buat file router/index.js atau .ts
import "./assets/main.css";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);
app.use(router);
app.mount("#app");
app.use(Toast);
