import { BounceLoader } from 'react-spinners';

type Props = {
  color?: string;
  size?: number;
};

export default function ActivityIndicator({ color, size }: Props) {
  return (
    <div>
      <BounceLoader
        color={color ?? '#aa0000'}
        cssOverride={{}}
        loading
        size={size ?? 50}
        speedMultiplier={2}
      />
    </div>
  );
}
