import { Colors } from '../../constants/Colors';
import { concatStyles, type Styles } from './Types';
import View, { type ViewProps } from './View';

type Props = ViewProps & {
  size?: number;
  style?: Styles;
  color?: string;
  textColor?: string;
};

const defaultSizeInPx = 14;

export default function Tag({
  style,
  size,
  color,
  textColor,
  children,
  ...props
}: Props) {
  return (
    <View
      {...props}
      style={{
        paddingLeft: '5px',
        paddingRight: '5px',
        borderRadius: '5px',
        backgroundColor: color || Colors.gray,
        color: textColor || Colors.black,
        fontSize: `${size || defaultSizeInPx}px`,
        ...concatStyles(style),
      }}
    >
      {children}
    </View>
  );
}
