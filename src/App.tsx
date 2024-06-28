import React, { lazy, Suspense, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import BottomNavigation from './components/BottomNavigation';
import TopNavigation from './components/TopNavigation';
import LoginPage from './containers/auth/Login';
import { AppContext } from './state/AppContext';
import { Spinner } from 'react-bootstrap';
const Home = lazy(() => import('./containers/home/Home'));
const WorkoutPage = lazy(() => import('./containers/workout/WorkoutPage'));

const App: React.FC = () => {
  const { user } = useContext(AppContext);

  if (user) {
    return (
      <Suspense fallback={<Spinner></Spinner>}>
        <TopNavigation />
        <Routes>
          <Route path='/workout/:workoutId' element={<WorkoutPage />}></Route>
          <Route path='/' element={<Home />}></Route>
        </Routes>
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
