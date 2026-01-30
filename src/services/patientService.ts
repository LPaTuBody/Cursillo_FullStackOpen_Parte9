import { Patient, NoSensibleDataPat, newPatient } from "../types";
import patiData from "../data/patients";
import { v1 as uuid } from "uuid";

export const getPatients = (): Patient[] => (patiData);

export const getNSDPatients = (): NoSensibleDataPat[] => {
  const mapedPatients = patiData.map((
    { id, name, dateOfBirth, gender, occupation, entries }
  ) => (
    { id, name, dateOfBirth, gender, occupation, entries }
  ));
  return mapedPatients;
};

export const getOnePatient = (id: string): Patient | undefined => {
  const patient = patiData.find(p => p.id === id);
  if (patient === undefined) return undefined;
  else {
    return {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      ssn: patient.ssn,
      gender: patient.gender,
      occupation: patient.occupation,
      entries: patient.entries
    };
  }
};

export const addPatient = (entry: newPatient): Patient => {
  const addedPatient = { id: uuid(), ...entry };
  patiData.push(addedPatient);
  return addedPatient;
};