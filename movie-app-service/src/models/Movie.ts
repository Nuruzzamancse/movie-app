import mongoose, { Document, Schema } from 'mongoose';

// Interface to define the structure of a Movie document
interface IMovie extends Document {
  name: string;
  description: string;
  runningTime: number;
  thumbnailUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const MovieSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a movie name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  runningTime: {
    type: Number,
    required: [true, 'Please add a running time']
  },
  thumbnailUrl: {
    type: String,
    required: [true, 'Please add a thumbnail URL']
  }
}, {
  timestamps: true
});

// Create and export the model
export default mongoose.model<IMovie>('Movie', MovieSchema);