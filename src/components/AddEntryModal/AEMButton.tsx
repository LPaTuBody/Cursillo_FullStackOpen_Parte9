import { useState } from "react";
import { Button } from "@mui/material";
import AddEntryModal from ".";
import type { NewEntry, Patient, Entry } from "../../types";
import entriesService from "../../services/entries";
import { getErrorMessage } from "../../utils/errorHelper";

interface AEMBProps {
  patient: Patient;
  onEntryAdded: (entry: Entry) => void;
  diagCodesList: string[]
}

const AddEntryModalButton = (
  { patient, onEntryAdded, diagCodesList }: AEMBProps
) => {
  const [modalSt, setModalSt] = useState(false);
  const [error, setError] = useState("");

  const closeModal = (): void => {
    setModalSt(false);
    setError("");
  };

  const onSubmitEntry = async (entries: NewEntry) => {
    try {
      const e = await entriesService.addEntry(entries, patient.id);
      onEntryAdded(e);
      closeModal();
    } catch (err: unknown) {
      console.log("Error while adding an entry:", err);
      setError(getErrorMessage(err));
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setModalSt(true)}
      >
        Add new entry
      </Button>

      <AddEntryModal
        openModal={modalSt}
        closeModal={closeModal}
        onSubmitEntry={onSubmitEntry}
        error={error}
        diagCodesList={diagCodesList}
      />
    </>
  );
};

export default AddEntryModalButton;