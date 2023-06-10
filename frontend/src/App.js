import './App.css';
import UserSignup from './components/UserSignup';
import UserLogin from './components/UserLogin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Detection from './components/Detection';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/detection" element={<Detection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;