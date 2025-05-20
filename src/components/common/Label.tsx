import Icon from './Icon';

type Props = {
  icon?: string;
  size?: number;
  color?: string;
  children?: React.ReactNode;
};

export default function Label({ icon, color, size, children }: Props) {
  return (
    <span
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
      }}
    >
      {icon ? <Icon icon={icon} iconSize={size} color={color} /> : null}
      {children}
    </span>
  );
}
