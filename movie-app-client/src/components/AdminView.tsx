import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchMovies } from '../store/movieSlice';
import api from '../api/axiosConfig';

const AdminView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector((state: RootState) => state.movie.movies);
  const [newMovie, setNewMovie] = useState({ name: '', description: '', runningTime: 0, thumbnailUrl: '' });

  const handleAddMovie = async () => {
    try {
      await api.post('/movies', newMovie);
      dispatch(fetchMovies());
      setNewMovie({ name: '', description: '', runningTime: 0, thumbnailUrl: '' });
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  const handleRemoveMovie = async (id: string) => {
    try {
      await api.delete(`/movies/${id}`);
      dispatch(fetchMovies());
    } catch (error) {
      console.error('Error removing movie:', error);
    }
  };

  return (
    <div style={{
      backgroundColor: '#f0f2f5',
      minHeight: '100vh',
      padding: '40px 20px',
      width: 'calc(100vw - 57px)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#333',
          padding: '20px',
          backgroundColor: '#4a90e2',
          margin: 0
        }}>Admin View</h2>
        <div style={{
          padding: '30px',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <h3 style={{ color: '#555', marginTop: 0 }}>Add Movie</h3>
          <input
            type="text"
            placeholder="Name"
            value={newMovie.name}
            onChange={e => setNewMovie({ ...newMovie, name: e.target.value })}
            style={{
              display: 'block',
              width: '100%',
              padding: '12px',
              marginBottom: '15px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '16px'
            }}
          />
          <input
            type="text"
            placeholder="Description"
            value={newMovie.description}
            onChange={e => setNewMovie({ ...newMovie, description: e.target.value })}
            style={{
              display: 'block',
              width: '100%',
              padding: '12px',
              marginBottom: '15px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '16px'
            }}
          />
          <input
            type="number"
            placeholder="Running Time"
            value={newMovie.runningTime}
            onChange={e => setNewMovie({ ...newMovie, runningTime: parseInt(e.target.value) })}
            style={{
              display: 'block',
              width: '100%',
              padding: '12px',
              marginBottom: '15px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '16px'
            }}
          />
          <input
            type="text"
            placeholder="Thumbnail URL"
            value={newMovie.thumbnailUrl}
            onChange={e => setNewMovie({ ...newMovie, thumbnailUrl: e.target.value })}
            style={{
              display: 'block',
              width: '100%',
              padding: '12px',
              marginBottom: '15px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '16px'
            }}
          />
          <button
            onClick={handleAddMovie}
            style={{
              display: 'block',
              width: '100%',
              padding: '12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#28a745',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s'
            }}
          >
            Add Movie
          </button>
        </div>
        <div style={{ padding: '30px' }}>
          <h3 style={{ color: '#555', marginTop: 0 }}>Movies</h3>
          {movies.map(movie => (
            <div key={movie._id} style={{
              marginBottom: '15px',
              padding: '15px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              backgroundColor: '#fff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'box-shadow 0.3s'
            }}>
              <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{movie.name}</span>
              <button
                onClick={() => handleRemoveMovie(movie._id)}
                style={{
                  padding: '8px 15px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background-color 0.3s'
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminView;