import { ACTIVITIES } from '../constants/Activities';
import { DaysOfWeek, Months } from '../constants/Months';
import { ROOMS } from '../constants/Rooms';
import type { Activity } from '../model/Activity';
import type { AgendaEvent } from '../model/AgendaEvent';
import type { GameDay } from '../model/GameDay';
import type { Room } from '../model/Room';

export function isEmpty(value: string | null, emptyValues = ['']): boolean {
  return !value || emptyValues.filter((v) => value.trim() === v).length > 0;
}

export function isNotEmpty(value: string | null): boolean {
  return !isEmpty(value);
}

export function isZero(value: number | undefined | null): boolean {
  return !value || value === null || isNaN(value) || value === 0;
}

export function fromActivityId(
  id: string | undefined,
  activities = ACTIVITIES
): Activity | null {
  if (id === undefined) {
    return null;
  }
  return activities.find((a) => a.id === id) ?? null;
}

export function fromGameDayId(id: string | undefined): GameDay | null {
  if (!id) {
    return null;
  }
  const date = new Date(id);
  return {
    id,
    date,
  } as GameDay;
}

export function printGameDay(gameDay: GameDay): string {
  const day = DaysOfWeek[gameDay.date.getDay()];
  const dom = gameDay.date.getDate();
  const month = Months[gameDay.date.getMonth()];
  const yyyy = gameDay.date.getFullYear();
  return `${day} ${dom} ${month} ${yyyy}`;
}

export function parseHour(hour: string): string {
  const hh = hour.toUpperCase().split('H');
  return `${hh[0].padStart(2, '0')}:${hh.length > 1 ? hh[1].padStart(2, '0') : '00'}:00`;
}

export function hourToNumber(hour: string): number {
  const hh = hour.toUpperCase().split('H');
  return (
    60 * parseInt(hh[0]) + (hh.length > 1 && hh[1] !== '' ? parseInt(hh[1]) : 0)
  );
}

export function numberToHour(minutes: number): string {
  const hh = minutes / 60;
  let min = 0;
  if (minutes % 60 !== 0) {
    min = 30;
  }
  return `${hh}h${min}`;
}

export function getStartTime(day: GameDay, start: string): number {
  return day.date.getTime() + hourToNumber(start) * 60 * 1000;
}

export function getEndTime(
  day: GameDay,
  start: string,
  durationInMinutes: number
): number {
  return getStartTime(day, start) + durationInMinutes * 60 * 1000;
}

export function eventIsInTimeSlot(
  event: AgendaEvent,
  start: number,
  end: number
): boolean {
  const eventStartTime = event.startTime || 0;
  const eventEndTime = event.endTime || 0;
  return (
    (eventStartTime >= start && eventStartTime <= end) ||
    (eventEndTime > start && eventEndTime < end)
  );
}

export function fromRoomId(
  roomId: string | undefined,
  rooms = ROOMS
): Room | null {
  if (roomId === undefined) {
    return null;
  }
  return rooms.find((r) => r.id === roomId) ?? null;
}

export function removeAll(arr: string[], value: string): string[] {
  let i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
}

export function eventIsActiveAt(event: AgendaEvent, hour: string): boolean {
  const hh = parseHour(hour);
  const startEvent = parseHour(event.start);
  const hhMinutes = hourToNumber(event.start);
  const endEventInMinutes = hhMinutes + event.durationInMinutes;
  const endEvent = numberToHour(endEventInMinutes);

  return startEvent.localeCompare(hh) <= 0 && endEvent.localeCompare(hh) > 0;
}

export function clamp(value: number, min = 0, max = 100): number {
  return value < min ? min : value > max ? max : value;
}

export function uuid() {
  return [8, 5, 5, 5, 12]
    .map((n) => {
      let res = '';
      for (let i = 0; i < n; i++)
        res += Math.floor(Math.random() * 16).toString(16);
      return res;
    })
    .join('-');
}

export function getWeekNumber(day: Date): number {
  let date = new Date(day);
  if (!(date instanceof Date)) date = new Date();

  // ISO week date weeks start on Monday, so correct the day number
  const nDay = (date.getDay() + 6) % 7;

  // ISO 8601 states that week 1 is the week with the first Thursday of that year
  // Set the target date to the Thursday in the target week
  date.setDate(date.getDate() - nDay + 3);

  // Store the millisecond value of the target date
  const n1stThursday = date.valueOf();

  // Set the target to the first Thursday of the year
  // First, set the target to January 1st
  date.setMonth(0, 1);

  // Not a Thursday? Correct the date to the next Thursday
  if (date.getDay() !== 4) {
    date.setMonth(0, 1 + ((4 - date.getDay() + 7) % 7));
  }

  // The week number is the number of weeks between the first Thursday of the year
  // and the Thursday in the target week (604800000 = 7 * 24 * 3600 * 1000)
  return 1 + Math.ceil((n1stThursday - date.getTime()) / 604800000);
}

export function nowMinusDays(days: number): Date {
  const now = new Date();
  now.setDate(now.getDate() - days);
  return now;
}
