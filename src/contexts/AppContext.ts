import { createContext } from 'react';
import type { User } from '../model/User';

export type ActionPayload = unknown;

export type AppState = { [key: string]: unknown };

export type AppContextProps = {
  user?: User;
  refreshs: { [key: string]: string };
  loading?: boolean;
  setLoading: (loading: boolean) => void;
  refresh: (key: string) => void;
  setUser: (user: User) => void;
  dispatch: (action: string, payload?: ActionPayload) => void;
  state: AppState;
};
export const AppContext = createContext<AppContextProps>({
  loading: false,
  setLoading: () => {},
  refreshs: {},
  refresh: () => {},
  setUser: () => {},
  dispatch: () => {},
  state: {},
});
