const jwt = require('jsonwebtoken');

const SECRET = 'supersecret';
const USER = { username: 'admin', password: 'admin' };

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }
  return res.status(401).json({ error: 'Usuário ou senha inválidos' });
};
