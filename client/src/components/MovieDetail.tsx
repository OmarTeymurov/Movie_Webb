// client/src/components/MovieDetail.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ReviewForm } from './ReviewForm';

interface IReview {
    user: { name: string };
    comment: string;
    rating: number;
    createdAt: string;
}

interface IMovieDetail {
    _id: string;
    title: string;
    description: string;
    releaseDate: string;
    rating: number;
    reviews: IReview[];
}

export const MovieDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<IMovieDetail | null>(null);

    useEffect(() => {
        const fetchMovie = async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/movies/${id}`);
            setMovie(data);
        };
        fetchMovie();
    }, [id]);
    
    const handleDelete = async () => {
        if(window.confirm("Bu filmi silməyə əminsiniz?")) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/movies/${id}`);
                // Ana səhifəyə yönləndir
                window.location.href = '/';
            } catch (error) {
                console.error("Filmi silərkən xəta baş verdi", error);
            }
        }
    };

    if (!movie) return <div>Yüklənir...</div>;

    return (
        <div>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <p>Çıxış tarixi: {new Date(movie.releaseDate).toLocaleDateString()}</p>
            <p>Reytinq: {movie.rating.toFixed(1)}</p>
            <button onClick={handleDelete} style={{backgroundColor: 'red', color: 'white'}}>Filmi Sil</button>

            <hr />
            <h3>Şərhlər</h3>
            {movie.reviews.length > 0 ? (
                movie.reviews.map((review, index) => (
                    <div key={index}>
                        <strong>{review.user.name}</strong> - Reytinq: {review.rating}
                        <p>{review.comment}</p>
                    </div>
                ))
            ) : <p>Hələ şərh yazılmayıb.</p>}
            
            <hr />
            <ReviewForm movieId={id!} />
        </div>
    );
};