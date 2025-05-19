import { Colors } from '../constants/Colors';
import { durationToString } from '../constants/Durations';
import { TOUTE_LA_SALLE } from '../constants/Rooms';
import type { AgendaEvent } from '../model/AgendaEvent';
import { printGameDay } from '../utils/Utils';
import CustomCard from './common/CustomCard';
import Icon from './common/Icon';
import IconButton from './common/IconButton/IconButton';
import View from './common/View';

type Props = {
  event: Partial<AgendaEvent>;
  complete?: boolean;
  showButtons?: boolean;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function AgendaEventCard({
  event,
  complete,
  showButtons,
  onEdit,
}: Props) {
  const duration = event.durationInMinutes
    ? durationToString(event.durationInMinutes)
    : null;

  const confirmDeleteEvent = () => {
    /*Alert.alert(`Supprimer l'évènement ${event.title} ?`, '', [
      {
        text: 'Annuler',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Supprimer',
        onPress: () => {
          setLoading(true);
          agendaService.deleteEvent(event.id!).then(() => {
            if (rest.onDelete) {
              rest.onDelete();
            }
            setLoading(false);
          });
        },
      },
    ]);*/
  };

  return (
    <CustomCard>
      {event.activity ? (
        <View style={{}}>
          <span style={styles.activityName}>{event.activity.name}</span>
        </View>
      ) : null}

      {/* Date  */}
      {event.day ? (
        <View style={styles.cardItem}>
          <span style={styles.eventDateText}>{printGameDay(event.day)}</span>
        </View>
      ) : (
        <span>?</span>
      )}
      {/* Heure de début-fin */}
      {event.start ? (
        <View style={styles.hours}>
          <Icon icon={'schedule'} color={'gray'} iconSize={20} />
          <span style={styles.eventHoursText}>{event.start}</span>
          {duration ? (
            <span style={styles.eventHoursText}> ({`${duration.label}`})</span>
          ) : null}
        </View>
      ) : (
        <span>?</span>
      )}

      {/* Nom */}
      <View style={styles.title}>
        <span>
          {event.title}
        </span>
      </View>

      {/* Creator */}
      {complete ? (
        <View style={styles.creator}>
          {event.creator ? (
            <View style={{ flexDirection: 'row', gap: 3 }}>
              <span>Crée par</span>
              <span style={{ fontStyle: 'italic' }}>{event.creator.name}</span>
            </View>
          ) : null}
        </View>
      ) : null}

      {/* Description */}
      {complete ? (
        <View style={styles.description}>
          {event.description ? (
            <span>{event.description}</span>
          ) : (
            <span>Pas de description</span>
          )}
        </View>
      ) : null}

      {/* Salle */}
      {event.room ? (
        <View style={styles.location}>
          <View
            style={{ flexDirection: 'row', paddingLeft: 10, paddingRight: 10 }}
          >
            <Icon icon={'location_on'} color={'gray'} iconSize={20} />
            <span>{event.room.name}</span>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Icon icon={'table_restaurant'} color={'gray'} iconSize={20} />
            <span>
              :{' '}
              {event.tables !== TOUTE_LA_SALLE
                ? `${event.tables}`
                : 'Toute la salle'}
            </span>
          </View>
        </View>
      ) : null}

      {showButtons ? (
        <View style={styles.buttons}>
          <IconButton
            icon="edit-note"
            color="gray"
            iconSize={32}
            onClick={() => (onEdit ? onEdit() : null)}
          />
          <IconButton
            icon="delete"
            color={Colors.red}
            iconSize={32}
            onClick={() => confirmDeleteEvent()}
          />
        </View>
      ) : null}
    </CustomCard>
  );
}

const styles = {
  activity: {},
  activityName: {},
  cardItem: {},
  eventDateText: {},
  hours: {},
  eventHoursText: {},
  title: {},
  creator: {},
  description: {},
  location: {},
  buttons: {},
};
