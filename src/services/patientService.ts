import { Patient, NoSensibleDataPat, newPatient } from "../types";
import patiData from "../data/patients";
import { v1 as uuid } from "uuid";

export const getPatients = (): Patient[] => (patiData);

export const getNSDPatients = (): NoSensibleDataPat[] => {
  const mapedPatients = patiData.map((
    { id, name, dateOfBirth, gender, occupation }
  ) => (
    { id, name, dateOfBirth, gender, occupation }
  ));
  return mapedPatients;
};

export const addPatient = (entry: newPatient): Patient => {
  const addedPatient = { id: uuid(), ...entry };
  patiData.push(addedPatient);
  return addedPatient;
};