import { BrowserRouter,Routes,Route } from "react-router-dom";

import Landing from "./pages/Landing";
import AdminLogin from "./pages/AdminLogin";
import ManagerLogin from "./pages/ManagerLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import PatientMonitor from "./pages/PatientMonitor"
import AIInsights from "./pages/AIInsights"

function App(){

  return(

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Landing/>} />

        <Route path="/admin-login" element={<AdminLogin/>} />

        <Route path="/manager-login" element={<ManagerLogin/>} />

        <Route path="/admin-dashboard" element={<AdminDashboard/>} />

        <Route path="/manager-dashboard" element={<ManagerDashboard/>} />

        <Route path="/patients" element={<PatientMonitor/>}/>

        <Route path="/ai-insights" element={<AIInsights/>} />

      </Routes>

    </BrowserRouter>

  )
}

export default App;