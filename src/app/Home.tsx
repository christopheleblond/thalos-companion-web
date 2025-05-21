import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import AgendaEventCard from '../components/AgendaEventCard';
import ActivityIndicator from '../components/common/ActivityIndicator';
import ModalPage, { type ModalAction } from '../components/common/ModalPage';
import type { SectionListItem } from '../components/common/SectionList';
import SectionList from '../components/common/SectionList';
import type { StyleSheet } from '../components/common/Types';
import View from '../components/common/View';
import EventForm from '../components/forms/EventForm';
import { Colors } from '../constants/Colors';
import { Months } from '../constants/Months';
import { AppContext } from '../contexts/AppContext';
import type { AgendaEvent } from '../model/AgendaEvent';
import { agendaService } from '../services/AgendaService';
import { settingsService } from '../services/SettingsService';

export default function HomePage() {
  const appContext = useContext(AppContext);

  const [sections, setSections] = useState<SectionListItem<AgendaEvent>[]>([]);
  const [loading, setLoading] = useState(false);
  const needARefresh = appContext.refreshs['home.events'];
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    setLoading(true);
    settingsService
      .get()
      .then((prefs) =>
        agendaService.findAllEvents().then((events) => ({ events, prefs }))
      )
      .then(({ events, prefs }) => {
        const eventsByMonth = events
          .filter((e) =>
            settingsService.activityVisible(
              prefs,
              e.activityId ?? e.activity?.id ?? ''
            )
          )
          .map((e) => ({
            title: Months[e.day.date.getMonth()].toUpperCase(),
            data: [e],
          }))
          .reduce(
            (
              acc: SectionListItem<AgendaEvent>[],
              cur: SectionListItem<AgendaEvent>
            ) => {
              const foundIndex = acc.findIndex((i) => i.title === cur.title);
              if (foundIndex >= 0) {
                acc[foundIndex].data.push(cur.data[0]);
              } else {
                acc.push(cur);
              }
              return acc;
            },
            []
          );
        setSections(eventsByMonth);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Fail on findAllEvents', error);
        setLoading(false);
      });
  }, [needARefresh]);

  const ACTIONS: ModalAction[] = [
    {
      name: 'cancel',
      label: 'Annuler',
      disabled: loading,
      color: 'gray',
      onClick: () => {
        setModalShow(false);
      },
    },
    {
      name: 'save',
      label: 'Enregistrer',
      disabled: loading,
      onClick: () => {
        console.log('Save');
      },
    },
  ];

  return (
    <View>
      <ModalPage
        show={modalShow}
        onHide={() => setModalShow(false)}
        options={{
          title: 'Créer un évènement',
          actions: ACTIONS,
        }}
      >
        <EventForm />
      </ModalPage>
      {loading ? <ActivityIndicator /> : null}
      {!loading ? (
        <>
          <Button onClick={() => setModalShow(true)}>+</Button>
          <SectionList
            sections={sections}
            keyExtractor={(it) => it.id}
            renderSectionHeader={(it) => (
              <span style={styles.month}>{it.title}</span>
            )}
            renderItem={(it) => <AgendaEventCard event={it} />}
          ></SectionList>
        </>
      ) : null}
    </View>
  );
}

const styles: StyleSheet = {
  month: {
    fontSize: 24,
    color: Colors.gray,
    fontWeight: 'bold',
  },
};
