import express  from "express";
import {getFeedPosts,getUserPosts,likepost} from '../controller/posts.js';
import {verifyToken} from '../middleware/auth.js';

const router = express.Router();
router.get('/',verifyToken,getFeedPosts);
router.get('/:userId/posts' , verifyToken,getUserPosts);
router.patch('/:id/like' , verifyToken,likepost);
export default router;
