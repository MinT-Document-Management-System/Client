import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState } from 'react';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import About from './pages/About'
import FAQs from './pages/FAQs';
import Error from './pages/Error';
import Footer from './components/Footer';
import SharedPage from './pages/SharedPage';
import Notification from './pages/Notification';
import Approvals from './pages/Approvals';

function App() {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<SharedPage/>}>
        <Route index element={<Dashboard user={user}/>}/>
        <Route path='about' element={<About/>}/>
<<<<<<< HEAD
        <Route path='login' element={<Login setUser={setUser}/>}/>
=======
        
>>>>>>> 62134c23d11922e4ad9444f9a6679acc7a56f05a
        <Route path='FAQs' element={<FAQs/>}/>
        <Route path='notification' element={<Notification/>}/>
        <Route path='approvals' element={<Approvals/>}/>
        <Route path='*' element={<Error/>}/> 
      </Route>
    </Routes>
    <footer><Footer/></footer>
    </BrowserRouter>
  )
}

export default App
