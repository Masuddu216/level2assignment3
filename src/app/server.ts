import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';

let server: Server;

const PORT = 5000;


async function main() {
    try {
        await mongoose.connect('mongodb+srv://Remotejob2025:XC0qaii7J0WSBpLu@cluster0.cazjwbp.mongodb.net/Library-Management?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Connected to MongoDB Using Mongoose!!!")
        server = app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        })
    } catch(error) {
        console.log(error)
    }
    
}
main()
