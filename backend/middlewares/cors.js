const allowedCors = [
  'https://mesto.kondratev.nomoredomains.monster',
  'http://mesto.kondratev.nomoredomains.monster',
  'https://mesto.student.nomoredomains.monster',
  'http://mesto.student.nomoredomains.monster',
  'http://localhost:3000',
  'localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const corsMiddleWare = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};

module.exports = {
  corsMiddleWare,
};
