import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import movieRoutes from './routes/movieRoutes';


const app = express();

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('API is running...');
});


app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);

export default app;