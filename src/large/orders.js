'use strict';
// orders service: in-memory store with simple CRUD helpers.
const store = new Map();
let nextId = 1;

function createOrders(input) {
  if (!input || typeof input !== 'object') throw new TypeError('orders: input must be an object');
  const id = nextId++;
  const record = { id, ...input, createdAt: Date.now() };
  store.set(id, record);
  return record;
}

function getOrders(id) {
  const r = store.get(id);
  if (!r) throw new Error('orders: not found: ' + id);
  return r;
}

function updateOrders(id, patch) {
  const r = getOrders(id);
  const next = { ...r, ...patch, id: r.id };
  store.set(id, next);
  return next;
}

function removeOrders(id) {
  return store.delete(id);
}

function listOrders({ page = 1, pageSize = 20 } = {}) {
  const all = [...store.values()].sort((a, b) => a.id - b.id);
  const start = (page - 1) * pageSize;
  return { items: all.slice(start, start + pageSize), total: all.length };
}

function countOrders() { return store.size; }

module.exports = { createOrders, getOrders, updateOrders, removeOrders, listOrders, countOrders };
