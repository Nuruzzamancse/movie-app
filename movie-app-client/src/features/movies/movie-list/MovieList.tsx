import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState, AppDispatch } from '../../../store';
import { fetchMovies, fetchFavorites } from '../../../store/movieSlice';

import styles from './movieList.module.scss';

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

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      {showFavorites ? favorites.map(({ movie }) => (
        <Link key={movie._id} to={`/movie/${movie._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className={styles.movieCard}>
            <img src={movie.thumbnailUrl} alt={movie.name} />
            <div className={styles.content}>
              <h3>{movie.name}</h3>
              <p>{movie.description.substring(0, 100)}...</p>
            </div>
          </div>
        </Link>
      )) : movies.map(movie => (
        <Link key={movie._id} to={`/movie/${movie._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className={styles.movieCard}>
            <img src={movie.thumbnailUrl} alt={movie.name} />
            <div className={styles.content}>
              <h3>{movie.name}</h3>
              <p>{movie.description.substring(0, 100)}...</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
