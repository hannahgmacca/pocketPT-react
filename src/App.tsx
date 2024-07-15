import React, { lazy, Suspense, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import BottomNavigation from './components/BottomNavigation';
import TopNavigation from './components/TopNavigation';
import LoginPage from './containers/auth/Login';
import { AppContext } from './state/AppContext';
import { Spinner } from 'react-bootstrap';
import ProfilePage from './containers/profile/ProfilePage';
const Home = lazy(() => import('./containers/home/Home'));
const WorkoutPage = lazy(() => import('./containers/workout/WorkoutPage'));

const App: React.FC = () => {
  const { user } = useContext(AppContext);

  if (user) {
    return (
      <Suspense
        fallback={
          <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
            <Spinner animation='border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
          </div>
        }
      >
        <TopNavigation />
        <div style={{ marginBottom: '200px' }}>
          <Routes>
          <Route path='/profile' element={<ProfilePage />}></Route>
            <Route path='/workout/:workoutId' element={<WorkoutPage />}></Route>
            <Route path='/' element={<Home />}></Route>
          </Routes>
        </div>
        <BottomNavigation />
      </Suspense>
    );
  } else {
    return (
      <Routes>
        <Route path='/' element={<LoginPage />}></Route>
      </Routes>
    );
  }
};
export default App;
