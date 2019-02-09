const path = require('path');

const htmlRoutes = function (app) {
  // browser: localhost:3000/
  app.get('/', (req, res) => {
    // var myPath = path.join(__dirname, "../public/home.html");
    // console.log("Path = "+myPath);
    res.sendFile(path.join(__dirname, '../public/home.html'));
  });

  // browser: localhost:3000/form
  app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/survey.html'));
  });
};

module.exports = htmlRoutes;
