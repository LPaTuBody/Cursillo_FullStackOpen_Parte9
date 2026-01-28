import { useState, type Dispatch, type SyntheticEvent, type SetStateAction } from "react";
import diaryService from "../services/diaryService";
import type { NonSensitiveDiaryEntry } from "../types";

interface DiaryFormProps {
  diaries: NonSensitiveDiaryEntry[]
  setDiaries: Dispatch<SetStateAction<NonSensitiveDiaryEntry[]>>
}

const DiaryForm = ({ diaries, setDiaries }: DiaryFormProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const newEntry = { date, visibility, weather, comment };

    diaryService.postDiaries(newEntry).then((d) => {
      console.log("New entry added:", d)
      setDiaries(diaries.concat(d));
    });

    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  }

  return (
    <>
      <h2>Add New Entry</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="text"
            id="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          <label htmlFor="visibility">Visibility</label>
          <input
            type="text"
            id="visibility"
            value={visibility}
            onChange={({ target }) => setVisibility(target.value)}
          />
        </div>
        <div>
          <label htmlFor="weather">Weather</label>
          <input
            type="text"
            id="weather"
            value={weather}
            onChange={({ target }) => setWeather(target.value)}
          />
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <input
            type="text"
            id="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit" style={{ width: "fit-content" }}>Add</button>
      </form>
    </>
  )
};

export default DiaryForm;