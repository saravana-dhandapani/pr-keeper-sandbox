'use strict';
// audit service: in-memory store with simple CRUD helpers.
const store = new Map();
let nextId = 1;

function createAudit(input) {
  if (!input || typeof input !== 'object') throw new TypeError('audit: input must be an object');
  const id = nextId++;
  const record = { id, ...input, createdAt: Date.now() };
  store.set(id, record);
  return record;
}

function getAudit(id) {
  const r = store.get(id);
  if (!r) throw new Error('audit: not found: ' + id);
  return r;
}

function updateAudit(id, patch) {
  const r = getAudit(id);
  const next = { ...r, ...patch, id: r.id };
  store.set(id, next);
  return next;
}

function removeAudit(id) {
  return store.delete(id);
}

function listAudit({ page = 1, pageSize = 20 } = {}) {
  const all = [...store.values()].sort((a, b) => a.id - b.id);
  const start = (page - 1) * pageSize;
  return { items: all.slice(start, start + pageSize), total: all.length };
}

function countAudit() { return store.size; }

module.exports = { createAudit, getAudit, updateAudit, removeAudit, listAudit, countAudit };
