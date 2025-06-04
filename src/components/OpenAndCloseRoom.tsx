import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Colors } from '../constants/Colors';
import type { GameDay } from '../model/GameDay';
import type { OpenCloseRoom } from '../model/Room';
import { roomService } from '../services/RoomService';
import ActivityIndicator from './common/ActivityIndicator';
import Icon from './common/Icon';
import View from './common/View';

type Props = {
  day: GameDay;
};

export default function OpenAndCloseRoom({ day }: Props) {
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<OpenCloseRoom>({
    dayId: day.id,
    openAt: '20h',
  });

  useEffect(() => {
    setLoading(true);
    roomService
      .getOpenCloseConfig(day.id)
      .then((config) => {
        setConfig(config);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [day.id]);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      {loading ? <ActivityIndicator color={Colors.red} size={50} /> : null}
      <Card style={{ flexDirection: 'row', alignItems: 'center', flexGrow: 1 }}>
        <View
          style={{
            backgroundColor: Colors.gray,
            marginRight: 10,
            padding: 5,
            borderRadius: 20,
          }}
        >
          <Icon icon="lock_open" iconSize={30} color={Colors.white} />
        </View>
        <View>
          <span>
            Ouverture à{' '}
            <span style={{ fontWeight: 'bold' }}>{config.openAt}</span>
          </span>
          <span>
            par :{' '}
            <span style={{ fontWeight: 'bold' }}>
              {config.opener?.name ?? '--'}
            </span>
          </span>
        </View>
      </Card>
      <Card
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexGrow: 1,
        }}
      >
        <View>
          <span>Fermeture par :</span>
          <span style={{ fontWeight: 'bold' }}>
            {config.closer?.name ?? '--'}
          </span>
        </View>
        <View
          style={{
            backgroundColor: Colors.black,
            padding: 5,
            borderRadius: 20,
          }}
        >
          <Icon icon="lock" iconSize={30} color={Colors.white} />
        </View>
      </Card>
    </View>
  );
}
