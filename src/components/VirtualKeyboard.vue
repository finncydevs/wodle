<script setup>
const { keyStatus } = defineProps({
  keyStatus: Object,
});
const emit = defineEmits(["key-press"]);

const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "←"],
];

function getKeyClass(key) {
  const status = keyStatus[key];
  return {
    "bg-green-600 text-slate-300": status === "correct",
    "bg-yellow-500 text-slate-300": status === "misplaced",
    "bg-gray-700 text-slate-300": status === "wrong",
    "bg-gray-800 text-slate-300": !status,
  };
}
</script>

<template>
  <div class="mt-6 space-y-2 select-none px-2 w-full max-w-[min(100vw,400px)] mx-auto">
    <div
      v-for="(row, rowIndex) in keys"
      :key="rowIndex"
      class="flex justify-center gap-1 w-full"
    >
      <button
        v-for="key in row"
        :key="key"
        @click="emit('key-press', key)"
        :class="[
          'rounded-md font-semibold transition duration-100 ease-in-out',
          'hover:brightness-110 active:scale-95 text-slate-300 flex items-center justify-center',
          getKeyClass(key),
          key === 'ENTER' || key === '←'
            ? 'px-2 sm:px-4 flex-[1.5] min-w-[40px] h-12 text-sm sm:text-xxs'
            : 'flex-1 min-w-[28px] max-w-[40px] sm:max-w-[48px] h-12 text-sm ',
        ]"
      >
        {{ key }}
      </button>
    </div>
  </div>
</template>
