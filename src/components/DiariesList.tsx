import type { NonSensitiveDiaryEntry } from "../types";

interface DiariesListProps {
  diaries: NonSensitiveDiaryEntry[]
}

const DiariesList = ({ diaries }: DiariesListProps) => {
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
};

export default DiariesList;