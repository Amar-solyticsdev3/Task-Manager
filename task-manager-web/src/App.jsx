import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import PrivateRoute from './routes/PrivateRoute';
import Dashboards from './pages/Admin/Dashboards';
import ManagerTask from './pages/Admin/ManagerTask';
import CreateTasks from './pages/Admin/CreateTasks';
import ManagerUsers from './pages/Admin/ManagerUsers';
import UserDashboards from './pages/User/UserDashboards';
import MyTasks from './pages/User/MyTasks';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Admin Routes */}

          <Route element={<PrivateRoute allowedRoles={['admin']} />}>
            <Route path="/admin/dashboard" element={<Dashboards />} />
            <Route path="/admin/tasks" element={<ManagerTask />} />
            <Route path="/admin/create-task" element={<CreateTasks />} />
            <Route path="/admin/users" element={<ManagerUsers />} />
          </Route>

          {/* User Routes */}

          <Route element={<PrivateRoute allowedRoles={['user', 'member']} />}>
            <Route path="/user/dashboard" element={<UserDashboards />} />
            <Route path="/user/my-task" element={<MyTasks />} />
            
          </Route>
        </Routes>
        <Toaster
          toastOptions={{
            className: '',
            style: {
              fontSize: '13px',
            },
          }}
        />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
