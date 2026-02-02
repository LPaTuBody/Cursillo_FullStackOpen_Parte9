import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert
} from '@mui/material';

import AddEntryForm from "./AddEntryForm";
import { NewEntry } from "../../types";

interface Props {
  openModal: boolean
  closeModal: () => void
  onSubmitEntry: (val: NewEntry) => void
  error?: string
  diagCodesList: string[]
}

const AddEntryModal = (
  { openModal, closeModal, onSubmitEntry, error, diagCodesList }: Props
) => (
  <Dialog fullWidth open={openModal} onClose={() => closeModal()}>
    <DialogTitle>Add a New Entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddEntryForm
        closeModal={closeModal}
        onSubmitEntry={onSubmitEntry}
        diagCodesList={diagCodesList}
      />
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
