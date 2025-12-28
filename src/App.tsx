import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import CampaignsPage from "./pages/Campaigns";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="campaigns" element={<CampaignsPage />} />
          <Route path="reports" element={<div>Reports</div>} />
          <Route path="settings" element={<div>Settings</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
