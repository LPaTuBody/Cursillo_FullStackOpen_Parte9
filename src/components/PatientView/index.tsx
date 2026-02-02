import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Box,
  Typography,
} from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

import patientService from "../../services/patients";
import { type Patient, Gender, Entry } from "../../types";
import EntriesTable from "./EntriesTable";
import AddEntryModalButton from "../AddEntryModal/AEMButton";

interface genderCell {
  color: string,
  icon: JSX.Element
}

const PatientView = () => {
  const [patient, setPatient] = useState<Patient>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  if (!id) throw new Error("Missing patient id");

  useEffect(() => {
    patientService.getPatient(id).then((r) => {
      if (typeof r === "string") navigate(`/error/${r}`);
      else setPatient(r);
    });
  }, [id, navigate]);

  if (!patient) return <Typography>Loading...</Typography>;

  const defineGenderIcon = (): genderCell => {
    if (patient.gender === Gender.F) {
      return { color: "pink", icon: <FemaleIcon /> };
    } else if (patient.gender === Gender.M) {
      return { color: "lightskyblue", icon: <MaleIcon /> };
    } else {
      return { color: "lightyellow", icon: <CircleOutlinedIcon /> };
    }
  };

  const genderIcon = defineGenderIcon();

  const updateEntries = (entry: Entry) => {
    if (patient) {
      setPatient({ ...patient, entries: patient.entries.concat(entry) });
    }
  };
  

  // styles
  const rightColumn = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "whitesmoke",
    fontWeight: "bold"
  };

  const tableStyle = {
    backgroundColor: "rgba(237, 237, 237, 0.26)",
    mt: 5,
    mb: 3,
    borderRadius: 3,
    overflow: "hidden"
  };

  return (
    <Box>
      <Table sx={tableStyle}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", width: "80%" }}>
              {patient.name}
            </TableCell>
            <TableCell sx={{
              backgroundColor: genderIcon.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              {genderIcon.icon}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{patient.ssn}</TableCell>
            <TableCell sx={rightColumn}>SSN</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{patient.dateOfBirth}</TableCell>
            <TableCell sx={rightColumn}>Date of Birth</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{patient.occupation}</TableCell>
            <TableCell sx={rightColumn}>Occupation</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <AddEntryModalButton patient={patient} onEntryAdded={updateEntries} />

      <EntriesTable
        patient={patient}
        tableStyle={tableStyle}
        colorr={genderIcon.color}
      />
    </Box>
  );
};

export default PatientView;