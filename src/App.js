import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SCliente from './components/SCliente.js';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SCliente></SCliente>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;