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

let getScriptRoute = function(req, res) {
  var nodeModule = req.params.nodeModule;
  var moduleDir = req.params.moduleDir || '';
  var moduleScript = req.params.moduleScript;
  if (moduleDir !== '') {
    res.sendFile(path.join(__dirname, `../../node_modules/${nodeModule}/${moduleDir}/${moduleScript}`));
  } else {
    res.sendFile(path.join(__dirname, `../../node_modules/${nodeModule}/${moduleScript}`));
  }
  res.flush();
};

/* defining all Index routes here allows for a scalable
   and modular pattern configuration */
router.route('/')
  .get(getIndexRoute);
router.route('/:component.component.html')
  .get(getComponentRoute);
router.route('/images/:image')
  .get(getImageRoute);
router.route('/scripts/:nodeModule/:moduleDir/:moduleScript')
  .get(getScriptRoute);
router.route('/scripts/:nodeModule/:moduleScript')
  .get(getScriptRoute);

module.exports = router;
