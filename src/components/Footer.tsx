import { Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Icon from './common/Icon';

export default function Footer() {
  const navigate = useNavigate();
  return (
    <div style={styles}>
      <ButtonGroup style={buttonsStyle} aria-label="Basic example">
        <Button
          variant="secondary"
          style={{ display: 'flex', flexDirection: 'column' }}
          onClick={() => navigate('/')}
        >
          <Icon icon="home" iconSize={30} />
          Accueil
        </Button>
        <Button
          variant="secondary"
          style={{ display: 'flex', flexDirection: 'column' }}
          onClick={() => navigate('/agenda')}
        >
          <Icon icon="calendar_month" iconSize={30} />
          Agenda
        </Button>
        <Button
          variant="secondary"
          style={{ display: 'flex', flexDirection: 'column' }}
          onClick={() => navigate('/keys')}
        >
          <Icon icon="key" iconSize={30} />
          Badges
        </Button>
      </ButtonGroup>
    </div>
  );
}

const styles: React.CSSProperties = {
  display: 'flex',
  padding: 3,
  minHeight: 60,
  width: '100%',
};

const buttonsStyle: React.CSSProperties = {
  width: '100%',
};
