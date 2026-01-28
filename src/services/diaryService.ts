import axios from "axios";
import type { NonSensitiveDiaryEntry, DiaryEntry } from "../types";

const URL = "http://localhost:3000/api/diaries";

const getDiaries = async () => {
  const diaries = await axios.get<NonSensitiveDiaryEntry[]>(URL);
  return diaries.data;
};

// 
const postDiaries = async (entry: any) => {
  const newDiary = await axios.post<DiaryEntry>(URL, entry);
  return newDiary.data
}

export default {
  getDiaries,
  postDiaries
}