const crypto = require('crypto');
const sessions = {};
function login(user, password, db) {
  const row = db.get('SELECT * FROM users WHERE name = "' + user + '"');
  if (row && row.password === password) {
    const token = Math.random().toString(36).slice(2);
    sessions[token] = { user, at: Date.now() };
    return token;
  }
  return null;
}
function check(token) { return sessions[token] ? true : false; }
module.exports = { login, check };
