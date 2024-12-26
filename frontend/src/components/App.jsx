import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import {Login} from './Login';
import Register from './Register';
import Home from './Home';
import Dashboard from './Dashboard';
import Pricing from './Pricing';
import {SimpleContent} from './SimpleContent';
import Payment from './Payment';
import { PlanProvider } from '../context/PlanContext';
import Summarizer from './Summarizer';
import Correct from './Correct';
import { AuthProvider } from '../authContext/authContext';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <PlanProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
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