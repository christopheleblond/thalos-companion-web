import { Button, type ButtonProps } from 'react-bootstrap';

import { useState } from 'react';
import './IconButton.css';

export type Icons = 'settings';

type Props = ButtonProps & {
  icon: Icons;
  color?: string;
  iconSize?: number;
  onClick: () => void;
};

export default function IconButton({
  icon,
  color,
  iconSize,
  variant,
  onClick,
  ...rest
}: Props) {
  const [hover, setHover] = useState(false);

  return (
    <Button
      {...rest}
      className="Button"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={styles}
      variant={variant ?? 'dark'}
      onClick={onClick}
    >
      <span
        className="material-symbols-outlined"
        style={{
          fontSize: iconSize || 20,
          color,
          borderColor: hover ? 'red' : 'white',
        }}
      >
        {icon}
      </span>
    </Button>
  );
}

const styles: React.CSSProperties = {
  padding: 0,
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: '3px',
  borderRadius: '20%',
};
