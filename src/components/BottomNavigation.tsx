import { useContext, useState } from 'react';
import { Col, Container, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser } from '@fortawesome/free-solid-svg-icons';
import NewWorkoutModal from './NewWorkoutModal';
import { PlusCircle } from '@geist-ui/icons';
import { AppContext } from '../state/AppContext';

const BottomNavigation = () => {
  const [newWorkoutModalOpen, setNewWorkoutModalOpen] = useState(false);
  const background = '#3580FF';

  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const onPlusClick = () => {
    if (user?.activeWorkout) {
      navigate(`/workout/${user.activeWorkout}`);
    } else {
      setNewWorkoutModalOpen(true);
    }
  };

  return (
    <Navbar fixed='bottom' className='pb-4' style={{ background: '#000' }}>
      <Container className='justify-content-between'>
        <Col className='d-flex justify-content-center' xs={3}>
          <Link to='/'>
            <FontAwesomeIcon size='lg' icon={faHouse} style={{ color: background }} />
          </Link>
        </Col>
        <Col className='d-flex justify-content-center' xs={3}>
          <button className='bg-transparent border-0' onClick={onPlusClick}>
            <PlusCircle size='50' color={background} />
          </button>
        </Col>
        <Col className='d-flex justify-content-center' xs={3}>
          <Link to='profile'>
            <FontAwesomeIcon size='lg' icon={faUser} style={{ color: background }} />
          </Link>
        </Col>
      </Container>
      <NewWorkoutModal
        newWorkoutModalOpen={newWorkoutModalOpen}
        setNewWorkoutModalOpen={setNewWorkoutModalOpen}
      ></NewWorkoutModal>
    </Navbar>
  );
};

export default BottomNavigation;
