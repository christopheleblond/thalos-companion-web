import { useContext, useEffect, useState } from 'react';
import { Card, type CardProps } from 'react-bootstrap';
import { Colors } from '../constants/Colors';
import { AppContext } from '../contexts/AppContext';
import type { AgendaEvent } from '../model/AgendaEvent';
import type { GameDay } from '../model/GameDay';
import { agendaService } from '../services/AgendaService';
import { settingsService } from '../services/SettingsService';
import { printGameDay } from '../utils/Utils';
import ActivityIndicator from './common/ActivityIndicator';
import Icon from './common/Icon';
import type { StyleSheet } from './common/Types';
import View from './common/View';
import './GameDayCard.css';

type Props = CardProps & {
  day: GameDay;
};

export default function GameDayCard({ day }: Props) {
  const appContext = useContext(AppContext);
  const [events, setEvents] = useState<AgendaEvent[]>([]);
  const [loading, setLoading] = useState(false);

  const needARefresh =
    appContext.refreshs[`agenda`] || appContext.refreshs[`agenda.${day.id}`];

  useEffect(() => {
    setLoading(true);
    settingsService
      .get()
      .then((prefs) =>
        agendaService
          .findEventsOfDay(day.id)
          .then((events) => ({ events, prefs }))
      )
      .then(({ events, prefs }) => {
        const filteredEvents = events.filter((e) =>
          settingsService.activityVisible(prefs, e.activityId ?? '')
        );
        setEvents(filteredEvents);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [day, needARefresh]);

  return (
    <Card
      style={day.date.getDay() === 5 ? styles.friday : {}}
      className="game-day-card"
    >
      <View
        style={{
          padding: 5,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Icon icon="today" color={'gray'} />
        <span style={styles.day}>{printGameDay(day)}</span>
      </View>

      {loading ? <ActivityIndicator color={Colors.red} /> : null}
      <View style={{ paddingTop: 10 }}>
        {!events || events.length === 0 ? (
          <span style={styles.emptyText}>Aucun évènement prévu</span>
        ) : null}
        {events &&
          events.map((e) => (
            <span
              style={{
                ...styles.event,
                backgroundColor: e.activity?.style.backgroundColor,
                color: e.activity?.style.color,
              }}
              key={e.id}
            >
              {e.start} - {e.activity?.name} : {e.title}
            </span>
          ))}
      </View>
    </Card>
  );
}

const styles: StyleSheet = {
  container: {},
  day: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'gray',
  },
  friday: {
    marginTop: 10,
    marginBottom: -1,
  },
  event: {
    backgroundColor: 'gray',
    borderRadius: 5,
    padding: 5,
    marginBottom: 5,
  },
  emptyText: {
    color: 'gray',
  },
};
