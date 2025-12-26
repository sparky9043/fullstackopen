import { Button } from '@mui/material';
import { useState } from 'react';

interface ToggleableProps {
  children: React.ReactNode,
  text?: string,
}

const Toggleable = (props: ToggleableProps) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const handleToggle = (): void => setToggle(prev => !prev);

  return (
    <div>
      <div style={{ display: toggle ? 'none' : 'block' }}>
        <Button variant='outlined' onClick={handleToggle}>{!props.text ? 'show': props.text}</Button>
      </div>
      <div style={{ display: toggle ? 'block' : 'none' }}>
        {props.children}
        <Button variant='outlined' onClick={handleToggle}>cancel</Button>
      </div>
    </div>
  );
};

export default Toggleable;