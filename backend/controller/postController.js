const Post = require('../model/post')

const createPost = async (req, res, next) => {
    req.body.user = req.user.id
    const newPost = new Post(req.body);

    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      next(err);
    }
  };

const updatePost = async (req, res, next) => {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } catch (err) {
      next(err);
    }
  };
const deletePost = async (req, res, next) => {
    try {
      await Post.findByIdAndDelete(req.params._id);
      res.status(200).json("Post has been deleted.");
    } catch (err) {
      next(err);
    }
  };
const getPost = async (req, res, next) => {
  const {user} = req.params.id
    try {
      const post = await Post.find({user});
      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  };

const getPosts = async (req, res, next) => {
    // const { min, max, ...others } = req.query;
    try {
    //   const hotels = await Hotel.find({
    //     ...others,
    //     cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    //   }).limit(req.query.limit);
    const posts = await Post.find()
      res.status(200).json(posts);
    } catch (err) {
      next(err);
    }
  };

module.exports =  {
    createPost,
    updatePost,
    deletePost,
    getPost,
    getPosts
}  