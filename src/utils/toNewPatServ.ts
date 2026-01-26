import { Gender, newPatient } from "../types";

const isString = (text: unknown): text is string => (typeof text === "string");

const isDate = (date: string): boolean => (Boolean(Date.parse(date)));

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

// -------- parsers

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) throw new Error("Incorrect or missing name");
  return name;
};

const parseDateBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date of birth");
  }
  return date;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) throw new Error("Incorrect or missing SSN");
  return ssn;
};

const parseGender = (gender: unknown) => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};

const parseOcupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  };
  return occupation;
};

// -------- mambo

export const toNewPatientParser = (data: unknown): newPatient => {
  if (!data || typeof data !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (!(
    "name" in data &&
    "dateOfBirth" in data &&
    "ssn" in data &&
    "gender" in data &&
    "occupation" in data
  )) throw new Error("Incorrect data: some fields are missing");

  const newEntry: newPatient = {
    name: parseName(data.name),
    dateOfBirth: parseDateBirth(data.dateOfBirth),
    ssn: parseSSN(data.ssn),
    gender: parseGender(data.gender),
    occupation: parseOcupation(data.occupation),
  };
  return newEntry;
};