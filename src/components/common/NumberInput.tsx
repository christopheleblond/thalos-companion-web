import { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import IconButton from './IconButton/IconButton';
import type { StyleSheet } from './Types';
import View from './View';

type Props = {
  value: number;
  label: string;
  onChange?: (n: number) => void;
};

export default function NumberInput(props: Props) {
  const [numberValue, setNumberValue] = useState(props.value);

  const inc = (dt: number) => {
    setNumberValue((prev) => prev + dt);
  };

  useEffect(() => {
    if (props.onChange) {
      props.onChange(numberValue);
    }
  }, [numberValue]);

  return (
    <View style={styles.container}>
      <View>
        <span style={styles.label}>{props.label}</span>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
        <View style={styles.button}>
          <IconButton
            icon="remove"
            iconSize={30}
            color={Colors.white}
            onClick={() => inc(-1)}
          />
        </View>
        <View style={{ minWidth: 0, alignItems: 'center' }}>
          <span style={styles.value}>{numberValue}</span>
        </View>
        <View style={styles.button}>
          <IconButton
            icon="add"
            iconSize={30}
            color={Colors.white}
            onClick={() => inc(1)}
          />
        </View>
      </View>
    </View>
  );
}

const styles: StyleSheet = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 20,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: Colors.red,
    borderRadius: 50,
  },
};
