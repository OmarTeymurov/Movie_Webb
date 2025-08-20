// client/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { MovieList } from './components/MovieList';
import { MovieDetail } from './components/MovieDetail';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';

function index() {
    return (
        <Router>
            <div className="index">
                <nav>
                    <Link to="/">Ana Səhifə</Link> | 
                    <Link to="/login">Daxil Ol</Link> | 
                    <Link to="/register">Qeydiyyat</Link>
                </nav>
                <hr />
                <Routes>
                    <Route path="/" element={<MovieList />} />
                    <Route path="/movie/:id" element={<MovieDetail />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default index;