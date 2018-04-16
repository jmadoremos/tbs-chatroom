import express from 'express';
import path from 'path';

/* we need to start a routing instance */
let router = express.Router();

/* we define the route for GET requests */
let getIndexRoute = function(req, res) {
  res.sendFile(path.join(__dirname, './index/index.view.html'));
  res.flush();
};

let getComponentRoute = function(req, res) {
  var component = req.params.component;
  res.sendFile(path.join(__dirname, `./${component}/${component}.component.html`));
  res.flush();
};

let getImageRoute = function(req, res) {
  var image = req.params.image;
  res.sendFile(path.join(__dirname, `./_images/${image}`));
  res.flush();
};

/* defining all Index routes here allows for a scalable
   and modular pattern configuration */
router.route('/')
  .get(getIndexRoute);
router.route('/:component.component.html')
  .get(getComponentRoute);
router.route('/image/:image')
  .get(getImageRoute);

module.exports = router;
