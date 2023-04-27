const allowedCors = [
  'https://mesto.kondratev.nomoredomains.monster',
  'http://mesto.kondratev.nomoredomains.monster',
  'https://mesto.student.nomoredomains.monster',
  'http://mesto.student.nomoredomains.monster',
  'http://localhost:3000',
  'localhost:3000',
];

const corsMiddleWare = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  return next();
};

module.exports = {
  corsMiddleWare,
};
