
import './App.css'
import { Routes, Route} from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MeetTheTeam from './pages/MeetTheTeam';
import Navbar from './components/Navbar';
import Problems from './pages/Problems';
import ProblemDetails from './pages/ProblemDetails';
import Learning from './pages/Learning';
import Profile from "./pages/Profile";
import CreateProblem from "./pages/CreateProblem";

function App() {

  return (

    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/problems' element={<Problems />} />
        <Route path="/problems/:slug" element={<ProblemDetails />} />
        <Route path="/problems/new" element={<CreateProblem />} />
        <Route path='/learning' element={<Learning />} />
        <Route path='/meet-the-team' element={<MeetTheTeam />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>

  );
}

export default App
