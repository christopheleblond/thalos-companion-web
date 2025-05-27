import { createContext } from 'react';

export type AlertDialogAction = {
  label: string;
  primary?: boolean;
  onClick: (closeFunction: () => void) => void;
};

export type AlertContextProps = {
  currentAlert?: Alert;
  alert: (a: Alert) => void;
  info?: (message: string) => void;
  warning?: (message: string) => void;
  error?: (message: string) => void;
  dialog: (
    title: string,
    message: string,
    actions: AlertDialogAction[]
  ) => void;
};

export type Alert = {
  level?: 'info' | 'warn' | 'error';
  title?: string;
  message: string;
  modal?: boolean;
  actions?: AlertDialogAction[];
};

export const AlertContext = createContext<AlertContextProps>({
  alert: () => {},
  dialog: () => {},
});

export const AlertActions = {
  CANCEL: (label = 'Annuler') =>
    ({
      label,
      onClick: (closeFunction: () => void) => closeFunction(),
    }) satisfies AlertDialogAction,
  OK: (onClickFunction: () => Promise<void>, label = 'OK') => ({
    label,
    primary: true,
    onClick: (closeFunction: () => void) => {
      onClickFunction().then(() => closeFunction());
    },
  }),
};
