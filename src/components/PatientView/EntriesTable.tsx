import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Box,
} from "@mui/material";
import type { Patient, Diagnose } from "../../types";
import diagService from "../../services/diagnoses";

interface etProps {
  patient: Patient
  tableStyle: object
  colorr: string
}

const EntriesTable = ({ patient, tableStyle, colorr }: etProps) => {
  const entradas = patient?.entries;
  const [diagnoses, setDiagnoses] = useState<Diagnose[]>();

  console.log(entradas)

  useEffect(() => {
    diagService.getAll().then(d => {
      console.log(d)
      setDiagnoses(d)
    })
  }, []);

  console.log(diagnoses)

  return (
    <Table sx={tableStyle}>
      <TableHead sx={{
        backgroundColor: "whitesmoke",
        '& .MuiTableCell-root': {
          fontWeight: 'bold',
          textAlign: "center",
        },
      }}>
        <TableRow>
          <TableCell colSpan={3} sx={{ backgroundColor: colorr }}>
            Entries
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Description</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Diagnoses</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {entradas?.map(e => (
          <TableRow key={e.id}>
            <TableCell width={"45%"}>
              {e.description}
            </TableCell>
            <TableCell width={"20%"} sx={{ textAlign: "center" }}>
              {e.date}
            </TableCell>
            <TableCell sx={{  }}>
              {e.diagnosisCodes?.map(code => {
                const diagnosis = diagnoses?.find(d => d.code === code);
                return (
                  <Box key={code} sx={{ mb: 2 }}>
                    <span style={{ fontWeight: "bold" }}>{code}: </span>
                    {diagnosis?.name}
                  </Box>
                );
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EntriesTable;