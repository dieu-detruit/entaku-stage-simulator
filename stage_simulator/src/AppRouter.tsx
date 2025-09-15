import { Route, Routes } from 'react-router-dom';
import App from './App';
import { FloorPlanApp } from './pages/FloorPlanApp';

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/floor_plan" element={<FloorPlanApp />} />
        </Routes>
    );
}

export default AppRouter;
