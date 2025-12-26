import { Button, Input, InputLabel, List, ListItem, Typography } from '@mui/material';
import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';

const AddEntryForm = () => {
  // const { id: patientId } = useParams();
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosis, setDiagnosis] = useState<string>('');
  const [type, setType] = useState<string>('HealthCheck');
  // console.log(patientId);

  const handleSubmitEntry = (event: React.SyntheticEvent) => {
    const diagnosisCodes = diagnosis.split(',').map(d => d.trim());

    const entry = {
      description,
      date,
      specialist,
      diagnosisCodes,
      type,
    };
    
    console.log(entry);
    event.preventDefault();
  };

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
      </List>

      <Button style={buttonStyle} type='submit' variant='contained'>
        submit
      </Button>
    </form>
  );
};

export default AddEntryForm;