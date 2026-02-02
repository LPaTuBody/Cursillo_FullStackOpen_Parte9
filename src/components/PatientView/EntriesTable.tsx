import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Typography
} from "@mui/material";
import type { Patient, Diagnose } from "../../types";
import EntryDetails from "./EntriesByType";

interface etProps {
  patient: Patient
  diagnoses: Diagnose[]
  tableStyle: object
  colorr: string
}

const EntriesTable = ({ patient, diagnoses, tableStyle, colorr }: etProps) => {
  const entradas = patient.entries;

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
          <TableCell colSpan={4} sx={{ backgroundColor: colorr }}>
            Entries
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Description</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Diagnoses</TableCell>
          <TableCell>Details</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {entradas.map(e => (
          <TableRow key={e.id}>
            <TableCell width={"40%"}>
              {e.description}
            </TableCell>
            <TableCell width={"15%"} sx={{ textAlign: "center" }}>
              {e.date}
            </TableCell>
            <TableCell width={"20%"}>
              {e.diagnosisCodes?.map(code => {
                const diagnosis = diagnoses.find(d => d.code === code);
                return (
                  <Typography variant="body2" key={code} sx={{ mb: 1 }}>
                    <strong>{code}: </strong> {diagnosis?.name}
                  </Typography>
                );
              })}
            </TableCell>
            <TableCell width={"25%"}>
              <EntryDetails entry={e} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EntriesTable;