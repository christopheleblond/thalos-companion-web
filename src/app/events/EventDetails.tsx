import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import AgendaEventCard from '../../components/AgendaEventCard';
import type { AgendaEvent } from '../../model/AgendaEvent';
import { agendaService } from '../../services/AgendaService';

export default function EventDetailsPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState<AgendaEvent | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (eventId === undefined) {
      return;
    }
    setLoading(true);
    agendaService
      .findEventById(eventId)
      .then((e) => {
        if (e === null) {
          console.error('No event found with id ', eventId);
        } else {
          setEvent(e);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [eventId]);

  return (
    <>
      {event && !loading ? (
        <AgendaEventCard event={event} complete={true} showButtons={true} />
      ) : null}
    </>
  );
}
