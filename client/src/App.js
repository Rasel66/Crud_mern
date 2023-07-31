import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import {Routes, Route} from 'react-router-dom';

import Navbaar from './components/Navbaar';
import Home from './components/Home';
import Register from './components/Register';
import Edit from './components/Edit';
import Details from './components/Details';

function App() {
  return (
    <div>
      <Navbaar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/edit/:id' element={<Edit/>} />
        <Route path='/details/:id' element={<Details/>} />
      </Routes>
    </div>
  );
}

export default App;
