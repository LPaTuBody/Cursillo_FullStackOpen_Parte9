import axios from "axios";
import { Patient, NewPatient } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getPatient = async (id: string | undefined): Promise<Patient | string> => {
  try {
    const { data } = await axios.get<Patient>(
      `${apiBaseUrl}/patients/${id}`
    );
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Axios error:", err.response);
      return err.response?.data as string;
    } else {
      console.error(err);
      let errMsg = "";
      if (err instanceof Error) errMsg = err.message;
      return errMsg;
    }
  }
}

const create = async (object: NewPatient) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

export default {
  getAll, create, getPatient
};

