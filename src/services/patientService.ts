import { Patient, NoSensibleDataPat } from "../types";
import patiData from "../data/patients";

export const getPatients = (): Patient[] => (patiData);

export const getNSDPatients = (): NoSensibleDataPat[] => {
  const mapedPatients = patiData.map((
    { id, name, dateOfBirth, gender, occupation }
  ) => (
    { id, name, dateOfBirth, gender, occupation }
  ));
  return mapedPatients;
};