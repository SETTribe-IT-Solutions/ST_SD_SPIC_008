
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Components/Register';
import Login from './Components/Login';
import TenderForm from './Components/TenderForm';
import Report from './Components/Report';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register></Register>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/tender" element={<TenderForm></TenderForm>} />
        <Route path="/report" element={<Report></Report>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
