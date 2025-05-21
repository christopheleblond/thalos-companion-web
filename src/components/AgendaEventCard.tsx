import { useNavigate } from 'react-router';
import { Colors } from '../constants/Colors';
import { durationToString } from '../constants/Durations';
import { TOUTE_LA_SALLE } from '../constants/Rooms';
import type { AgendaEvent } from '../model/AgendaEvent';
import { printGameDay } from '../utils/Utils';
import './AgendaEventCard.css';
import CustomCard from './common/CustomCard';
import IconButton from './common/IconButton/IconButton';
import Label from './common/Label';
import Row from './common/Row';
import Tag from './common/Tag';
import type { StyleSheet } from './common/Types';
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
  const navigate = useNavigate();

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
    <CustomCard
      className="AgendaEventCard"
      onClick={() => navigate(`/events/${event.id}`)}
      style={[
        styles.container,
        { borderLeftColor: event.activity?.style.backgroundColor },
      ]}
    >
      {event.activity ? (
        <Row>
          <Tag
            color={event.activity.style.backgroundColor}
            textColor={event.activity.style.color}
          >
            <span style={styles.activityName}>{event.activity.name}</span>
          </Tag>
        </Row>
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
        <Row style={{ justifyContent: 'center' }}>
          <Label icon="schedule" color="gray" size={20}>
            <span style={styles.eventHoursText}>{event.start}</span>
            {duration ? (
              <span style={styles.eventHoursText}>
                {' '}
                ({`${duration.label}`})
              </span>
            ) : null}
          </Label>
        </Row>
      ) : (
        <span>?</span>
      )}

      {/* Nom */}
      <View style={styles.title}>
        <span>{event.title}</span>
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
        <Row style={styles.location}>
          <Label icon="location_on" color="gray" size={20}>
            <span>{event.room.name}</span>
          </Label>
          <Label icon="table_restaurant" color="gray" size={20}>
            <span>
              :{' '}
              {event.tables !== TOUTE_LA_SALLE
                ? `${event.tables}`
                : 'Toute la salle'}
            </span>
          </Label>
        </Row>
      ) : null}

      {showButtons ? (
        <View style={styles.buttons}>
          <IconButton
            icon="edit"
            color={Colors.white}
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

const styles: StyleSheet = {
  container: {
    borderLeftWidth: '10px',
  },
  activity: {},
  activityName: {},
  cardItem: {
    paddingTop: '5px',
    fontSize: '18px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  eventDateText: {},
  hours: {},
  eventHoursText: {},
  title: {
    fontSize: '24px',
  },
  creator: {},
  description: {},
  location: {
    justifyContent: 'flex-end',
    gap: 20,
  },
  buttons: {
    display: 'flex',
    gap: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
};
