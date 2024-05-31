import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import PrivateRoute from './components/PrivateRoute';
import ContentAdmin from './components/Content';
import CustomSnackbar from './components/CustomSnackBar';

const AdminDashboard = lazy(() => import('./components/Admin'));
const UserDashboard = lazy(() => import('./components/Users'));
const ThemeAdmin = lazy(() => import('./components/Theme'));
const CategoryAdmin = lazy(() => import('./components/Category'));
const Login = lazy(() => import('./components/Login'));

function App() {
  return (
    <Router>
      <Suspense fallback={<CircularProgress />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>}>
            <Route path="users" element={<UserDashboard />} /> 
            <Route path="themes" element={<ThemeAdmin />} />  
            <Route path="content" element={<ContentAdmin />} />  
            <Route path="categories" element={<CategoryAdmin />} />
          </Route>
          <Route path="/" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        </Routes>
        <CustomSnackbar />
      </Suspense>
    </Router>
  );
}

export default App;
