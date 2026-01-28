import axios from "axios";
import type { NonSensitiveDiaryEntry } from "../types";

const URL = "http://localhost:3000/api/diaries";

const getDiaries = async () => {
  const diaries = await axios.get<NonSensitiveDiaryEntry[]>(URL);
  return diaries.data;
};

export default {
  getDiaries
}