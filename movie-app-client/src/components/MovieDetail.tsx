import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, AppDispatch } from '../store';
import { addFavorite, removeFavorite, fetchComments, addComment, getMovie } from '../store/movieSlice';

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

  if (!movie) return <div style={{ textAlign: 'center', fontSize: '1.5em', margin: '20px' }}>Movie not found</div>;

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
    <div style={{ padding: '20px', maxWidth: '800px', marginBottom: 60, fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ fontSize: '2em', marginBottom: '10px' }}>{movie.name}</h2>
      <img src={movie.thumbnailUrl} alt={movie.name} style={{ width: '100%', height: 'auto', borderRadius: '10px', marginBottom: '20px' }} />
      <p style={{ fontSize: '1.2em', lineHeight: '1.5', marginBottom: '20px' }}>{movie.description}</p>
      <p style={{ fontSize: '1em', marginBottom: '20px', color: '#555' }}>Running time: {movie.runningTime} minutes</p>
      <button
        onClick={handleToggleFavorite}
        style={{
          padding: '10px 20px',
          fontSize: '1em',
          color: '#fff',
          backgroundColor: favorite ? '#f44336' : '#4caf50',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        {favorite ? 'Remove from favorites' : 'Add to favorites'}
      </button>
      <h3 style={{ fontSize: '1.5em', marginBottom: '10px' }}>Comments</h3>
      <div style={{ marginBottom: '20px' }}>
        {comments.map(comment => (
          <div key={comment._id} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
            <span>{comment?.user?.name}</span>
            <p style={{ margin: '0', fontSize: '1em' }}>{comment.text}</p>
          </div>
        ))}
      </div>
      <textarea
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '1em',
          borderRadius: '5px',
          border: '1px solid #ccc',
          marginBottom: '10px',
          resize: 'vertical'
        }}
      />
      <button
        onClick={handleAddComment}
        style={{
          padding: '10px 20px',
          fontSize: '1em',
          color: '#fff',
          backgroundColor: '#2196f3',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Add Comment
      </button>
    </div>
  );
};

export default MovieDetail;
