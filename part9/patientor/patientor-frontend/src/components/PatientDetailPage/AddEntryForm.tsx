import { Button, Input, InputLabel, List, ListItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import patientService from '../../services/patients';
import { useParams } from 'react-router-dom';
import { EntryWithoutId } from '../../types';

type AddEntryFormProps = {
  onSuccess: () => void;
};

const AddEntryForm = (props: AddEntryFormProps) => {
  const { id: patientId } = useParams();
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosis, setDiagnosis] = useState<string>('');
  const [type, setType] = useState<string>('HealthCheck');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // HealthCheck
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);

  // Occupational Healthcare
  const [employerName, setEmployerName] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Hospital
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');
  
  if (!patientId) {
    return null;
  }

  const showHealthCheckRating = type === 'HealthCheck';
  const showOccupationalInputs = type === 'OccupationalHealthcare';
  const showDischargeInputs = type === 'Hospital';

  const handleSubmitEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const diagnosisCodes = diagnosis.split(',').map(d => d.trim());
      
      const baseEntry = {
        description,
        date,
        specialist,
        diagnosisCodes,
        type,
      };
      
      if (type === 'HealthCheck') {
        const healthCheckEntry = {
          ...baseEntry,
          healthCheckRating,
        };
        
        await patientService.addEntry(healthCheckEntry as EntryWithoutId, patientId);

      } else if (type === 'OccupationalHealthcare') {
        const occupationalHealthcareEntry = {
          ...baseEntry,
          employerName,
          sickLeave: {
            startDate,
            endDate,
          },
        };

        await patientService.addEntry(occupationalHealthcareEntry as EntryWithoutId, patientId);
      } else if (type === 'Hospital') {
        const occupationalHealthcareEntry = {
          ...baseEntry,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };

        await patientService.addEntry(occupationalHealthcareEntry as EntryWithoutId, patientId);
      }
      
      props.onSuccess();
      setDate('');
      setDescription('');
      setSpecialist('');
      setDiagnosis('');
      setType('HealthCheck');
      setHealthCheckRating(0);
      setEmployerName('');
      setStartDate('');
      setEndDate('');
      setDischargeDate('');
      setDischargeCriteria('');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  console.log(errorMessage);

  const formStyle = {
    border: '2px solid black',
    borderRadius: '1rem',
    padding: '2rem',
    margin: '1rem 0'
  };
  
  const buttonStyle = {
    width: '5rem',
    height: '2rem',
    marginBottom: '1rem'
  };

  return (
    <form onSubmit={handleSubmitEntry} style={formStyle}>
      <div>
        <Typography variant='h5'>
          entry
        </Typography>
      </div>
      <List style={{ listStyle: 'none' }}>
        <ListItem>
          <InputLabel htmlFor='date'>date</InputLabel>
          <Input  
            value={date}
            id='date'
            type='date'
            onChange={(e) => setDate(e.currentTarget.value)}
          />
        </ListItem>
        <ListItem>
          <InputLabel htmlFor='description'>
            description
          </InputLabel>
          <Input
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
            id='description'
            type='text'
          />
        </ListItem>
        <ListItem>
          <InputLabel htmlFor='specialist'>
            specialist
          </InputLabel>
          <Input
            value={specialist}
            onChange={(e) => setSpecialist(e.currentTarget.value)}
            id='specialist'
            type='text'
          />
        </ListItem>
        <ListItem>
          <InputLabel htmlFor='diagnosis'>
            diagnosis codes
          </InputLabel>
          <Input
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.currentTarget.value)}
            id='diagnosis'
            type='text'
          />
        </ListItem>
        <ListItem>
          <InputLabel htmlFor='type'>
            entry type
          </InputLabel>
          <select
            id='type'
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value='HealthCheck'>Health Check</option>
            <option value='OccupationalHealthcare'>Occupational Healthcare</option>
            <option value='Hospital'>Hospital</option>
          </select>
        </ListItem>
        {showHealthCheckRating && <ListItem>
          <InputLabel
            htmlFor='healthCheckRating'
          >
            Health Check Rating
          </InputLabel>
            <select
              id='healthCheckRating'
              value={healthCheckRating}
              onChange={(e) => setHealthCheckRating(Number(e.target.value))}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </ListItem>}

          {showOccupationalInputs &&
            <>
              <ListItem>
                <InputLabel>
                  Employer Name
                </InputLabel>
                <Input
                  type='text'
                  value={employerName}
                  onChange={(e) => setEmployerName(e.target.value)}
                  />
              </ListItem>
              <ListItem>
                <InputLabel htmlFor='startDate'>
                  Start Date
                </InputLabel>
                <Input
                  id='startDate'
                  type='date'
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </ListItem>
              <ListItem>
                <InputLabel htmlFor='endDate'>
                  End Date
                </InputLabel>
                <Input
                  id='endDate'
                  type='date'
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </ListItem>
            </>
          }

          {showDischargeInputs && 
            <>
              <ListItem>
                <InputLabel
                  htmlFor='dischargeDate'
                >discharge date</InputLabel>
                <Input
                  id='dischargeDate'
                  value={dischargeDate}
                  onChange={(e) => setDischargeDate(e.target.value)}
                  type='date'
                />
              </ListItem>
              <ListItem>
                <InputLabel
                  htmlFor='dischargeCriteria'
                >discharge criteria</InputLabel>
                <Input
                  id='dischargeCriteria'
                  value={dischargeCriteria}
                  onChange={(e) => setDischargeCriteria(e.target.value)}
                  type='text'
                />
              </ListItem>
            </>
          }
      </List>

      <Button style={buttonStyle} type='submit' variant='contained'>
        submit
      </Button>
    </form>
  );
};

export default AddEntryForm;