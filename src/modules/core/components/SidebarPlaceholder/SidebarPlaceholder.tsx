import { Card, Placeholder } from 'react-bootstrap';

const SidebarPlaceholder = () => {
  return (
    <Card style={{ width: '100%' }} className='border-0 shadow-sm'>
      <Card.Body>
        <Placeholder as={Card.Title} animation='glow'>
          <Placeholder xs={12} />
        </Placeholder>
        <Placeholder as={Card.Text} animation='glow'>
          <Placeholder xs={9} />
          <Placeholder xs={9} />
          <Placeholder xs={9} />
          <Placeholder xs={9} />
          <Placeholder xs={9} />
          <Placeholder xs={9} />
          <Placeholder xs={9} />
          <Placeholder xs={9} />
          <Placeholder xs={9} />
          <Placeholder xs={9} />
          <Placeholder xs={9} />
          <Placeholder xs={9} />
          <Placeholder xs={9} />
          <Placeholder xs={9} />
          <Placeholder xs={9} />
          <Placeholder xs={9} />
          <Placeholder xs={9} />
          <Placeholder xs={9} />
        </Placeholder>
      </Card.Body>
    </Card>
  );
};
export default SidebarPlaceholder;
