import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing.tsx';
import SimulationPage from './pages/SimulationPage.tsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/app" element={<SimulationPage />} />
    </Routes>
  );
}
