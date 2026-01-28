import { useState, useEffect } from "react";
import diaryService from "./services/diaryService";
import type { NonSensitiveDiaryEntry } from "./types";
import DiariesList from "./components/DiariesList";
import DiaryForm from "./components/DiaryForm";

function App() {
  const [tab, setTab] = useState("diaries");
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getDiaries().then((d) => setDiaries(d));
  }, []);

  return (
    <>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => setTab("diaries")}>Diary Entries</button>
        <button onClick={() => setTab("form")}>Add New Entry</button>
      </div>
      { tab === "diaries" && <DiariesList diaries={diaries} /> }
      { tab === "form" && <DiaryForm diaries={diaries} setDiaries={setDiaries} /> }
    </>
  )
}

export default App;