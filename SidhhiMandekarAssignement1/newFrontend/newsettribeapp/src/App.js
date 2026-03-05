import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterFunCom from './Components/RegisterFunComp';
import LoginComponent from './Components/LoginFunCom';
import TenderForm from './Components/TenderForm';
import Report from './Components/Report';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
       <Routes>
        <Route path="/" element={<RegisterFunCom/>}/>
         <Route path="/login" element={<LoginComponent/>}/>
         <Route path="/tender" element={<TenderForm />} />
          <Route path="/report" element={<Report />} />
       </Routes>

       </BrowserRouter>
    </div>
  );
}

export default App;
