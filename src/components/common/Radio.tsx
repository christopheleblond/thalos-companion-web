import { useState } from 'react';
import { Colors } from '../../constants/Colors';
import type { StyleSheet } from './Types';
import View from './View';

type RadioOption = { value: string; label: string };

type Props = {
  label: string;
  value: string;
  options: RadioOption[];
  onChange: (value: string) => void;
};

export default function Radio({
  label,
  value,
  options,
  onChange,
  ...props
}: Props) {
  const defaultValue = options ? options[0].value : '';
  const [checkedValue, setCheckedValue] = useState(value || defaultValue);

  const onCheck = (value: string) => {
    setCheckedValue(value);
    if (onChange) onChange(value);
  };

  return (
    <View style={styles.container} {...props}>
      <span style={styles.label}>{label}</span>
      <View style={{ flexDirection: 'row', gap: 5 }}>
        {options.map((o) => (
          <button key={o.value} onClick={() => onCheck(o.value)}>
            <View
              style={[
                styles.option,
                checkedValue === o.value ? styles.checked : {},
              ]}
            >
              <span style={checkedValue === o.value ? styles.checked : {}}>
                {o.label}
              </span>
            </View>
          </button>
        ))}
      </View>
    </View>
  );
}

const styles: StyleSheet = {
  container: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  label: {
    fontSize: 20,
  },
  option: {
    backgroundColor: 'lightgray',
    width: 80,
    borderRadius: 50,
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
  },
  checked: {
    backgroundColor: Colors.red,
    color: 'white',
  },
};
