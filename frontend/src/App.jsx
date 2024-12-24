import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './components/register';
import Login from './components/login';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Pricing from './components/pricing';
import SimpleContent from './components/simplecontent';
import Payment from './components/payment';
import { PlanProvider } from './context/PlanContext';
import Summarizer from './components/Summarizer';
import Correct from './components/Correct';
import { AuthProvider } from './authContext/authContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <PlanProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/navbar' element={<Navbar />} />
            <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path='/pricing' element={<PrivateRoute><Pricing /></PrivateRoute>} />
            <Route path='/cont1' element={<PrivateRoute><SimpleContent /></PrivateRoute>} />
            <Route path='/payment' element={<PrivateRoute><Payment /></PrivateRoute>} />
            <Route path='/summarizer' element={<PrivateRoute><Summarizer /></PrivateRoute>} />
            <Route path='/correct' element={<PrivateRoute><Correct /></PrivateRoute>} />
          </Routes>
        </BrowserRouter>
      </PlanProvider>
    </AuthProvider>
  );
}

export default App;