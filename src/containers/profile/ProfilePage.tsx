import { Col, Container, Row } from 'react-bootstrap';
import Card from '../../components/Card/Card';

const ProfilePage = () => {
  return (
      <Container>
          <Card variant='outlined' className='m-3'>
              <Container className='p-1'>
                <Col><p>Update Exercises</p></Col>
              </Container>
          </Card>
      </Container>
  );
};

export default ProfilePage;
