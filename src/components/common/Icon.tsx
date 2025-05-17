type Props = {
  iconSize?: number;
  color?: string;
  icon: string;
};

export default function Icon({ iconSize, color, icon }: Props) {
  return (
    <span
      className="material-symbols-outlined"
      style={{
        fontSize: iconSize || 20,
        color: color ?? 'white',
      }}
    >
      {icon}
    </span>
  );
}
