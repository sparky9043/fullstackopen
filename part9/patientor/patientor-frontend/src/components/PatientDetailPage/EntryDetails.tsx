import type { Entry } from '../../types';

interface EntryDetailProps {
  entry: Entry;
}

const EntryDetails = (props: EntryDetailProps) => {
  console.log(props);
  return (
    <p>hello</p>
  );
};

export default EntryDetails;