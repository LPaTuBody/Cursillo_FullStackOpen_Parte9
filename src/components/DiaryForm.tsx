import {
  useState,
  useEffect,
  type Dispatch,
  type SyntheticEvent,
  type SetStateAction
} from "react";
import {
  type DiaryEntry,
  type NonSensitiveDiaryEntry,
  type NotiType,
  type NewDiaryEntry,
  Weather,
  Visibility
} from "../types";
import diaryService from "../services/diaryService";
import Notification from "./Notification";
import { newEntryParser } from "../utils/newEntrySchema";

interface DiaryFormProps {
  diaries: NonSensitiveDiaryEntry[]
  setDiaries: Dispatch<SetStateAction<NonSensitiveDiaryEntry[]>>
}

const DiaryForm = ({ diaries, setDiaries }: DiaryFormProps) => {
  const notiDefState = { msg: null, nType: null };
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [noti, setNoti] = useState<NotiType>(notiDefState);

  useEffect(() => {
    if (noti.msg) {
      setTimeout(() => setNoti(notiDefState), 5000);
    }
  }, [noti]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!date && !visibility && !weather && !comment) return;
    const result = newEntryParser({ date, visibility, weather, comment });

    if (!result.success) {
      const errorMsg = result.error.issues.map(iss => iss.message).join("\n");
      console.log(errorMsg);
      setNoti({ msg: errorMsg, nType: 0 });
    } else {
      const newEntry: NewDiaryEntry = result.data;

      diaryService.postDiaries(newEntry).then((d: string | DiaryEntry) => {
        if (typeof d === "string") setNoti({ msg: d, nType: 0 });
        else {
          console.log("New entry added:", d);
          setNoti({ msg: "New entry added successfully!", nType: 1 });
          setDiaries(diaries.concat(d));

          setDate("");
          setVisibility("");
          setWeather("");
          setComment("");
        }
      });
    }
  };

  return (
    <>
      <h2>Add New Entry</h2>
      <Notification noti={noti} />
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 15 }}
      >
        <div>
          <label htmlFor="date">Date </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          <p style={{ margin: 0 }}>Visibility: </p>
          {Object.values(Visibility).map(v => (
            <div key={v}>
              <input
                type="radio"
                name="visibility"
                id={v}
                value={v}
                checked={visibility === v}
                onChange={({ target }) => setVisibility(target.value)}
              />
              <label htmlFor={v}>{v}</label>
            </div>
          ))}
        </div>
        <div>
          <p style={{ margin: 0 }}>Weather: </p>
          {Object.values(Weather).map(w => (
            <div key={w}>
              <input
                type="radio"
                name="weather"
                id={w}
                value={w}
                checked={weather === w}
                onChange={({ target }) => setWeather(target.value)}
              />
              <label htmlFor={w}>{w}</label>
            </div>
          ))}
        </div>
        <div>
          <label htmlFor="comment">Comment </label>
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
  );
};

export default DiaryForm;