import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState, AppDispatch } from '../store';
import { fetchMovies, fetchFavorites } from '../store/movieSlice';

const MovieList: React.FC<{ showFavorites?: boolean }> = ({ showFavorites = false }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, favorites, loading, error } = useSelector((state: RootState) => state.movie);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchMovies());
    if (isAuthenticated) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, isAuthenticated]);

  if (loading) return <div style={{ textAlign: 'center', fontSize: '1.5em', margin: '20px' }}>Loading...</div>;
  if (error) return <div style={{ textAlign: 'center', fontSize: '1.5em', margin: '20px', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', padding: '20px' }}>
      {showFavorites ? favorites.map(({ movie }) => (
        <Link key={movie._id} to={`/movie/${movie._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ border: '1px solid #ddd', borderRadius: '10px', overflow: 'hidden', width: '200px', height: '400px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <img src={movie.thumbnailUrl} alt={movie.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '10px', flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1.2em', margin: '10px 0' }}>{movie.name}</h3>
              <p style={{ fontSize: '0.9em', margin: '10px 0', color: '#555' }}>{movie.description.substring(0, 100)}...</p>
            </div>
          </div>
        </Link>
      )) : movies.map(movie => (
        <Link key={movie._id} to={`/movie/${movie._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ border: '1px solid #ddd', borderRadius: '10px', overflow: 'hidden', width: '200px', height: '400px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <img src={movie.thumbnailUrl} alt={movie.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '10px', flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1.2em', margin: '10px 0' }}>{movie.name}</h3>
              <p style={{ fontSize: '0.9em', margin: '10px 0', color: '#555' }}>{movie.description.substring(0, 100)}...</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
