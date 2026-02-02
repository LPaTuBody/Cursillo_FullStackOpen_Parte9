import { SyntheticEvent, useState } from "react";
import {
  TextField,
  Button,
  Box
} from "@mui/material";
import { NewEntry } from "../../types";

interface AEFProps {
  closeModal: () => void
  onSubmitEntry: (val: NewEntry) => void
}

const AddEntryForm = ({ closeModal, onSubmitEntry }: AEFProps) => {
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [diagCodes, setDiagCodes] = useState("");

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const parsedCodes = diagCodes.split(",").map(v => v.trim());

    console.log({ date, specialist, description, parsedCodes })

    onSubmitEntry({
      date,
      specialist,
      description,
      diagnosisCodes: parsedCodes,
      type: "HealthCheck",
      healthCheckRating: 0
    });
  }

  return (
    <Box >
      <form onSubmit={onSubmit}>
        {/* base inputs */}
        <TextField
          fullWidth
          required
          label="Date"
          name="date"
          placeholder="YYYY-MM-DD"
          margin="normal"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          fullWidth
          required
          label="Specialist"
          name="specialist"
          margin="normal"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          fullWidth
          required
          multiline
          label="Description"
          name="description"
          margin="normal"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          fullWidth
          required
          label="Diagnosis codes"
          name="diagCodes"
          margin="normal"
          value={diagCodes}
          onChange={({ target }) => setDiagCodes(target.value)}
        />

        <Box sx={{ mt: 2, display: "flex", gap: 3 }}>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
          >Add</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => closeModal()}
          >Cancel</Button>
        </Box>
      </form>
    </Box>
  )
};

export default AddEntryForm;