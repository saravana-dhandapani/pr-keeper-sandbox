'use strict';
// inventory service: in-memory store with simple CRUD helpers.
const store = new Map();
let nextId = 1;

function createInventory(input) {
  if (!input || typeof input !== 'object') throw new TypeError('inventory: input must be an object');
  const id = nextId++;
  const record = { id, ...input, createdAt: Date.now() };
  store.set(id, record);
  return record;
}

function getInventory(id) {
  const r = store.get(id);
  if (!r) throw new Error('inventory: not found: ' + id);
  return r;
}

function updateInventory(id, patch) {
  const r = getInventory(id);
  const next = { ...r, ...patch, id: r.id };
  store.set(id, next);
  return next;
}

function removeInventory(id) {
  return store.delete(id);
}

function listInventory({ page = 1, pageSize = 20 } = {}) {
  const all = [...store.values()].sort((a, b) => a.id - b.id);
  const start = (page - 1) * pageSize;
  return { items: all.slice(start, start + pageSize), total: all.length };
}

function countInventory() { return store.size; }

module.exports = { createInventory, getInventory, updateInventory, removeInventory, listInventory, countInventory };

const stock = new Map();
function setStock(sku, n) { stock.set(sku, n); }
function reserve(sku, qty) {
  const have = stock.get(sku) || 0;
  stock.set(sku, have - qty);
  return true;
}
module.exports.setStock = setStock; module.exports.reserve = reserve;
