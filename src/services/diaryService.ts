import axios from "axios";
import type {
  NonSensitiveDiaryEntry,
  DiaryEntry,
  NewDiaryEntry
} from "../types";

const URL = "http://localhost:3000/api/diaries";

const getDiaries = async () => {
  const diaries = await axios.get<NonSensitiveDiaryEntry[]>(URL);
  return diaries.data;
};

const postDiaries = async (entry: NewDiaryEntry) => {
  try {
    const newDiary = await axios.post<DiaryEntry>(URL, entry);
    return newDiary.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(err.response);
      return err.response?.data;
    } else {
      console.error(err);
      let errMsg = "";
      if (err instanceof Error) errMsg = err.message;
      return errMsg;
    }
  }
};

export default {
  getDiaries,
  postDiaries
};