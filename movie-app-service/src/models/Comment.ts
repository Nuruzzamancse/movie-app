// models/Comment.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IComment extends Document {
  text: string;
  movie: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
}

const CommentSchema: Schema = new Schema({
  text: { type: String, required: true },
  movie: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model<IComment>('Comment', CommentSchema);