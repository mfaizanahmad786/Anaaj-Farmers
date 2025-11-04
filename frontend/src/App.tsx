import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Crops from './pages/Crops';
import CropTrend from './pages/CropTrend';
import Weather from './pages/Weather';
import Advice from './pages/Advice';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="crops" element={<Crops />} />
          <Route path="crops/:cropId/trend" element={<CropTrend />} />
          <Route path="weather" element={<Weather />} />
          <Route path="advice" element={<Advice />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
