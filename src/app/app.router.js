import express from 'express';
import path from 'path';

// we need to start a routing instance
let router = express.Router();

// we define the route for GET requests
let getRoute = function(req, res) {
  res.sendFile(path.join(__dirname, './index/index.view.html'));
  res.flush();
};

/* route: / */
router.route('/')
  .get(getRoute);

module.exports = router;
