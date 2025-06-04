import { useState } from 'react';
import { Card } from 'react-bootstrap';
import { Colors } from '../constants/Colors';
import type { RoomKey } from '../model/RoomKey';
import type { User } from '../model/User';
import Icon from './common/Icon';
import View from './common/View';
import UserSelectModal from './modals/UserSelectModal';

type Props = {
  roomKey: RoomKey;
  onChangeOwner: (user: User) => void;
};

export default function RoomKeyCard({ roomKey, onChangeOwner }: Props) {
  const [userSelectModalVisible, setUserSelectModalVisible] = useState(false);

  const onSelectUser = (user: User) => {
    onChangeOwner(user);
    setUserSelectModalVisible(false);
  };

  return (
    <Card>
      {
        <UserSelectModal
          title="Qui ?"
          show={userSelectModalVisible}
          onCancel={() => setUserSelectModalVisible(false)}
          onSuccess={onSelectUser}
        />
      }
      <button onClick={() => setUserSelectModalVisible(true)}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: Colors.gray,
              borderRadius: 10,
              padding: 3,
            }}
          >
            <Icon icon="key" color={Colors.white} iconSize={50} />
          </View>
          <View
            style={{
              flex: 1,
              paddingLeft: 10,
              paddingRight: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <span>{roomKey.name}</span>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 5,
                  borderRadius: 20,
                }}
              >
                <Icon icon="person" iconSize={30} />
                {roomKey.owner ? (
                  <span style={{ fontWeight: 'bold' }}>
                    {roomKey.owner.name}
                  </span>
                ) : (
                  <span>?</span>
                )}
              </View>
            </View>
          </View>
        </View>
      </button>
    </Card>
  );
}
