import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { fetchMovies } from "../../store/movieSlice";
import api from "../../api/axiosConfig";

import styles from "./adminView.module.scss";

const AdminView: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector((state: RootState) => state.movie.movies);
  const [newMovie, setNewMovie] = useState({
    name: "",
    description: "",
    runningTime: 0,
    thumbnailUrl: "",
  });

  const handleAddMovie = async () => {
    try {
      await api.post("/movies", newMovie);
      dispatch(fetchMovies());
      setNewMovie({
        name: "",
        description: "",
        runningTime: 0,
        thumbnailUrl: "",
      });
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  const handleRemoveMovie = async (id: string) => {
    try {
      await api.delete(`/movies/${id}`);
      dispatch(fetchMovies());
    } catch (error) {
      console.error("Error removing movie:", error);
    }
  };

  return (
    <div className={styles.adminViewContainer}>
      <div className={styles.adminViewWrapper}>
        <h2>Admin View</h2>
        <div className={styles.adminSection}>
          <h3>Add Movie</h3>
          <input
            type="text"
            placeholder="Name"
            value={newMovie.name}
            onChange={(e) => setNewMovie({ ...newMovie, name: e.target.value })}
            className={styles.inputField}
          />
          <input
            type="text"
            placeholder="Description"
            value={newMovie.description}
            onChange={(e) =>
              setNewMovie({ ...newMovie, description: e.target.value })
            }
            className={styles.inputField}
          />
          <input
            type="number"
            placeholder="Running Time"
            value={newMovie.runningTime}
            onChange={(e) =>
              setNewMovie({
                ...newMovie,
                runningTime: parseInt(e.target.value),
              })
            }
            className={styles.inputField}
          />
          <input
            type="text"
            placeholder="Thumbnail URL"
            value={newMovie.thumbnailUrl}
            onChange={(e) =>
              setNewMovie({ ...newMovie, thumbnailUrl: e.target.value })
            }
            className={styles.inputField}
          />
          <button onClick={handleAddMovie} className={styles.addMovieButton}>
            Add Movie
          </button>
        </div>
        <div className={styles.movieList}>
          <h3>Movies</h3>
          {movies.map((movie) => (
            <div key={movie._id} className={styles.movieItem}>
              <span className={styles.movieName}>{movie.name}</span>
              <button
                onClick={() => handleRemoveMovie(movie._id)}
                className={styles.removeMovieButton}
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
