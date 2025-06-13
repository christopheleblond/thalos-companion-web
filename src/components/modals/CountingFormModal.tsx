import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { ACTIVITIES } from '../../constants/Activities';
import { Colors } from '../../constants/Colors';
import type { DayCounts } from '../../model/Counting';
import { countingService } from '../../services/CountingService';
import ActivityIndicator from '../common/ActivityIndicator';
import Icon from '../common/Icon';
import type { ModalAction, ModalPageProps } from '../common/ModalPage';
import ModalPage from '../common/ModalPage';
import NumberInput from '../common/NumberInput';
import View from '../common/View';

type Props = ModalPageProps & {
  title?: string;
  dayId: string;
  onSuccess: () => void;
  onCancel: () => void;
  onChange?: (counts: DayCounts) => void;
};

export default function CountingFormModal(props: Props) {
  const [counts, setCounts] = useState<DayCounts>({
    dayId: props.dayId,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    countingService.getCounting(props.dayId).then((counts) => {
      if (counts !== null) {
        setCounts(counts);
      } else {
        setCounts({ dayId: props.dayId } as DayCounts);
      }
      setLoading(false);
    });
  }, [props.dayId]);

  const ACTIONS: ModalAction[] = [
    {
      name: 'cancel',
      label: 'Annuler',
      disabled: loading,
      color: 'gray',
      onClick: () => {
        if (props.onCancel) {
          props.onCancel();
        }
      },
    },
    {
      name: 'save',
      label: 'Enregistrer',
      disabled: loading,
      onClick: () => {
        console.log('Save counts', counts);
        setLoading(true);
        countingService
          .saveOrUpdateCounting(counts)
          .then(() => {
            setLoading(false);
            if (props.onSuccess) {
              props.onSuccess();
            }
          })
          .catch(() => setLoading(false));
      },
    },
  ];

  const setActivityCounts = (
    period: 'afternoon' | 'night',
    activityId: string,
    count: number
  ): void => {
    setCounts((prev) => {
      return {
        ...prev,
        [period]: { ...prev[period], [activityId]: count },
      };
    });
  };

  useEffect(() => {
    if (props.onChange) props.onChange(counts);
  }, [counts]);

  const activities = ACTIVITIES.filter((a) => a.countable);

  return (
    <ModalPage
      {...props}
      onHide={props.onCancel}
      options={{ title: props.title, actions: ACTIONS }}
    >
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator color={Colors.red} size={50} />
        </View>
      ) : null}
      {!loading ? (
        <div style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Icon icon="sunny" iconSize={30} />
            <span style={{ fontSize: 20 }}>Après-midi</span>
          </View>
          <View style={{ flex: 1 }}>
            {activities.map((act) => (
              <Card key={act.id} style={{ flex: 1 }}>
                <NumberInput
                  label={act.name}
                  value={
                    counts.afternoon && counts.afternoon[act.id] !== undefined
                      ? counts.afternoon[act.id]
                      : 0
                  }
                  onChange={(count) =>
                    setActivityCounts('afternoon', act.id, count)
                  }
                />
              </Card>
            ))}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Icon icon="nightlight" iconSize={30} />
            <span style={{ fontSize: 20 }}>Soirée</span>
          </View>
          {activities.map((act) => (
            <Card key={act.id} style={{ flex: 1 }}>
              <NumberInput
                label={act.name}
                value={
                  counts.night && counts.night[act.id] !== undefined
                    ? counts.night[act.id]
                    : 0
                }
                onChange={(count) => setActivityCounts('night', act.id, count)}
              />
            </Card>
          ))}
        </div>
      ) : null}
    </ModalPage>
  );
}
