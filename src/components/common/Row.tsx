import { concatStyles, type Styles } from './Types';

type Props = {
  style?: Styles;
  children?: React.ReactNode;
};

export default function Row({ style, children }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        ...concatStyles(style),
      }}
    >
      {children}
    </div>
  );
}
