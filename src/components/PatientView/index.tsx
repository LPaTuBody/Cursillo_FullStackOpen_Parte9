import { useEffect, useState } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Box
} from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

import patientService from "../../services/patients";
import { type Patient, Gender } from "../../types";

interface genderCell {
  color: string,
  icon: JSX.Element
}

const PatientView = () => {
  const [patient, setPatient] = useState<Patient>();
  const navigate = useNavigate();
  const matchpati = useMatch("/patient/:id");
  console.log("matchea", matchpati?.params.id);

  useEffect(() => {
    patientService.getPatient(matchpati?.params.id).then((r) => {
      console.log(r)
      if (typeof r === "string") navigate(`/error/${r}`);
      else setPatient(r);
    })
  }, []);

  console.log(patient)

  const defineGenderIcon = (): genderCell => {
    if (patient?.gender === Gender.Female) {
      return { color: "pink", icon: <FemaleIcon /> }
    } else if (patient?.gender === Gender.Male) {
      return { color: "lightskyblue", icon: <MaleIcon /> }
    } else {
      return { color: "lightyellow", icon: <CircleOutlinedIcon /> }
    }
  };

  const genderIcon = defineGenderIcon();

  const rightColumn = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "whitesmoke",
    fontWeight: "bold"
  }

  return (
    <Box>
      <Table sx={{
        backgroundColor: "rgba(237, 237, 237, 0.26)",
        mt: 5,
        borderRadius: 3,
        overflow: "hidden"
      }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", width: "80%" }}>
              {patient?.name}
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
            <TableCell>{patient?.ssn}</TableCell>
            <TableCell sx={rightColumn}>SSN</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{patient?.dateOfBirth}</TableCell>
            <TableCell sx={rightColumn}>Date of Birth</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{patient?.occupation}</TableCell>
            <TableCell sx={rightColumn}>Occupation</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default PatientView;