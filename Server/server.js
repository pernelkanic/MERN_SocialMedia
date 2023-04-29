import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import path from 'path';
import morgan from "morgan";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import  {register} from "./controller/auth.js"
import  {createPost} from "./controller/posts.js"
import userRoutes from "./routes/users.js";
import postRoutes from './routes/posts.js';
import { verifyToken } from "./middleware/auth.js";
import {users,posts} from'./data/index.js';
import User from "./models/User.js";
import Post from "./models/Post.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use(cors);
app.use("/assets" , express.static(path.join(__dirname, 'public/assets')));

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/assets");
    },
    filename: function(req,file,cb){
        cb(null, file.originalname);
    }

});
const upload = multer({storage});
app.post("/auth/regiser" , upload.single("picture"),register);
app.post("/posts" ,verifyToken, upload.single("picture") , createPost);

/*Mongoose setup*/

const PORT = process.env.port || 6001;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,

}).then(()=>{
    app.listen(PORT, ()=> console.log(`Server port : ${PORT}`));
    User.insertMany(users);
    Post.insertMany(posts);
}).catch((err)=>console.log(`${err} did not connect`));

/*authentication and authorisation*/
 app.use("/auth" , authRoutes);

 app.use("/users" , userRoutes);

 app.use('/posts',postRoutes);
