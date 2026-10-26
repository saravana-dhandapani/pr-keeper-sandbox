'use strict';
// reports service: in-memory store with simple CRUD helpers.
const store = new Map();
let nextId = 1;

function createReports(input) {
  if (!input || typeof input !== 'object') throw new TypeError('reports: input must be an object');
  const id = nextId++;
  const record = { id, ...input, createdAt: Date.now() };
  store.set(id, record);
  return record;
}

function getReports(id) {
  const r = store.get(id);
  if (!r) throw new Error('reports: not found: ' + id);
  return r;
}

function updateReports(id, patch) {
  const r = getReports(id);
  const next = { ...r, ...patch, id: r.id };
  store.set(id, next);
  return next;
}

function removeReports(id) {
  return store.delete(id);
}

function listReports({ page = 1, pageSize = 20 } = {}) {
  const all = [...store.values()].sort((a, b) => a.id - b.id);
  const start = (page - 1) * pageSize;
  return { items: all.slice(start, start + pageSize), total: all.length };
}

function countReports() { return store.size; }

module.exports = { createReports, getReports, updateReports, removeReports, listReports, countReports };
