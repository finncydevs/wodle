<template>
    <div class="min-h-screen flex items-center justify-center bg-black text-white">
      <form @submit.prevent="register" class="w-full max-w-sm space-y-4 bg-gray-900 p-6 rounded-lg">
        <h1 class="text-2xl font-bold">Sign Up</h1>
  
        <input v-model="name" type="text" placeholder="Name" class="w-full p-2 rounded bg-gray-800" required />
        <input v-model="email" type="email" placeholder="Email" class="w-full p-2 rounded bg-gray-800" required />
        <input v-model="phone" type="text" placeholder="Phone" class="w-full p-2 rounded bg-gray-800" required />
        <input v-model="password" type="password" placeholder="Password" class="w-full p-2 rounded bg-gray-800" required />
  
        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-bold">Register</button>
        <p class="text-sm mt-2 text-gray-400">
          Already have an account? <router-link to="/login" class="text-blue-400">Login here</router-link>
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
  const name = ref("");
  const email = ref("");
  const phone = ref("");
  const password = ref("");
  const router = useRouter();
  
  const register = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/register", {
        name: name.value,
        email: email.value,
        phone: phone.value,
        password: password.value,
      });
      
  
      toast.success("Registration successful!");
      router.push("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    }
  };
  </script>
  