'use strict';
// invoices service: in-memory store with simple CRUD helpers.
const store = new Map();
let nextId = 1;

function createInvoices(input) {
  if (!input || typeof input !== 'object') throw new TypeError('invoices: input must be an object');
  const id = nextId++;
  const record = { id, ...input, createdAt: Date.now() };
  store.set(id, record);
  return record;
}

function getInvoices(id) {
  const r = store.get(id);
  if (!r) throw new Error('invoices: not found: ' + id);
  return r;
}

function updateInvoices(id, patch) {
  const r = getInvoices(id);
  const next = { ...r, ...patch, id: r.id };
  store.set(id, next);
  return next;
}

function removeInvoices(id) {
  return store.delete(id);
}

function listInvoices({ page = 1, pageSize = 20 } = {}) {
  const all = [...store.values()].sort((a, b) => a.id - b.id);
  const start = (page - 1) * pageSize;
  return { items: all.slice(start, start + pageSize), total: all.length };
}

function countInvoices() { return store.size; }

module.exports = { createInvoices, getInvoices, updateInvoices, removeInvoices, listInvoices, countInvoices };
