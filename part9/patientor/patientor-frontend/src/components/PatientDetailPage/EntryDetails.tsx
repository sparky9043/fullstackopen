import { List, Typography } from '@mui/material';
import type { Entry } from '../../types';
import DiagnosisDetails from './DiagnosisDetails';

interface EntryDetailProps {
  entry: Entry;
}

const EntryDetails = ({ entry }: EntryDetailProps) => {
  
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const entryDetailByType = (): JSX.Element => {
    switch (entry.type) {
      case 'HealthCheck':
        return <div>
          <Typography>
            Health Level: {entry.healthCheckRating}
          </Typography>
        </div>;
      case 'Hospital':
        return <div>
            {entry.discharge
              ? <>
                  <Typography>
                    Discharge Date: {entry.discharge.date}
                  </Typography>
                  <Typography>
                    Reason: {entry.discharge.criteria}
                  </Typography>
                </>
              : null}
        </div>;
      case 'OccupationalHealthcare':
        return <div>
          <Typography>
            Employer Name: {entry.employerName}
          </Typography>
          {entry.sickLeave
            ? <div>
                <Typography>
                  Start Date: {entry.sickLeave.startDate}
                </Typography>
                <Typography>
                  End Date: {entry.sickLeave.endDate}
                </Typography>
              </div>
            : null}
        </div>;
      default:
        return assertNever(entry);
    }
  };

  const entryStyles = {
    border: '2px solid black',
    borderRadius: '10px',
    marginBottom: '1rem',
    padding: '1rem',
  };

  return (
    <div style={entryStyles}>
      <Typography variant='body1'>
        {entry.date} {entry.description}
      </Typography>
      ---
      {entryDetailByType()}
      <Typography variant='body1'>
        diagnosed by {entry.specialist}
      </Typography>
      <List>
        {entry.diagnosisCodes &&
          entry.diagnosisCodes.map(code =>
            <DiagnosisDetails key={code} code={code} />
          )
        }
      </List>
    </div>
  );
};

export default EntryDetails;