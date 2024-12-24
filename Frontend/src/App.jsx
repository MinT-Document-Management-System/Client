import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import About from './pages/About'
import FAQs from './pages/FAQs';
import Error from './pages/Error';
import Footer from './components/Footer';
import SharedPage from './pages/SharedPage';
import Notification from './pages/Notification';
import Approvals from './pages/Approvals';
import Upload from './pages/Upload';
import Register from "./pages/Register"
import RecordDashboard from './pages/RecordDashboard';
import AddNewDepartment from './pages/addNewDepartment';
import FrogotPassword from './pages/ForgotPassword';
import ForgotPasswordMessage from "./pages/ForgotPasswordMessage"
function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/ForgotPassword' element={<FrogotPassword/>}/>
    <Route path='/ForgotPasswordMessage' element={<ForgotPasswordMessage/>}/>

      <Route path='/' element={<SharedPage/>}>
        <Route index element={<Dashboard/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='Register' element={<Register/>}/>
        <Route path="AddNewDepartment" element={<AddNewDepartment/>}/>
        <Route path='FAQs' element={<FAQs/>}/>
        <Route path='RecordDashboard' element={<RecordDashboard/>}/>'
        <Route path='FAQs' element={<FAQs/>}/>
        <Route path='notification' element={<Notification/>}/>
        <Route path='approvals' element={<Approvals/>}/>
        <Route path='*' element={<Error/>}/> 
      </Route>
    </Routes>
    {/* <footer><Footer/></footer> */}
    </BrowserRouter>
  )
}

export default App