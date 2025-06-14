import ActivityIndicator from './ActivityIndicator';

export default function Backdrop() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 1,
        left: 1,
        minHeight: '100%',
        width: '100%',
        backgroundSize: 'cover',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        <ActivityIndicator size={150} />
        <img
          alt="Logo"
          src={'/thalos-companion-web/icon100.png'}
          width="100"
          height="100"
          className="d-inline-block align-top"
          style={{ marginTop: '-120px' }}
        />
      </div>
    </div>
  );
}
