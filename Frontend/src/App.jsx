import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import About from './pages/About';
import FAQs from './pages/FAQs';
import Error from './pages/Error';
import SharedPage from './pages/SharedPage';
import Notification from './pages/Notification';
import Approvals from './pages/Approvals';
import Register from "./pages/Register";
import RecordDashboard from './pages/RecordDashboard';
import AddNewDepartment from './pages/AddNewDepartment';
import ForgotPassword from './pages/ForgotPassword';
import ForgotPasswordMessage from "./pages/ForgotPasswordMessage";
import ResetPassword from "./pages/ResetPassword";
import AddNewRole from './pages/AddNewRole';
import DepartmentList from './pages/DepartmentList';
import RoleList from './pages/RoleList';
import { ToastContainer } from 'react-toastify';
import ItDashboard from './pages/ItDashboard';
import Profile from './pages/Profile';
import Letter from './pages/Letter';
import SystemConfiguration from './pages/SystemConfiguration';
import UserActivityLogs from './pages/UserActivityLogs';
import Cookies from 'js-cookie';

function App() {
  // Function to check if user is authenticated
  const isAuthenticated = () => {
    const token = Cookies.get('jwt_token');
    return !!token; // Returns true if token exists
  };

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/ForgotPassword' element={<ForgotPassword />} />
        <Route path='/ForgotPasswordMessage' element={<ForgotPasswordMessage />} />
        <Route path='/reset_password' element={<ResetPassword />} />
        <Route path='*' element={<Error />} />

        {/* Protected Routes */}
        <Route path='/' element={isAuthenticated() ? <SharedPage /> : <Navigate to='/login' />}>
          <Route index element={<Dashboard />} />
          <Route path='about' element={<About />} />
          <Route path='register' element={<Register />} />
          <Route path='addNewDepartment' element={<AddNewDepartment />} />
          <Route path='systemConfiguration' element={<SystemConfiguration />} />
          <Route path='userActivityLogs' element={<UserActivityLogs />} />
          <Route path='departmentList' element={<DepartmentList />} />
          <Route path='addNewRole' element={<AddNewRole />} />
          <Route path='roleList' element={<RoleList />} />
          <Route path='letter' element={<Letter />} />
          <Route path='faqs' element={<FAQs />} />
          <Route path='recordDashboard' element={<RecordDashboard />} />
          <Route path='itDashboard' element={<ItDashboard />} />
          <Route path='approvals' element={<Approvals />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
      {/* Uncomment footer if needed */}
      {/* <footer><Footer/></footer> */}
    </BrowserRouter>
  );
}

export default App;