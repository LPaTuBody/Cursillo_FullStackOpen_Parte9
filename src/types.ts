import z from "zod";
import { newEntrySchema } from "./utils/newEntrySchema";

export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type NewDiaryEntry = z.infer<typeof newEntrySchema>;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

enum notiType {
  Error = 0,
  Success = 1,
}

export type NotiType = {
  msg: string | null
  nType: notiType | null
}