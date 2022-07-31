import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import PageLogin from './pages/loginPage';
import PageHome from './pages/homePage';

import Pageregister from './components/Register/register';
import PageInsertData from './components/InsertData/insertData';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<PageLogin />} />
        <Route path="/register" element={<Pageregister />} />
        <Route path="/home" element={<PageHome />} />
        <Route path="/insertData" element={<PageInsertData />} />

        <Route exact path="*" element={<PageLogin />} />

      </Routes>
    </Router>
  );
}

export default App;
