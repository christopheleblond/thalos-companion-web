import { useEffect, useState } from 'react';
import type { User } from '../model/User';

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {}, []);

  return (
    <div>
      <h1>USERS</h1>
      {users.map((u) => (
        <div>
          {u.id} {u.firstName} - {u.name}
        </div>
      ))}
    </div>
  );
}
