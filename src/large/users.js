'use strict';
// users service: in-memory store with simple CRUD helpers.
const store = new Map();
let nextId = 1;

function createUsers(input) {
  if (!input || typeof input !== 'object') throw new TypeError('users: input must be an object');
  const id = nextId++;
  const record = { id, ...input, createdAt: Date.now() };
  store.set(id, record);
  return record;
}

function getUsers(id) {
  const r = store.get(id);
  if (!r) throw new Error('users: not found: ' + id);
  return r;
}

function updateUsers(id, patch) {
  const r = getUsers(id);
  const next = { ...r, ...patch, id: r.id };
  store.set(id, next);
  return next;
}

function removeUsers(id) {
  return store.delete(id);
}

function listUsers({ page = 1, pageSize = 20 } = {}) {
  const all = [...store.values()].sort((a, b) => a.id - b.id);
  const start = (page - 1) * pageSize;
  return { items: all.slice(start, start + pageSize), total: all.length };
}

function countUsers() { return store.size; }

module.exports = { createUsers, getUsers, updateUsers, removeUsers, listUsers, countUsers };
