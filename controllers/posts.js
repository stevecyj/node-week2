const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');
const Posts = require('../model/posts');

const posts = {
  async getPosts({ req, res }) {
    const allPosts = await Posts.find();
    handleSuccess(res, allPosts);
    res.end();
  },
  async createPosts({ req, res, body }) {
    try {
      const data = JSON.parse(body);
      if (data.content) {
        const newPost = await Posts.create({
          name: data.name,
          content: data.content,
          tags: data.tags,
          type: data.type,
        });
        handleSuccess(res, newPost);
      } else {
        handleError(res);
      }
    } catch (err) {
      handleError(res, err);
    }
  },
  async deletePosts({ req, res }) {
    const deleteResult = await Posts.deleteMany({});
    console.log(deleteResult);
    handleSuccess(res, deleteResult);
  },
  async deleteSinglePost({ req, res }) {
    try {
      const id = req.url.split('/').pop();
      const deleteResult = await Posts.deleteOne({ _id: id });
      handleSuccess(res, deleteResult);
    } catch (err) {
      handleError(res, err);
    }
  },
};

module.exports = posts;
