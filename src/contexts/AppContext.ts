import { createContext } from 'react';
import type { User } from '../model/User';

export type AppContextProps = {
  user?: User;
  refreshs: { [key: string]: string };
  refresh: (key: string) => void;
  setUser: (user: User) => void;
};
export const AppContext = createContext<AppContextProps>({
  refreshs: {},
  refresh: () => {},
  setUser: () => {},
});
