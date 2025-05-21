import { Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { Colors } from '../constants/Colors';
import IconButton from './common/IconButton/IconButton';

export default function Header() {
  const navigate = useNavigate();

  return (
    <Navbar style={styles.navbar} className="justify-content-between">
      <Navbar.Brand href="/" style={styles.brand}>
        <img
          alt="Logo"
          src={'/thalos-companion-web/icon100.png'}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        La Voie du Thalos
      </Navbar.Brand>

      <IconButton
        icon="settings"
        color={Colors.white}
        iconSize={40}
        onClick={() => navigate('/settings')}
      />
    </Navbar>
  );
}

const styles = {
  navbar: {
    backgroundColor: Colors.red,
    paddingLeft: '10px',
    paddingRight: '10px',
    height: 60,
  },
  brand: {
    color: 'white',
  },
};
