// src/words.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/words"; // adjust if deployed

export async function getRandomWord(lang = "en") {
  try {
    const res = await axios.get(`${BASE_URL}/random?lang=${lang}`);
    return res.data.word.toUpperCase(); 
  } catch (err) {
    console.error("Failed to fetch word:", err);
    return "ERROR"; 
  }
}

export async function getDailyWord(lang = "en") {
  return await getRandomWord(lang);
}
