'use strict';
// shipping service: in-memory store with simple CRUD helpers.
const store = new Map();
let nextId = 1;

function createShipping(input) {
  if (!input || typeof input !== 'object') throw new TypeError('shipping: input must be an object');
  const id = nextId++;
  const record = { id, ...input, createdAt: Date.now() };
  store.set(id, record);
  return record;
}

function getShipping(id) {
  const r = store.get(id);
  if (!r) throw new Error('shipping: not found: ' + id);
  return r;
}

function updateShipping(id, patch) {
  const r = getShipping(id);
  const next = { ...r, ...patch, id: r.id };
  store.set(id, next);
  return next;
}

function removeShipping(id) {
  return store.delete(id);
}

function listShipping({ page = 1, pageSize = 20 } = {}) {
  const all = [...store.values()].sort((a, b) => a.id - b.id);
  const start = (page - 1) * pageSize;
  return { items: all.slice(start, start + pageSize), total: all.length };
}

function countShipping() { return store.size; }

module.exports = { createShipping, getShipping, updateShipping, removeShipping, listShipping, countShipping };
