
import { Schema, model, Document, Types } from 'mongoose';


interface IReview extends Document {
    user: Types.ObjectId;
    comment: string;
    rating: number;
}

const reviewSchema = new Schema<IReview>({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
}, { timestamps: true });


interface IMovie extends Document {
  title: string;
  description: string;
  releaseDate: Date;
  rating: number; 
  reviews: IReview[];
}

const movieSchema = new Schema<IMovie>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  rating: { type: Number, required: true, default: 0 },
  reviews: [reviewSchema], 
}, { timestamps: true });

export const Movie = model<IMovie>('Movie', movieSchema);