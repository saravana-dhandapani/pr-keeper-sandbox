'use strict';
// search service: in-memory store with simple CRUD helpers.
const store = new Map();
let nextId = 1;

function createSearch(input) {
  if (!input || typeof input !== 'object') throw new TypeError('search: input must be an object');
  const id = nextId++;
  const record = { id, ...input, createdAt: Date.now() };
  store.set(id, record);
  return record;
}

function getSearch(id) {
  const r = store.get(id);
  if (!r) throw new Error('search: not found: ' + id);
  return r;
}

function updateSearch(id, patch) {
  const r = getSearch(id);
  const next = { ...r, ...patch, id: r.id };
  store.set(id, next);
  return next;
}

function removeSearch(id) {
  return store.delete(id);
}

function listSearch({ page = 1, pageSize = 20 } = {}) {
  const all = [...store.values()].sort((a, b) => a.id - b.id);
  const start = (page - 1) * pageSize;
  return { items: all.slice(start, start + pageSize), total: all.length };
}

function countSearch() { return store.size; }

module.exports = { createSearch, getSearch, updateSearch, removeSearch, listSearch, countSearch };
