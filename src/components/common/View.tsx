import { type ReactNode } from 'react';

type ViewProps = { style?: React.CSSProperties; children?: ReactNode };

export default function View({ children }: ViewProps) {
  const styles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };
  return <div style={styles}>{children ?? null}</div>;
}
