import { Form } from 'react-bootstrap';
import { ACTIVITIES } from '../../constants/Activities';
import { Durations } from '../../constants/Durations';
import { ROOMS, TABLES, TOUTE_LA_SALLE } from '../../constants/Rooms';
import { calendarService } from '../../services/CalendarService';
import { printGameDay } from '../../utils/Utils';

export default function EventForm() {
  const days = calendarService.buildDaysFromDate(new Date(), 60);
  const hours = calendarService.hours();
  const durations = Durations;

  return (
    <Form>
      <Form.Group className="mb-3" controlId="eventForm.NameInput">
        <Form.Label>Nom</Form.Label>
        <Form.Control type="title" placeholder="" autoFocus />
      </Form.Group>

      <Form.Group className="mb-3" controlId="eventForm.DateInput">
        <Form.Label>Date</Form.Label>
        <Form.Select size="lg">
          <option>-</option>
          {days.map((day) => (
            <option key={day.id}>{printGameDay(day)}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="eventForm.HourInput">
        <Form.Label>Début à</Form.Label>
        <Form.Select size="lg">
          <option>-</option>
          {hours.map((hh) => (
            <option key={hh}>{hh}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="eventForm.DurationInput">
        <Form.Label>Durée</Form.Label>
        <Form.Select size="lg">
          <option>-</option>
          {durations.map((d) => (
            <option key={d.valueInMinutes}>{d.label}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="eventForm.ActivityInput">
        <Form.Label>Activité principale</Form.Label>
        <Form.Select size="lg">
          <option>-</option>
          {ACTIVITIES.map((act) => (
            <option key={act.id}>{act.name}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="eventForm.RoomInput">
        <Form.Label>Salle</Form.Label>
        <Form.Select size="lg">
          <option>-</option>
          {ROOMS.map((r) => (
            <option key={r.id}>{r.name}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="eventForm.TableNumberInput">
        <Form.Label>Salle</Form.Label>
        <Form.Select size="lg">
          <option>-</option>
          {TABLES.map((t) => (
            <option key={t}>
              {t === TOUTE_LA_SALLE ? 'Toute la salle' : t + ' tables'}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="eventForm.DescriptionInput">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={8} />
      </Form.Group>
    </Form>
  );
}
