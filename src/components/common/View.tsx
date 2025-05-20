import { type ReactNode } from 'react';
import { concatStyles, type Styles } from './Types';

export type ViewProps = { style?: Styles; children?: ReactNode };

export default function View({ style, children }: ViewProps) {
  const styles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    ...concatStyles(style),
  };
  return <div style={styles}>{children ?? null}</div>;
}
