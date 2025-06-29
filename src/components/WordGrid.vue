<template>
  <div class="grid grid-rows-6 gap-2 mt-6">
    <div
      v-for="(row, rowIndex) in grid"
      :key="rowIndex"
      class="grid grid-cols-5 gap-2"
    >
      <div
        v-for="(cell, colIndex) in row"
        :key="colIndex"
        class="w-14 h-14 border-2 border-gray-700 text-slate-300 text-2xl flex items-center justify-center font-bold rounded-md uppercase"
        :class="{
          'bg-green-600': cell.status === 'correct',
          'bg-yellow-500': cell.status === 'misplaced',
          'bg-gray-800': cell.status === 'wrong',
          'bg-transparent': cell.status === 'empty',
        }"
      >
        {{ cell.letter }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  grid: {
    type: Array,
    required: true,
  },
});
</script>
