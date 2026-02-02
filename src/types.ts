export enum Gender {
  M = "male",
  F = "female",
  N = "other"
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

// --------

export interface Diagnose {
  code: string
  name: string
  latin?: string
}

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
  entries: Entry[]
}

interface BaseEntry {
  id: string
  date: string
  specialist: string
  description: string
  diagnosisCodes?: Array<Diagnose["code"]>
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck"
  healthCheckRating: HealthCheckRating
}

interface Discharge {
  date: string
  criteria: string
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital"
  discharge: Discharge
}

interface SickLeave {
  startDate: string
  endDate: string
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  type: "OccupationalHealthcare"
  employerName: string
  sickLeave?: SickLeave
}

// ---------

export type NoSensibleDataPat = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id" | "entries">;

export type Entry =
  | HospitalEntry
  | OccupationalHealthCareEntry
  | HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> =
  T extends unknown ? Omit<T, K> : never;

export type NewEntry = UnionOmit<Entry, "id">;