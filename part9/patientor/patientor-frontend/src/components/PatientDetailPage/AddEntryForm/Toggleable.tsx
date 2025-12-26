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
        <button onClick={() => setToggle(prev => !prev)}>{!props.text ? 'show': props.text}</button>
      </div>
      <div style={{ display: toggle ? 'block' : 'none' }}>
        {props.children}
        <button onClick={() => setToggle(prev => !prev)}>cancel</button>
      </div>
    </div>
  );
};

export default Toggleable;