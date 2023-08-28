import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import BottomNavigation from "./components/BottomNavigation";
import TopNavigation from "./components/TopNavigation";
const Home = lazy(() => import("./containers/home/Home"));
const WorkoutPage = lazy(() => import("./containers/workout/WorkoutPage"));

const App: React.FC = () => (
  <Suspense fallback={<div>...Loading</div>}>
    <TopNavigation />
    <Routes>
      <Route path="/workout" element={<WorkoutPage />}></Route>
      <Route path="/" element={<Home />}></Route>
    </Routes>
    <BottomNavigation />
  </Suspense>
);
export default App;
