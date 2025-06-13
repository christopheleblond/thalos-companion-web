import { useEffect, useState } from 'react';
import ActivityIndicator from '../components/common/ActivityIndicator';
import type { StyleSheet } from '../components/common/Types';
import View from '../components/common/View';
import RoomKeyCard from '../components/RoomKeyCard';
import { Colors } from '../constants/Colors';
import type { RoomKey } from '../model/RoomKey';
import type { User } from '../model/User';
import { keyService } from '../services/KeyService';

export default function KeysPage() {
  const [keys, setKeys] = useState<RoomKey[]>([]);
  const [loading, setLoading] = useState(false);

  const changeKeyOwner = (user: User, key: RoomKey) => {
    setLoading(true);
    keyService
      .updateKey({
        ...key,
        owner: {
          id: user.id,
          name: user.name ?? '',
        },
      })
      .then((res) => {
        const foundIndex = keys.findIndex((k) => k.id === res.id);
        if (foundIndex >= 0) {
          const newKeys = [...keys];
          newKeys[foundIndex] = { ...res };
          setKeys(newKeys);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    keyService
      .findAllKeys()
      .then((keys) => {
        setKeys(keys.sort((a, b) => a.name.localeCompare(b.name)));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <span style={styles.title}>Badges de la salle</span>
      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator color={Colors.red} size={50} />
          </View>
        ) : null}
        {!loading ? (
          <div>
            {keys.map((k) => (
              <RoomKeyCard
                key={k.id}
                roomKey={k}
                onChangeOwner={(user) => changeKeyOwner(user, k)}
              />
            ))}
          </div>
        ) : null}
      </View>
    </View>
  );
}

const styles: StyleSheet = {
  container: {
    flex: 1,
  },
  title: {
    alignSelf: 'center',
    fontSize: 16,
    textTransform: 'uppercase',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: Colors.gray,
    padding: 10,
  },
};
