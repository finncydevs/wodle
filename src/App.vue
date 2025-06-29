<script setup>
import { ref, onMounted } from "vue";
import NavBar from "./components/NavBar.vue";
import WordGrid from "./components/WordGrid.vue";
import VirtualKeyboard from "./components/VirtualKeyboard.vue";
import { getDailyWord, getRandomWord } from "./words";
import confetti from "canvas-confetti";
import Footer from "./components/Footer.vue";
// Game state
const grid = ref(
  Array.from({ length: 6 }, () =>
    Array.from({ length: 5 }, () => ({
      letter: "",
      status: "empty",
    }))
  )
);

const showNotification = ref(false);
const notificationText = ref("");
const isWin = ref(false);

function showResultNotification(message, win) {
  notificationText.value = message;
  isWin.value = win;
  showNotification.value = true;
}

const secretWord = ref(""); // fallback
const currentRow = ref(0);
const currentCol = ref(0);
const gameOver = ref(false);
const keyStatus = ref({});
const useDailyWord = ref(false); // toggle this manually if needed

// 🎉 Confetti celebration
function celebrate() {
  confetti({
    particleCount: 150,
    spread: 500,
    origin: { y: 0.6 },
  });
}

// 🟨 Keyboard input handler
function onKeyPress(key) {
  if (gameOver.value || currentRow.value >= 6) return;

  if (key === "←") {
    if (currentCol.value > 0) {
      currentCol.value--;
      grid.value[currentRow.value][currentCol.value].letter = "";
    }
  } else if (key === "ENTER") {
    if (currentCol.value === 5) {
      const guess = grid.value[currentRow.value].map((c) => c.letter).join("");
      validateGuess(guess);
    }
  } else if (/^[A-Z]$/.test(key) && currentCol.value < 5) {
    grid.value[currentRow.value][currentCol.value].letter = key;
    currentCol.value++;
  }
}

// ✅ Guess validation
function validateGuess(guess) {
  const secret = secretWord.value;
  const row = grid.value[currentRow.value];

  const secretLetters = secret.split("");
  const guessedLetters = guess.split("");

  // First pass: exact matches
  for (let i = 0; i < 5; i++) {
    if (guessedLetters[i] === secretLetters[i]) {
      row[i].status = "correct";
      updateKeyStatus(row[i].letter, "correct");
      secretLetters[i] = null;
      guessedLetters[i] = null;
    }
  }

  // Second pass: misplaced / wrong
  for (let i = 0; i < 5; i++) {
    if (guessedLetters[i] && secretLetters.includes(guessedLetters[i])) {
      row[i].status = "misplaced";
      updateKeyStatus(row[i].letter, "misplaced");
      secretLetters[secretLetters.indexOf(guessedLetters[i])] = null;
    } else if (guessedLetters[i]) {
      row[i].status = "wrong";
      updateKeyStatus(row[i].letter, "wrong");
    }
  }
  if (guess === secret) {
    gameOver.value = true;
    showResultNotification(getRandomMessage(winMessages), true);
    celebrate(); // confetti if you want
  } else if (currentRow.value >= 5) {
    gameOver.value = true;
    showResultNotification(
      `${getRandomMessage(failMessages)} The word was: ${secret}`,
      false
    );
  }

  saveProgress();
  currentRow.value++;
  currentCol.value = 0;
}

// ⌨️ Update virtual keyboard key color
function updateKeyStatus(letter, status) {
  const current = keyStatus.value[letter];
  const priority = { correct: 3, misplaced: 2, wrong: 1 };

  if (!current || priority[status] > priority[current]) {
    keyStatus.value[letter] = status;
  }
}

// 🔁 Restart game
function resetGame() {
  grid.value = Array.from({ length: 6 }, () =>
    Array.from({ length: 5 }, () => ({
      letter: "",
      status: "empty",
    }))
  );

  keyStatus.value = {};
  currentRow.value = 0;
  currentCol.value = 0;
  gameOver.value = false;

  // 💡 get NEW word
  if (useDailyWord.value) {
    secretWord.value = getDailyWord();
  } else {
    secretWord.value = getRandomWord();
  }

  console.log("🌱 New secret word:", secretWord.value); // ✅ TEST
  saveProgress(); // optional
}

// 💾 Save to localStorage
function saveProgress() {
  const state = {
    grid: grid.value,
    currentRow: currentRow.value,
    currentCol: currentCol.value,
    keyStatus: keyStatus.value,
    gameOver: gameOver.value,
    // secretWord is NOT saved!
  };
  localStorage.setItem("wordleSave", JSON.stringify(state));
}
function loadProgress() {
  const saved = localStorage.getItem("wordleSave");
  if (saved) {
    const state = JSON.parse(saved);
    grid.value = state.grid;
    currentRow.value = state.currentRow;
    currentCol.value = state.currentCol;
    keyStatus.value = state.keyStatus;
    gameOver.value = state.gameOver;
    // no need to load secretWord
  }
}

// 🪄 Initialize game on first load
onMounted(() => {
  if (useDailyWord.value) {
    secretWord.value = getDailyWord();
  } else {
    secretWord.value = getRandomWord();
  }
  loadProgress();
});
</script>

<template>
  <div class="min-h-screen bg-black text-white flex flex-col items-center">
    <div class="w-full max-w-md">
      <NavBar> </NavBar>

      <div
        class="flex flex-col items-center justify-center h-[calc(100vh-64px)]"
      >
        <WordGrid :grid="grid" />
        <VirtualKeyboard @key-press="onKeyPress" :keyStatus="keyStatus" />
        <button
          @click="resetGame"
          class="mt-4 px-4 py-2 bg-slate-800 text-slate-400 font-bold rounded hover:bg-slate-600"
        >
          🔄 Restart Game
        </button>
      </div>
    </div>
  </div>

  <!-- Notification Modal -->
  <div
    v-if="showNotification"
    class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
  >
    <div
      class="bg-white text-black rounded-xl shadow-lg p-6 max-w-xs w-full text-center space-y-3"
    >
      <h2 class="text-2xl font-bold">
        {{ isWin ? "🎉 You Win!" : "💀 Game Over" }}
      </h2>
      <p class="text-base">{{ notificationText }}</p>
      <button
        @click="
          () => {
            showNotification = false;
            resetGame();
          }
        "
        class="mt-4 px-4 py-2 rounded bg-black text-white font-bold hover:bg-gray-800 transition"
      >
        🔄 Play Again
      </button>
    </div>
  </div>
  <Footer />
</template>
