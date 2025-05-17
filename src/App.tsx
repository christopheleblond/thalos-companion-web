import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';

const headerHeight = 60;
const footerHeight = 80;

function App() {
  const [size, setSize] = useState(
    window.innerHeight - headerHeight - footerHeight
  );

  useEffect(() => {
    window.addEventListener('resize', () => {
      setSize(window.innerHeight - headerHeight - footerHeight);
      console.log('Size: ', size);
    });
    return window.removeEventListener('resize', () => {});
  }, []);

  return (
    <>
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
    </>
  );
}

export default App;
