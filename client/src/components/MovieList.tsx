// client/src/components/MovieList.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface IMovie {
    _id: string;
    title: string;
    description: string;
    rating: number;
}

export const MovieList: React.FC = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/movies`);
            setMovies(data);
        };
        fetchMovies();
    }, []);

    return (
        <div>
            <h2>Filmlər</h2>
            {movies.map((movie) => (
                <div key={movie._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                    <h3>
                        <Link to={`/movie/${movie._id}`}>{movie.title}</Link>
                    </h3>
                    <p>Reytinq: {movie.rating.toFixed(1)}</p>
                </div>
            ))}
        </div>
    );
};