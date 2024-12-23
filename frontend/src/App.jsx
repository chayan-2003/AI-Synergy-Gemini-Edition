import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './components/register';
import Login from './components/login';
import Navbar from './components/navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Pricing from './components/pricing';
import SimpleContent from './components/simplecontent';
import Payment from './components/payment';
import { PlanProvider } from './context/PlanContext';
import Summarizer from './components/summarizer';
import Correct from './components/Correct';


function App() {
  return (
    <PlanProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/navbar' element={<Navbar />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/cont1' element={<SimpleContent />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/summarizer' element={<Summarizer />} />
          <Route path='/correct' element={<Correct />} />
        </Routes>
      </BrowserRouter>
    </PlanProvider>
  );
}

export default App;