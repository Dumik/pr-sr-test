import { Card, Placeholder } from 'react-bootstrap';

const CardPlaceholder = () => {
  return (
    <Card style={{ width: '100%' }} className='border-0 shadow-sm'>
      <Placeholder as={Card.Title} animation='glow'>
        <Placeholder
          xs={12}
          size='lg'
          className='rounded-1'
          style={{ width: '100%', height: 200 }}
        />
      </Placeholder>
      <Card.Body>
        <Placeholder as={Card.Title} animation='glow'>
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation='glow'>
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
          <Placeholder xs={6} /> <Placeholder xs={8} />
        </Placeholder>
        <Placeholder xs={6} />
      </Card.Body>
    </Card>
  );
};
export default CardPlaceholder;
