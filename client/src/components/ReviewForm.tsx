// client/src/components/ReviewForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface ReviewFormProps {
    movieId: string;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ movieId }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // İstifadəçi məlumatlarını localStorage-dan götürün
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        if (!userInfo.token) {
            alert("Şərh yazmaq üçün daxil olmalısınız.");
            return;
        }

        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/movies/${movieId}/reviews`,
                { rating, comment, userId: userInfo._id }, // userId test üçün, realda token ilə backend-də tapılmalıdır
                { headers: { Authorization: `Bearer ${userInfo.token}` } }
            );
            alert("Şərhiniz uğurla əlavə edildi!");
            window.location.reload(); // Səhifəni yenilə
        } catch (error) {
            console.error('Şərh yazma xətası:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h4>Şərh Yaz</h4>
            <div>
                <label>Reytinq</label>
                <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                    <option value="0">Seçin...</option>
                    <option value="1">1 - Çox pis</option>
                    <option value="2">2 - Pis</option>
                    <option value="3">3 - Normal</option>
                    <option value="4">4 - Yaxşı</option>
                    <option value="5">5 - Əla</option>
                </select>
            </div>
            <div>
                <label>Şərhiniz</label>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
            </div>
            <button type="submit">Göndər</button>
        </form>
    );
};