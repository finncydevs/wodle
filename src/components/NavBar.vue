<template>
  <header class="w-full bg-black border-b border-gray-700 shadow-sm px-4 py-3">
    <div class="max-w-md mx-auto flex items-center justify-between">
      <!-- Left Slot -->
      <div class="text-white text-xl font-bold min-w-[2rem] flex justify-start">
        <slot name="left">☰</slot>
      </div>

      <!-- Title -->
      <h1 class="text-white text-xl sm:text-2xl font-extrabold text-center tracking-widest flex-grow">
     Wordle
      </h1>

      <!-- Right Slot -->
      <div class="text-white text-xl font-bold min-w-[2rem] flex justify-end">
        <slot name="right">⚙️</slot>
      </div>
    </div>
  </header>
</template>
