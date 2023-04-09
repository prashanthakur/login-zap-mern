import './App.css';
import Home from './components/Home';
import Login from './components/Login'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Protected from './components/Protected';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route path='/home' element={<Protected Component= {Home}/>}/>
      </Routes>
      </BrowserRouter>
      {/* <Login/> */}
    </div>
  );
}

export default App;
