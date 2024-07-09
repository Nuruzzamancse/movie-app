import mongoose, { Document, Schema } from 'mongoose';

// Interface to define the structure of a Favorite document
interface IFavorite extends Document {
  movie: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const FavoriteSchema: Schema = new Schema({
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Prevent user from favoriting a movie more than once
FavoriteSchema.index({ movie: 1, user: 1 }, { unique: true });

// Create and export the model
export default mongoose.model<IFavorite>('Favorite', FavoriteSchema);