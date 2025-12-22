import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../../constants';
import { Typography } from '@mui/material';

const PatientDetail = () => {
  const { id: patientId } = useParams();

  useEffect(() => {
    const fetchPatientById = async () => {
      const response = await axios.get(`${apiBaseUrl}/patients/${patientId}`);
      console.log(response.data);
    };

    void fetchPatientById();
  }, [patientId]);

  return (
    <div>
      <Typography variant="h4" style={{ marginBottom: "0.5em" }}>
        Hello
      </Typography>
    </div>
  );
};

export default PatientDetail;