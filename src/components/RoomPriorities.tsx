import type { GameDay } from '../model/GameDay';
import { getWeekNumber } from '../utils/Utils';
import type { StyleSheet } from './common/Types';
import View from './common/View';

type Props = {
  day: GameDay;
};
export default function RoomPriorities({ day }: Props) {
  return (
    <View style={styles.roomsPriorityActivities}>
      {/* Semaines paires Fig=Grande salle, Algéco=JDS */}
      <View style={{ flex: 1, alignItems: 'center' }}>
        <span style={{ fontWeight: 'bold' }}>Grande salle & Annexe</span>
        <span>
          {getWeekNumber(day.date) % 2 === 0 ? 'Figurines' : 'Autres activités'}
        </span>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}
      >
        <span style={{ fontWeight: 'bold' }}> Algéco</span>
        <span>
          {getWeekNumber(day.date) % 2 === 0 ? 'Autres activités' : 'Figurines'}
        </span>
      </View>
    </View>
  );
}

const styles: StyleSheet = {
  roomsPriorityActivities: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'lightgray',
  },
};
