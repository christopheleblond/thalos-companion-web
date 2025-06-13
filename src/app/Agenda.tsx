import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Icon from '../components/common/Icon';
import SectionList from '../components/common/SectionList';
import type { StyleSheet } from '../components/common/Types';
import View from '../components/common/View';
import GameDayCard from '../components/GameDayCard';
import { Colors } from '../constants/Colors';
import { Months } from '../constants/Months';
import type { GameDay } from '../model/GameDay';
import { calendarService } from '../services/CalendarService';

export default function AgendaPage() {
  const navigate = useNavigate();

  const [days, setDays] = useState<GameDay[]>(
    calendarService.buildDaysFromDate(new Date(), 30)
  );

  const daysBefore = () => {
    const add1Day = new Date(days[0].date);
    add1Day.setDate(add1Day.getDate() - 30);
    setDays([...calendarService.buildDaysFromDate(add1Day, 30), ...days]);
  };

  const moreDays = () => {
    const add1Day = new Date(days[days.length - 1].date);
    add1Day.setDate(add1Day.getDate() + 1);

    setDays([...days, ...calendarService.buildDaysFromDate(add1Day, 30)]);
  };

  const sections = days
    .map((d) => ({ title: Months[d.date.getMonth()].toUpperCase(), data: [d] }))
    .reduce((acc: { title: string; data: GameDay[] }[], cur) => {
      const foundIndex = acc.findIndex((i) => i.title === cur.title);
      if (foundIndex >= 0) {
        acc[foundIndex] = {
          ...acc[foundIndex],
          data: [...acc[foundIndex].data, cur.data[0]],
        };
        return acc;
      } else {
        return [...acc, { ...cur }];
      }
    }, []);

  return (
    <View style={{ flex: 1 }}>
      <SectionList
        sections={sections}
        keyExtractor={({ id }) => id}
        renderSectionHeader={(item) => (
          <span style={styles.month}>{item.title}</span>
        )}
        ListHeaderComponent={
          <View>
            <Button variant="secondary" onClick={() => daysBefore()}>
              <Icon icon="arrow_upward" />
            </Button>
          </View>
        }
        ListFooterComponent={
          <View>
            <Button variant="secondary" onClick={() => moreDays()}>
              <Icon icon="arrow_downward" />
            </Button>
          </View>
        }
        renderItem={(gameDay) => (
          <div onClick={() => navigate(`/agenda/${gameDay.id}`)}>
            <GameDayCard day={gameDay} />
          </div>
        )}
      ></SectionList>
      <span id="list_bottom"></span>
    </View>
  );
}

const styles: StyleSheet = {
  month: {
    fontSize: 24,
    color: Colors.gray,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
};
