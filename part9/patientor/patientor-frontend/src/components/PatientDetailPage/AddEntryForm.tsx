import { Button, Input, InputLabel, List, ListItem, Typography } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const AddEntryForm = () => {
  const { id: patientId } = useParams();
  const [entryDescription, setEntryDescription] = useState<string>('');
  const [entryDate, setEntryDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>('');
  console.log(patientId);

  const handleSubmitEntry = (event: React.SyntheticEvent) => {
    console.log(entryDate, entryDescription);
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
          <InputLabel htmlFor='entryDate'>date</InputLabel>
          <Input  
            value={entryDate}
            id='entryDate'
            type='date'
            onChange={(e) => setEntryDate(e.currentTarget.value)}
          />
        </ListItem>
        <ListItem>
          <InputLabel>
            description
          </InputLabel>
          <Input
            value={entryDescription}
            onChange={(e) => setEntryDescription(e.currentTarget.value)}
            id='entryDescription'
            type='text'
          />
        </ListItem>
        <ListItem>
          <InputLabel>
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
          <InputLabel>
            diagnosis codes
          </InputLabel>
          <Input
            value={diagnosisCodes}
            onChange={(e) => setDiagnosisCodes(e.currentTarget.value)}
            id='diagnosisCodes'
            type='text'
          />
        </ListItem>
      </List>

      <Button style={buttonStyle} type='submit' variant='contained'>
        submit
      </Button>
    </form>
  );
};

export default AddEntryForm;