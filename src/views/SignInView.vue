<template>
  <div
    class="min-h-screen flex items-center justify-center bg-black text-white"
  >
    <form
      @submit.prevent="login"
      class="w-full max-w-sm space-y-4 bg-gray-900 p-6 rounded-lg"
    >
      <h1 class="text-2xl font-bold">Login</h1>

      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full p-2 rounded bg-gray-800"
        required
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full p-2 rounded bg-gray-800"
        required
      />

      <button
        type="submit"
        class="w-full bg-green-600 hover:bg-green-700 p-2 rounded font-bold"
      >
        Login
      </button>
      <p class="text-sm mt-2 text-gray-400">
        Don't have an account?
        <router-link to="/register" class="text-blue-400">Sign up</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/axios/axios";
import { useToast } from "vue-toastification";
import axios from "axios";
const toast = useToast();

const email = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/users/login", {
      email: email.value,
      password: password.value,
    });

    localStorage.setItem("token", res.data.token);
    toast("Login successful!");
    router.push("/");
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed.");
  }
};
</script>
