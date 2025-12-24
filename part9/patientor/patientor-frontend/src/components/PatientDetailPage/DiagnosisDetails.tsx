import { ListItem } from '@mui/material';

interface DiagnosisDetailsProps {
  code: string;
}

const DiagnosisDetails = ({ code }: DiagnosisDetailsProps) => {
  console.log(code);

  return (
    <ListItem>
      diagnosis details
    </ListItem>
  );
};

export default DiagnosisDetails;