import { Card, type CardProps } from 'react-bootstrap';
import { concatStyles, type Styles } from './Types';

type Props = Omit<CardProps, 'style'> & {
  style?: Styles;
};

export default function CustomCard({ children, style, ...props }: Props) {
  return (
    <Card
      {...props}
      style={{
        padding: 5,
        margin: 3,
        boxShadow: '2px 2px 2px 0px rgba(0,0,0,0.22)',
        ...concatStyles(style),
      }}
    >
      {children}
    </Card>
  );
}
