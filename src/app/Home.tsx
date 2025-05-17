import { useEffect, useState } from 'react';
import type { User } from '../model/User';
import { userService } from '../services/UserService';

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    userService.findAllUsers().then((users) => setUsers(users));
  }, []);

  return (
    <div>
      <h1>USERS</h1>
      {users.map((u) => (
        <div key={u.id}>
          {u.id} {u.firstName} - {u.name}
        </div>
      ))}
    </div>
  );
}
