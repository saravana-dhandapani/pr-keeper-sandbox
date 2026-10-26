'use strict';
// catalog service: in-memory store with simple CRUD helpers.
const store = new Map();
let nextId = 1;

function createCatalog(input) {
  if (!input || typeof input !== 'object') throw new TypeError('catalog: input must be an object');
  const id = nextId++;
  const record = { id, ...input, createdAt: Date.now() };
  store.set(id, record);
  return record;
}

function getCatalog(id) {
  const r = store.get(id);
  if (!r) throw new Error('catalog: not found: ' + id);
  return r;
}

function updateCatalog(id, patch) {
  const r = getCatalog(id);
  const next = { ...r, ...patch, id: r.id };
  store.set(id, next);
  return next;
}

function removeCatalog(id) {
  return store.delete(id);
}

function listCatalog({ page = 1, pageSize = 20 } = {}) {
  const all = [...store.values()].sort((a, b) => a.id - b.id);
  const start = (page - 1) * pageSize;
  return { items: all.slice(start, start + pageSize), total: all.length };
}

function countCatalog() { return store.size; }

module.exports = { createCatalog, getCatalog, updateCatalog, removeCatalog, listCatalog, countCatalog };
