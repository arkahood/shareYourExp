import express from "express";
import { uploadImage ,getImage} from "../controller/image-controller.js";
import { createPost, deletePost, getallpost,getPost, updatePost } from "../controller/post-controller.js";
//controllers
import { signupUser ,loginUser } from "../controller/user-controller.js";
import { authenticateToken } from "../middlewares/jwt.js";
import { newComment, getComments, deleteComment } from '../controller/comment-controller.js';

import upload from "../middlewares/upload.js";


const router = express.Router();

router.post("/signup", signupUser);
router.post("/login",loginUser);

router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

router.post('/create', authenticateToken,createPost);

router.get('/getallpost',authenticateToken, getallpost);
router.get('/getPostById/:id', authenticateToken, getPost);

router.put('/updatePost/:id',authenticateToken, updatePost);
router.delete('/deletePost/:id',authenticateToken, deletePost);

router.post('/comment/new', authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getComments);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);

export default router;