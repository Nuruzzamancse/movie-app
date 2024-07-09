import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { loadUser, logout } from './store/authSlice';
import MovieList from './features/movies/movie-list/MovieList';
import MovieDetail from './features/movies/movie-detail/MovieDetail';
import Login from './features/users/login/Login';
import Register from './features/users/register/Register';
import AdminView from './features/admin/AdminView';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ flex: '1' }}>
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/favorites" element={<MovieList showFavorites />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {user?.role === 'admin' && <Route path="/admin" element={<AdminView />} />}
          </Routes>
        </div>
        <nav style={{ backgroundColor: '#333', padding: '10px 0', position: 'fixed', bottom: '0', width: '100%' }}>
          <ul style={{ display: 'flex', justifyContent: 'center', listStyle: 'none', margin: '0', padding: '0' }}>
            <li style={{ margin: '0 10px' }}>
              <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
            </li>
            <li style={{ margin: '0 10px' }}>
              <Link to="/favorites" style={{ color: '#fff', textDecoration: 'none' }}>Favorites</Link>
            </li>
            {isAuthenticated ? (
              <>
                <li style={{ margin: '0 10px', color: '#fff' }}>Welcome, {user?.name}</li>
                <li style={{ margin: '0 10px' }}>
                  <button onClick={handleLogout} style={{ color: '#fff', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>Logout</button>
                </li>
                {user?.role === 'admin' && (
                  <li style={{ margin: '0 10px' }}>
                    <Link to="/admin" style={{ color: '#fff', textDecoration: 'none' }}>Admin</Link>
                  </li>
                )}
              </>
            ) : (
              <>
                <li style={{ margin: '0 10px' }}>
                  <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
                </li>
                <li style={{ margin: '0 10px' }}>
                  <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </Router>
  );
};

export default App;
