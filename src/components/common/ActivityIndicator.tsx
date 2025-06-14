import { ClipLoader } from 'react-spinners';
import type { StyleSheet } from './Types';

type Props = {
  color?: string;
  size?: number;
  full?: boolean;
};

export default function ActivityIndicator({ color, size }: Props) {
  return (
    <div style={styles.container}>
      <ClipLoader
        color={color ?? '#aa0000'}
        cssOverride={{}}
        loading
        size={size ?? 50}
        speedMultiplier={2}
      />
    </div>
  );
}

const styles: StyleSheet = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifySelf: 'center',
    height: '100%',
  },
};
