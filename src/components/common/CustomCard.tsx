import { Card, type CardProps } from 'react-bootstrap';

type Props = CardProps & {};

export default function CustomCard({ children, ...props }: Props) {
  return (
    <Card
      {...props}
      style={{
        padding: 5,
        margin: 3,
        boxShadow: '2px 2px 2px 0px rgba(0,0,0,0.22)',
      }}
    >
      {children}
    </Card>
  );
}
