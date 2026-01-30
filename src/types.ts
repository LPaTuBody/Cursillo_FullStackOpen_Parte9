export interface Diagnose {
  code: string
  name: string
  latin?: string
}

export enum Gender {
  M = "male",
  F = "female",
  N = "other"
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {

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

export type NoSensibleDataPat = Omit<Patient, "ssn">;

export type newPatient = Omit<Patient, "id">;