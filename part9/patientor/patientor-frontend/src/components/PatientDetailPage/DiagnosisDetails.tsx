// import { ListItem, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Diagnosis } from '../../types';
import diagnosisService from '../../services/diagnoses';
import { Typography } from '@mui/material';

interface DiagnosisDetailsProps {
  code: string;
}

const DiagnosisDetails = ({ code }: DiagnosisDetailsProps) => {
  const [diagnosis, setDiagnosis] = useState<Diagnosis | null>();

  useEffect(() => {
    const fetchDiagnosis = async () => {
      await diagnosisService.getDiagnosisByCode(code)
        .then(data => setDiagnosis(data));
    };

    void fetchDiagnosis();
  }, [code]);

  if (!diagnosis) {
    return null;
  }

  const diagnosisItemStyles = {
    marginLeft: '1rem',
    listStyleType: 'disc',
  };

  return (
    <li style={diagnosisItemStyles}>
      <Typography>
        {diagnosis.code} {diagnosis.name}
      </Typography>
    </li>
  );
};

export default DiagnosisDetails;