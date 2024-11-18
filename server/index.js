import express from 'express';          //It is the common used tool for making the servers
import bodyParser from 'body-parser';   //The bodyParser object exposes various factories to create middlewares
import mongoose from 'mongoose';        //It provides us to define the schemas of mongodb
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import postRoutes from './routes/post.js'; 
import uploadRoutes from './routes/upload.js';

const app = express();

// Serving static files
app.use(express.static('public'));               // Serves static files directly from the 'public' directory without any URL prefix.
app.use('/images', express.static('images'));    // Serves static files from the 'images' directory, but they must be accessed with the URL prefix /images.

// Middlewares
// bodyParser parse incoming request bodies in a middleware before handlers
app.use(bodyParser.json({limit: '30mb'}));          // Limit controls the maximum request body size. If this is a number, then the value specifies the number of bytes; if it is a string, the value is passed to the bytes library for parsing. Defaults to '100kb'
app.use(bodyParser.urlencoded({extended: true}));   // The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). 

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
//   });

// Allow CORS from localhost:5000
// Use the cors middleware
app.use(cors({
    origin: 'http://localhost:3000',                    // Specifies which origin is allowed to make requests to your server. This should match the URL of your client-side application.
    methods: ['GET', 'POST', 'PUT', 'DELETE'],          // Specifies the HTTP methods that are allowed when accessing the resources.
    allowedHeaders: ['Content-Type', 'Authorization'],  // Specifies which headers can be used in the request. This is useful for handling custom headers and authorization headers.
    credentials: true,                                  // Allows cookies and other credentials to be included in cross-origin requests. Make sure our client-side application is also configured to send credentials.
    optionsSuccessStatus: 200                           // Sets the status code sent for successful OPTIONS requests. This can help with compatibility issues, especially with legacy browsers.
  }));
  
// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/upload', uploadRoutes);

// Environment Variables
dotenv.config();    // process.env has the keys and values you defined in your .env file

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_DB)   //it returns a promise
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch(error => {
        console.log(error);
    });