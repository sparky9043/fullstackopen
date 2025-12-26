import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { List, Typography } from '@mui/material';
import patients from '../../services/patients';
import { Patient } from '../../types';
import EntryDetails from './EntryDetails';
import Toggleable from './AddEntryForm/Toggleable';

const PatientDetail = () => {
  const { id: patientId } = useParams();
  const [patientDetails, setPatientDetails] = useState<Patient | null | undefined>(null);

  useEffect(() => {
    const fetchPatientById = async () => {
      if (patientId) {
        const patient = await patients.getPatientById(patientId);
        setPatientDetails(patient);
      }
    };

    void fetchPatientById();
  }, [patientId]);

  if (!patientDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Toggleable text="add patient entry">
        <p>Hello</p>
      </Toggleable>
      <Typography variant="h4" style={{ marginBottom: "0.5em", fontWeight: "bold" }}>
        {patientDetails.name} {patientDetails.gender === 'male' ? '♂' : '♀'}
      </Typography>
      <Typography variant='body2'>
        {patientDetails.ssn}
      </Typography>
      <Typography variant='body2'>
        {patientDetails.occupation}
      </Typography>
      <Typography variant="h5" style={{ fontWeight: 'bold' }}>
        entries
      </Typography>
      {patientDetails.entries.length > 0
        ? <List>
          {patientDetails.entries.map(entry =>
            <EntryDetails key={entry.id} entry={entry} />)}
        </List>
        : <Typography variant='h5'>
          no entries
        </Typography> 
      }
    </div>
  );
};

export default PatientDetail;