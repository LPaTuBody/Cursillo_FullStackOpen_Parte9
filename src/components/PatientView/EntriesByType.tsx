import { Box, Typography } from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Entry, HealthCheckRating, EntryTypes } from "../../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HealthRatingIcon = ({ rating }: { rating: HealthCheckRating }) => {
  switch (rating) {
    case 0: return <FavoriteIcon sx={{ color: "green" }} />;
    case 1: return <FavoriteIcon sx={{ color: "yellow" }} />;
    case 2: return <FavoriteIcon sx={{ color: "orange" }} />;
    case 3: return <FavoriteIcon sx={{ color: "red" }} />;
    default: return null;
  }
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case EntryTypes.HC:
      return (
        <Box>
          <Box display="flex" alignItems="center" gap={1}>
            <HealthRatingIcon rating={entry.healthCheckRating} />
            <Typography variant="body2">
              <strong>Specialist:</strong> {entry.specialist}
            </Typography>
          </Box>
        </Box>
      );
    case EntryTypes.H:
      return (
        <Box>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <LocalHospitalIcon color="error" />
            <Typography variant="body2">
              <strong>Specialist:</strong> {entry.specialist}
            </Typography>
          </Box>
          <Typography variant="body2">
            <strong>Discharge:</strong> {entry.discharge.date}
          </Typography>
          <Typography variant="caption" fontStyle="italic">
            {entry.discharge.criteria}
          </Typography>
        </Box>
      );
    case EntryTypes.OHC:
      return (
        <Box>
          <Box display="flex" alignItems="center" gap={1}>
            <WorkIcon color="primary" />
            <Typography variant="body2" fontWeight="bold">
              {entry.employerName}
            </Typography>
          </Box>
          <Typography variant="body2">
            <strong>Specialist:</strong> {entry.specialist}
          </Typography>
          {entry.sickLeave && (
            <Typography variant="body2" mt={1}>
              <strong>Sick Leave:</strong> <br />
              {entry.sickLeave.startDate}
              <i> to </i>
              {entry.sickLeave.endDate}
            </Typography>
          )}
        </Box>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;