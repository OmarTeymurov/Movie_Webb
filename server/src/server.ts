
import app from './app';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("FATAL ERROR: MONGO_URI təyin edilməyib.");
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB-yə uğurla qoşuldu.");
        app.listen(PORT, () => {
            console.log(`Server ${PORT} portunda işləyir...`);
        });
    })
    .catch((err) => {
        console.error("MongoDB qoşulma xətası:", err);
        process.exit(1);
    });