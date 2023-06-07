import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import BottomNavigation from "./components/BottomNavigation";
const Home = lazy(() => import("./containers/home/Home"));
const Workout = lazy(() => import("./containers/workout/Workout"));

const App: React.FC = () => (
  <Suspense fallback={<div>...Loading</div>}>
    <Routes>
      <Route path="/workout" element={<Workout />}></Route>
      <Route path="/" element={<Home />}></Route>
    </Routes>
    <BottomNavigation />
  </Suspense>
);
export default App;
