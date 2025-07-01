<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";

const showSettings = ref(false);
const isDark = ref(true);
const router = useRouter();

function toggleSettings() {
  showSettings.value = !showSettings.value;
}

function toggleTheme() {
  isDark.value = !isDark.value;
  const html = document.documentElement;
  if (isDark.value) {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}

onMounted(() => {
  const saved = localStorage.getItem("theme");
  if (saved === "light") {
    isDark.value = false;
    document.documentElement.classList.remove("dark");
  }
});
</script>


<template>
  <header class="w-full bg-black border-b border-gray-700 shadow-sm px-4 py-3">
    <div class="max-w-md mx-auto flex items-center justify-between">
      <div class="text-slate-300 text-xl font-bold min-w-[2rem] flex justify-start">
        <slot name="left">☰</slot>
      </div>

      <h1 class="text-slate-300 text-xl sm:text-2xl font-extrabold text-center tracking-widest flex-grow">
        Wordle
      </h1>

      <div class="text-slate-300 text-xl font-bold min-w-[2rem] flex justify-end">
        <button @click="toggleSettings">⚙️</button>
      </div>
    </div>

    <!-- 🌙 SETTINGS MODAL -->
    <div
      v-if="showSettings"
      class="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
    >
      <div class="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg shadow-lg space-y-4 w-[90%] max-w-xs">
        <h2 class="text-xl font-bold text-center">⚙️ Settings</h2>

        <button
          @click="router.push('/login')"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Login
        </button>

        <button
          @click="toggleTheme"
          class="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded"
        >
          Toggle {{ isDark ? "Light" : "Dark" }} Mode
        </button>

        <button
          @click="toggleSettings"
          class="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  </header>
</template>
