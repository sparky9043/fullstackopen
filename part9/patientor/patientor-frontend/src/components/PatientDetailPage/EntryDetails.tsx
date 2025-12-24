import type { Entry } from '../../types';

interface EntryDetailProps {
  entry: Entry;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({ entry }: EntryDetailProps) => {

  const entryDetailByType = (): JSX.Element => {
    switch (entry.type) {
      case 'HealthCheck':
        return <div>
          health check
        </div>;
      case 'Hospital':
        return <div>
          hospital
        </div>;
      case 'OccupationalHealthcare':
        return <div>
          occupational health care
        </div>;
      default:
        return assertNever(entry);
    }
  };

  return (
    <div>
      <p>{entry.description}</p>
      <p>{entry.specialist}</p>
      {entryDetailByType()}
    </div>
  );
};

export default EntryDetails;