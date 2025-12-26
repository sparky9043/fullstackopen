import { Button } from '@mui/material';
import { useState } from 'react';

interface ToggleableProps {
  children: React.ReactNode,
  text?: string,
}

const Toggleable = (props: ToggleableProps) => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <div>
      <div style={{ display: !toggle ? 'block' : 'none' }}>
        <Button variant='outlined' onClick={() => setToggle(prev => !prev)}>{!props.text ? 'show': props.text}</Button>
      </div>
      <div style={{ display: toggle ? 'block' : 'none' }}>
        {props.children}
        <Button variant='outlined' onClick={() => setToggle(prev => !prev)}>cancel</Button>
      </div>
    </div>
  );
};

export default Toggleable;