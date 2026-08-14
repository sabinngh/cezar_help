
import './App.css'
import { Routes, Route} from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MeetTheTeam from './pages/MeetTheTeam';
import Navbar from './components/Navbar';
import Problems from './pages/Problems';
import Learning from './pages/Learning';
import Profile from "./pages/Profile";

function App() {

  return (

    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/problems' element={<Problems />} />
        <Route path='/learning' element={<Learning />} />
        <Route path='/meet-the-team' element={<MeetTheTeam />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>

  );
}

export default App
