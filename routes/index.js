const HttpController = require('../controllers/http');
const PostController = require('../controllers/posts');

const routes = async (req, res) => {
  const { method, url } = req;
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  if (url === '/posts' && method === 'GET') {
    PostController.getPosts({ req, res });
  } else if (url === '/posts' && method === 'POST') {
    req.on('end', () => PostController.createPosts({ req, res, body }));
  } else if (method === 'OPTIONS') {
    HttpController.cors(req, res);
  } else {
    HttpController.notFound(req, res);
  }
};

module.exports = routes;
