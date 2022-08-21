import Post from "../model/post.js"

export const createPost = async(req, res)=>{
    try{
        const post = await new Post(req.body);
        post.save();

        return res.status(200).json({msg:"Post is saved"});
    }catch(error){
        return res.status(200).json({msg: error});
    }
}

export const getallpost = async(request,response)=>{
    let username = request.query.username;
    let category = request.query.category;
    let posts;
    try {
        if(username) 
            posts = await Post.find({ username: username });
        else if (category) 
            posts = await Post.find({ categories: category });
        else 
            posts = await Post.find({});
            
        response.status(200).json(posts);
    } catch (error) {
        response.status(500).json(error)
    }
}

export const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error);
    }
}

export const updatePost = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(404).json({ msg: 'Post not found' })
        }
        
        await Post.findByIdAndUpdate( req.params.id, { $set: req.body })

        res.status(200).json({msg : 'post updated successfully'});
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deletePost = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        await post.delete();
        res.status(200).json({msg : 'post deleted successfully'});
    } catch (error) {
        res.status(500).json(error);
    }
}