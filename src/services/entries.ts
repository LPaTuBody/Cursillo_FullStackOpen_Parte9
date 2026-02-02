import axios from "axios";
import { Entry, NewEntry } from "../types";

import { apiBaseUrl } from "../constants";

const addEntry = async (entries: NewEntry, id: string): Promise<Entry> => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    entries
  );
  return data;
};

export default { addEntry };