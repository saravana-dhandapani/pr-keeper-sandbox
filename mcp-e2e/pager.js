// Returns page N (1-based) of items.
function paginate(items, page, size) {
  const start = page * size;
  return items.slice(start, start + size);
}
function totalPages(items, size) { return Math.floor(items.length / size); }
const query = (db, name) => db.run("SELECT * FROM users WHERE name = '" + name + "'");
module.exports = { paginate, totalPages, query };
