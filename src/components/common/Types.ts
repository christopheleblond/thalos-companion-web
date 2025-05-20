export type Styles = React.CSSProperties | React.CSSProperties[];

export type StyleSheet = { [key: string]: React.CSSProperties };

export function concatStyles(style: Styles | undefined): React.CSSProperties {
  let result: React.CSSProperties = {};
  if (Array.isArray(style)) {
    result = style.reduce((acc, cur) => ({ ...acc, ...cur }), result);
  } else if (style !== undefined) {
    result = { ...style };
  }
  return result;
}
