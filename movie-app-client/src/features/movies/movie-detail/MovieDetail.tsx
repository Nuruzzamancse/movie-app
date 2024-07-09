import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, AppDispatch } from '../../../store';
import { addFavorite, removeFavorite, fetchComments, addComment, getMovie } from '../../../store/movieSlice';

import styles from './movieDetail.module.scss';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const movie = useSelector((state: RootState) => state.movie.movie);
  const favorite = useSelector((state: RootState) => state.movie.favorites.find(f => f.movie._id === id));
  const comments = useSelector((state: RootState) => state.movie.comments.filter(c => c.movie === id));
  const [newComment, setNewComment] = useState<string>('');

  useEffect(() => {
    if (id) {
      dispatch(fetchComments(id));
      dispatch(getMovie(id));
    }
  }, [dispatch, id]);

  if (!movie) return <div className={styles.notFound}>Movie not found</div>;

  const handleToggleFavorite = () => {
    if (favorite) {
      dispatch(removeFavorite(favorite._id));
    } else {
      dispatch(addFavorite(movie._id));
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      dispatch(addComment({ movieId: movie._id, text: newComment }));
      setNewComment('');
    }
  };

  return (
    <div className={styles.movieDetail}>
      <h2>{movie.name}</h2>
      <img src={movie.thumbnailUrl} alt={movie.name} />
      <p className={styles.description}>{movie.description}</p>
      <p className={styles.runningTime}>Running time: {movie.runningTime} minutes</p>
      <button
        onClick={handleToggleFavorite}
        className={favorite ? styles.favorite : styles.notFavorite}
      >
        {favorite ? 'Remove from favorites' : 'Add to favorites'}
      </button>
      <h3>Comments</h3>
      <div className={styles.comments}>
        {comments.map(comment => (
          <div key={comment._id} className={styles.comment}>
            <span>{comment?.user?.name}</span>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
      <textarea
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
      />
      <button
        onClick={handleAddComment}
        className={styles.addCommentButton}
      >
        Add Comment
      </button>
    </div>
  );
};

export default MovieDetail;
