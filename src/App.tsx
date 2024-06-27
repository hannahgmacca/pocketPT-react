import React, { lazy, Suspense, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import BottomNavigation from './components/BottomNavigation';
import TopNavigation from './components/TopNavigation';
import LoginPage from './containers/auth/Login';
import { AppContext } from './state/AppContext';
const Home = lazy(() => import('./containers/home/Home'));
const WorkoutPage = lazy(() => import('./containers/workout/WorkoutPage'));

const App: React.FC = () => {
  const { user, token } = useContext(AppContext);

  if (user) {
    return (
      <Suspense fallback={<div>...Loading</div>}>
        <TopNavigation />
        <Routes>
          <Route path='/workout' element={<WorkoutPage />}></Route>
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
