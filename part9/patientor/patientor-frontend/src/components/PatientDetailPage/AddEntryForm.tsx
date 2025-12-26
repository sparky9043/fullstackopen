import { Button, Typography } from '@mui/material';

const AddEntryForm = () => {
  const handleSubmitEntry = (event: React.SyntheticEvent) => {
    console.log(event);
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

      <Button style={buttonStyle} type='submit' variant='contained'>
        submit
      </Button>
    </form>
  );
};

export default AddEntryForm;