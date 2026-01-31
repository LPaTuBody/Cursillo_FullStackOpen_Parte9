import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@mui/material";
import type { Patient } from "../../types";

interface etProps {
  patient: Patient
  tableStyle: object
  colorr: string
}

const EntriesTable = ({ patient, tableStyle, colorr }: etProps) => {
  const entradas = patient?.entries;

  return (
    <Table sx={tableStyle}>
      <TableHead sx={{
        backgroundColor: "whitesmoke",
        '& .MuiTableCell-root': {
          fontWeight: 'bold',
        },
      }}>
        <TableRow>
          <TableCell
            colSpan={3}
            sx={{ textAlign: "center", backgroundColor: colorr }}
          >
            Entries
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Description</TableCell>
          <TableCell sx={{ textAlign: "center" }}>Date</TableCell>
          <TableCell sx={{ textAlign: "center" }}>Diagnose Codes</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {entradas?.map(e => (
          <TableRow key={e.id}>
            <TableCell width={"60%"}>
              {e.description}
            </TableCell>
            <TableCell width={"20%"} sx={{ textAlign: "center" }}>
              {e.date}
            </TableCell>
            <TableCell sx={{ whiteSpace: "pre-wrap", textAlign: "center" }}>
              {e.diagnosisCodes?.join("\n")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EntriesTable;