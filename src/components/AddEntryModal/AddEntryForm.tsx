import { SyntheticEvent, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import { type NewEntry, EntryTypes, HealthCheckRating } from "../../types";

interface AEFProps {
  closeModal: () => void
  onSubmitEntry: (val: NewEntry) => void
  diagCodesList: string[]
}

const AddEntryForm = (
  { closeModal, onSubmitEntry, diagCodesList }: AEFProps
) => {
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [diagCodes, setDiagCodes] = useState<string[]>([]);
  const [eType, setEType] = useState("");
  const [hcRating, setHcRating] = useState<HealthCheckRating>(0);
  const [dischargeDate, setDisDate] = useState("");
  const [criteria, setCriteria] = useState("");
  const [employer, setEmployer] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const onSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    if (!eType) throw new Error("An entry type need to be setted.");
    const baseInputs = {
      date,
      specialist,
      description,
      diagnosisCodes: diagCodes,
    };

    if (eType === EntryTypes.HC) {
      onSubmitEntry({
        ...baseInputs,
        type: EntryTypes.HC,
        healthCheckRating: hcRating
      });
    } else if (eType === EntryTypes.H) {
      onSubmitEntry({
        ...baseInputs,
        type: EntryTypes.H,
        discharge: { date: dischargeDate, criteria: criteria }
      });
    } else if (eType === EntryTypes.OHC) {
      onSubmitEntry({
        ...baseInputs,
        type: EntryTypes.OHC,
        employerName: employer,
        sickLeave: { startDate, endDate }
      });
    }
  };

  const flexBoxStyle = {
    boxSizing: "border-box",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  };

  return (
    <Box >
      <form onSubmit={onSubmit}>
        {/* base inputs */}
        <Box sx={flexBoxStyle}>
          <TextField
            required
            label="Date"
            name="date"
            type="date"
            margin="normal"
            value={date}
            onChange={({ target }) => setDate(target.value)}
            sx={{ width: "49%" }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            required
            label="Specialist"
            name="specialist"
            margin="normal"
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
            sx={{ width: "49%" }}
          />
          <TextField
            required
            label="Description"
            name="description"
            margin="normal"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            sx={{ width: "49%" }}
          />
          <FormControl margin="normal" required sx={{ width: "49%" }}>
            <InputLabel id="diagnosis-codes">Diagnosis Codes</InputLabel>
            <Select
              labelId="diagnosis-codes"
              multiple
              value={diagCodes}
              onChange={({ target }) => setDiagCodes(target.value as string[])}
            >
              {diagCodesList.map(dc => (
                <MenuItem value={dc} key={dc}>{dc}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <FormControl fullWidth margin="normal" required>
          <InputLabel id="entry-type">Entry Type</InputLabel>
          <Select
            labelId="entry-type"
            value={eType}
            onChange={({ target }) => setEType(target.value)}
          >
            {Object.values(EntryTypes).map(et => (
              <MenuItem value={et} key={et}>
                {et.replace(/([a-z])([A-Z])/g, "$1 $2")}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Health Check Entry */}
        {eType === EntryTypes.HC && (
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="hcr">Health Check Rating</InputLabel>
            <Select
              labelId="hcr"
              value={hcRating}
              onChange={({ target }) => setHcRating(Number(target.value))}
            >
              {Object.values(HealthCheckRating)
                .filter((v): v is number => typeof v === "number")
                .map((v) => (
                  <MenuItem key={v} value={v}>
                    {HealthCheckRating[v].replace(/([a-z])([A-Z])/g, "$1 $2")}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}

        {/* Hospital Entry */}
        {eType === EntryTypes.H && (
          <Box sx={{ ...flexBoxStyle, mt: 1 }}>
            <TextField
              required
              label="Discharge Date"
              name="discharge-date"
              type="date"
              value={dischargeDate}
              onChange={({ target }) => setDisDate(target.value)}
              sx={{ width: "49%" }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              required
              label="Criteria"
              name="criteria"
              value={criteria}
              onChange={({ target }) => setCriteria(target.value)}
              sx={{ width: "49%" }}
            />
          </Box>
        )}

        {/* Occupational Healthcare Entry */}
        {eType === EntryTypes.OHC && (
          <>
            <TextField
              fullWidth
              required
              label="Employer Name"
              name="employer"
              margin="normal"
              value={employer}
              onChange={({ target }) => setEmployer(target.value)}
            />
            <Box sx={flexBoxStyle}>
              <TextField
                label="Start Date"
                name="start-date"
                type="date"
                margin="normal"
                value={startDate}
                onChange={({ target }) => setStartDate(target.value)}
                sx={{ width: "49%" }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="End Date"
                name="end-date"
                type="date"
                margin="normal"
                value={endDate}
                onChange={({ target }) => setEndDate(target.value)}
                sx={{ width: "49%" }}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </>
        )}

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
  );
};

export default AddEntryForm;