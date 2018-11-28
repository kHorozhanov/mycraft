const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const ngUniversal = require('@nguniversal/express-engine');
const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP,
} = require('./dist/server/main');
const {
  provideModuleMap,
} = require('@nguniversal/module-map-ngfactory-loader');
const { enableProdMode } = require('@angular/core');
const INDEX = path.join(__dirname, './dist/browser/index.html');
require('zone.js/dist/zone-node');

enableProdMode();

const app = express();
// view engine setup
app.engine(
  'html',
  ngUniversal.ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
      provideModuleMap(LAZY_MODULE_MAP),
    ],
  }),
);

app.disable('x-powered-by');

app.enable('trust proxy');

app.use(helmet.hsts({
  maxAge: 31536000,
  includeSubDomains: true,
  preload: true,
  setIf: function(req, res) {
    return req.secure;
  },
}));

app.use((req, res, next) => {
  if (!req.secure && process.env.NODE_ENV === 'production') {
    return res.redirect('https://' + req.headers.host + req.url, 301);
  }
  next();
});
app.use(compression());
app.use((req, res, next) => req.url === '/index.html' ? res.redirect('/', 301) : next());
app.get('*.*', express.static('./dist/browser'));

app.get('*', (req, res) => {
  res.render(INDEX, { req, res }, (error, result) => {
    if (error) {
      throw new Error(error);
    }
    if (!res.headersSent) {
      res.send(result);
    }
  });
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err.message || err);
  res.status(err.status || 500);
  res.render(INDEX, { req, res });
});

app.listen(process.env.PORT || 4000);
