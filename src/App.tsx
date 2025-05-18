import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import { AppContext, type AppContextProps } from './contexts/AppContext';
import type { User } from './model/User';

const headerHeight = 60;
const footerHeight = 80;

function App() {
  const [size, setSize] = useState(
    window.innerHeight - headerHeight - footerHeight
  );

  const [appContext, setAppContext] = useState<AppContextProps>({
    refreshs: {},
    refresh: (key: string) => {
      setAppContext((prev) => {
        return {
          ...prev,
          refreshs: { ...prev.refreshs, [key]: new Date().toISOString() },
        };
      });
    },
    setUser: (user: User) => {
      setAppContext((prev) => ({
        ...prev,
        user,
      }));
    },
  });

  useEffect(() => {
    window.addEventListener('resize', () => {
      setSize(window.innerHeight - headerHeight - footerHeight);
      console.log('Size: ', size);
    });
    return window.removeEventListener('resize', () => {});
  }, []);

  return (
    <>
      <AppContext.Provider value={appContext}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '1280px',
          }}
        >
          <Header />
          <div style={{ height: size, overflowY: 'scroll' }}>
            <Outlet />
          </div>
          <Footer />
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
