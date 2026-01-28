import { useState, useEffect } from "react";
import diaryService from "./services/diaryService";
import type { NonSensitiveDiaryEntry } from "./types";

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getDiaries().then((d) => setDiaries(d));
  }, [])

  return (
    <>
      <h2>Diary Entries</h2>
      {diaries.map((d) => (
        <div key={d.id} style={{ marginBottom: 16 }}>
          <h3 style={{ margin: 0 }}>{d.date}</h3>
          <p style={{ margin: 0 }}>
            <strong>weather:</strong> {d.weather} <br />
            <strong>visibility:</strong> {d.visibility}
          </p>
        </div>
      ))}
    </>
  )
}

export default App
